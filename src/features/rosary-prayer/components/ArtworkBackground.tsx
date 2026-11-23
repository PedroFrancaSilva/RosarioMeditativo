import {
  artworkPath,
  type ArtworkMotion,
  type ArtworkPath,
} from '@/domain/artworkMotion';
import { contemplative } from '@/shared/constants/contemplative';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  ActivityIndicator,
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
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

function usable(size: { width?: number; height?: number } | null | undefined): size is IntrinsicSize {
  return Boolean(size && (size.width ?? 0) > 0 && (size.height ?? 0) > 0);
}

/**
 * Tamanho natural da obra. O evento de `onLoad` traz `source` no Android/iOS,
 * mas não no react-native-web; aí vale o asset resolvido ou `Image.getSize`.
 */
function measureSource(
  reported: { width?: number; height?: number } | undefined,
  source: ImageSourcePropType,
  onSize: (size: IntrinsicSize) => void,
) {
  if (usable(reported)) {
    onSize({ width: reported.width, height: reported.height });
    return;
  }
  const resolved = Image.resolveAssetSource?.(source as Parameters<typeof Image.resolveAssetSource>[0]);
  if (usable(resolved)) {
    onSize({ width: resolved.width, height: resolved.height });
    return;
  }
  const uri = resolved?.uri ?? (typeof source === 'object' && source && 'uri' in source ? source.uri : undefined);
  if (uri) {
    Image.getSize(
      uri,
      (width, height) => {
        if (width > 0 && height > 0) onSize({ width, height });
      },
      () => undefined,
    );
  }
}

function pathSignature(path: ArtworkPath | null): string {
  if (!path) return '';
  return [
    path.start.translateX,
    path.start.translateY,
    path.start.scale,
    path.end.translateX,
    path.end.translateY,
    path.end.scale,
    path.durationMs,
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
  /** Curva tempo → posição da ida (rápida nas bordas, lenta no foco). */
  const timeIn = useSharedValue<number[]>([0, 1]);
  const timeOut = useSharedValue<number[]>([0, 1]);

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
    visible.value = 1;
    if (reduceMotion) {
      // Parado no foco curado, não numa borda da obra.
      cancelAnimation(progress);
      progress.value = 0;
      startX.value = current.rest.translateX;
      startY.value = current.rest.translateY;
      startScale.value = current.rest.scale;
      endX.value = current.rest.translateX;
      endY.value = current.rest.translateY;
      endScale.value = current.rest.scale;
      return;
    }
    startX.value = current.start.translateX;
    startY.value = current.start.translateY;
    endX.value = current.end.translateX;
    endY.value = current.end.translateY;
    startScale.value = current.start.scale;
    endScale.value = current.end.scale;
    timeIn.value = current.timeline.progress;
    timeOut.value = current.timeline.position;
    progress.value = 0;
    progress.value = withRepeat(
      // Tempo linear; a curva da obra (timeline) decide onde ela anda devagar.
      withTiming(1, { duration: current.durationMs, easing: Easing.linear }),
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
    timeIn,
    timeOut,
    visible,
  ]);

  const animatedStyle = useAnimatedStyle(() => {
    const t = interpolate(progress.value, timeIn.value, timeOut.value);
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
            measureSource(event?.nativeEvent?.source, source, setIntrinsic);
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
          accessibilityLabel="Carregando"
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
