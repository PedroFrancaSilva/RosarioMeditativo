import {
  ARTWORK_DURATION_MS,
  artworkPath,
  type ArtworkMotion,
  type ArtworkPath,
} from '@/domain/artworkMotion';
import { contemplative } from '@/shared/constants/contemplative';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, ActivityIndicator, StyleSheet, View, useWindowDimensions } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  source: ImageSourcePropType;
  motion: ArtworkMotion;
  /** Mesma obra mantém o progresso; outra obra monta de novo este componente. */
  backgroundKey: string;
};

type IntrinsicSize = { width: number; height: number };

function pathSignature(path: ArtworkPath | null): string {
  if (!path) return '';
  return [
    path.start.translateX,
    path.start.translateY,
    path.start.scale,
    path.end.translateX,
    path.end.translateY,
    path.end.scale,
  ].join(',');
}

export function ArtworkBackground({ source, motion, backgroundKey }: Props) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [intrinsic, setIntrinsic] = useState<IntrinsicSize | null>(null);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const seenKey = useRef(backgroundKey);

  if (seenKey.current !== backgroundKey) {
    seenKey.current = backgroundKey;
    setFailed(false);
    setLoaded(false);
    setIntrinsic(null);
  }

  const progress = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const endX = useSharedValue(0);
  const endY = useSharedValue(0);
  const startScale = useSharedValue(1);
  const endScale = useSharedValue(1);
  const visible = useSharedValue(0);

  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (active) setReduceMotion(enabled);
    });
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', (enabled) => {
      setReduceMotion(enabled);
    });
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);

  const path = useMemo(
    () =>
      intrinsic
        ? artworkPath({
            screenWidth,
            screenHeight,
            imageWidth: intrinsic.width,
            imageHeight: intrinsic.height,
            motion,
          })
        : null,
    [intrinsic, motion, screenHeight, screenWidth],
  );
  const signature = pathSignature(path);
  const pathRef = useRef(path);
  pathRef.current = path;

  useEffect(() => {
    const current = pathRef.current;
    if (!current || failed) {
      cancelAnimation(progress);
      progress.value = 0;
      visible.value = 0;
      return;
    }
    startX.value = current.start.translateX;
    startY.value = current.start.translateY;
    endX.value = current.end.translateX;
    endY.value = current.end.translateY;
    startScale.value = current.start.scale;
    endScale.value = current.end.scale;
    visible.value = 1;
    if (reduceMotion) {
      cancelAnimation(progress);
      progress.value = 0;
      return;
    }
    progress.value = 0;
    progress.value = withRepeat(
      withTiming(1, { duration: ARTWORK_DURATION_MS, easing: Easing.linear }),
      -1,
      true,
    );
    return () => {
      cancelAnimation(progress);
    };
  }, [
    backgroundKey,
    endScale,
    endX,
    endY,
    failed,
    progress,
    reduceMotion,
    signature,
    startScale,
    startX,
    startY,
    visible,
  ]);

  const animatedStyle = useAnimatedStyle(() => {
    const t = progress.value;
    return {
      opacity: visible.value,
      transform: [
        { translateX: startX.value + (endX.value - startX.value) * t },
        { translateY: startY.value + (endY.value - startY.value) * t },
        { scale: startScale.value + (endScale.value - startScale.value) * t },
      ],
    };
  });

  const cover =
    intrinsic && intrinsic.width > 0 && intrinsic.height > 0
      ? Math.max(screenWidth / intrinsic.width, screenHeight / intrinsic.height)
      : 1;
  const layoutWidth = intrinsic ? intrinsic.width * cover : screenWidth;
  const layoutHeight = intrinsic ? intrinsic.height * cover : screenHeight;

  return (
    <View style={styles.fill} pointerEvents="none">
      {failed ? null : (
        <Animated.Image
          source={source}
          resizeMode="cover"
          onLoad={(event) => {
            const { width, height } = event.nativeEvent.source;
            if (width > 0 && height > 0) setIntrinsic({ width, height });
            setLoaded(true);
          }}
          onError={() => setFailed(true)}
          testID="artwork-image"
          style={[
            styles.image,
            { width: layoutWidth, height: layoutHeight },
            animatedStyle,
          ]}
        />
      )}
      {failed || loaded ? null : (
        <ActivityIndicator
          color={contemplative.gold}
          accessibilityLabel="A carregar"
          style={styles.loading}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: contemplative.background,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    left: 0,
    top: 0,
    transformOrigin: 'left top',
  },
  loading: {
    position: 'absolute',
    top: '42%',
    alignSelf: 'center',
  },
});
