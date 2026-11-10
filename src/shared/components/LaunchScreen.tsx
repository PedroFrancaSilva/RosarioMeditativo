import { contemplativeFonts } from '@/shared/constants/contemplative';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const mark = require('../../../assets/images/splash-icon.png');

/** Mesma permanência da tela de abertura na referência. */
const VISIBLE_MS = 2100;
const FADE_MS = 700;

type Props = {
  onReady: () => void;
  onFinish: () => void;
};

export function LaunchScreen({ onReady, onFinish }: Props) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const onReadyRef = useRef(onReady);
  const onFinishRef = useRef(onFinish);
  const readyOnce = useRef(false);
  onReadyRef.current = onReady;
  onFinishRef.current = onFinish;

  const screenOpacity = useSharedValue(1);
  const markOpacity = useSharedValue(0);
  const markY = useSharedValue(9);
  const markScale = useSharedValue(0.94);
  const copyOpacity = useSharedValue(0);
  const copyY = useSharedValue(7);
  const haloScale = useSharedValue(0.97);
  const haloOpacity = useSharedValue(0.45);

  useEffect(() => {
    const arrive = { duration: 1100, easing: Easing.bezier(0.22, 1, 0.36, 1) };
    markOpacity.value = withTiming(1, arrive);
    markY.value = withTiming(0, arrive);
    markScale.value = withTiming(1, arrive);

    const copy = { duration: 900, easing: Easing.out(Easing.ease) };
    copyOpacity.value = withDelay(300, withTiming(1, copy));
    copyY.value = withDelay(300, withTiming(0, copy));

    const breathe = { duration: 1200, easing: Easing.inOut(Easing.ease) };
    haloScale.value = withRepeat(withTiming(1.04, breathe), -1, true);
    haloOpacity.value = withRepeat(withTiming(1, breathe), -1, true);

    const fadeTimer = setTimeout(() => {
      screenOpacity.value = withTiming(0, {
        duration: FADE_MS,
        easing: Easing.out(Easing.ease),
      });
    }, VISIBLE_MS);
    const doneTimer = setTimeout(() => onFinishRef.current(), VISIBLE_MS + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [copyOpacity, copyY, haloOpacity, haloScale, markOpacity, markScale, markY, screenOpacity]);

  const screenStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));
  const haloStyle = useAnimatedStyle(() => ({
    opacity: haloOpacity.value,
    transform: [{ scale: haloScale.value }],
  }));
  const markStyle = useAnimatedStyle(() => ({
    opacity: markOpacity.value,
    transform: [{ translateY: markY.value }, { scale: markScale.value }],
  }));
  const copyStyle = useAnimatedStyle(() => ({
    opacity: copyOpacity.value,
    transform: [{ translateY: copyY.value }],
  }));

  return (
    <Animated.View
      style={[styles.screen, { width, height }, screenStyle]}
      accessibilityLabel="Rosário Meditativo. Preparando seu momento de oração."
      onLayout={() => {
        if (readyOnce.current) return;
        readyOnce.current = true;
        onReadyRef.current();
      }}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1a1511', '#110e0c', '#0c0a09']}
        locations={[0, 0.58, 1]}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.frame} pointerEvents="none" />

      <View style={styles.halo}>
        <Animated.View style={[styles.ring, haloStyle]} />
        <View style={styles.ringInner} />
        <Animated.View style={markStyle}>
          <Image accessibilityIgnoresInvertColors source={mark} style={styles.mark} />
        </Animated.View>
      </View>

      <Animated.View style={[styles.copy, copyStyle]}>
        <Text style={styles.eyebrow}>Ora et contempla</Text>
        <Text style={styles.title}>Rosário{'\n'}Meditativo</Text>
        <Text style={styles.subtitle}>Preparando seu momento de oração</Text>
      </Animated.View>

      <View
        style={[styles.loader, { bottom: Math.max(48, insets.bottom + 28) }]}
        accessibilityLabel="Carregando">
        <LoadingBead delay={0} />
        <LoadingBead delay={160} />
        <LoadingBead delay={320} />
      </View>
    </Animated.View>
  );
}

function LoadingBead({ delay }: { delay: number }) {
  const opacity = useSharedValue(0.3);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    const rise = { duration: 420, easing: Easing.inOut(Easing.ease) };
    const fall = { duration: 420, easing: Easing.inOut(Easing.ease) };
    const hold = { duration: 360 };
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(withTiming(1, rise), withTiming(0.3, fall), withTiming(0.3, hold)),
        -1,
      ),
    );
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(withTiming(1.35, rise), withTiming(0.8, fall), withTiming(0.8, hold)),
        -1,
      ),
    );
  }, [delay, opacity, scale]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return <Animated.View style={[styles.dot, style]} />;
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#110e0c',
  },
  frame: {
    position: 'absolute',
    top: 22,
    right: 22,
    bottom: 22,
    left: 22,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 85, 0.08)',
    borderRadius: 23,
  },
  halo: {
    width: 148,
    height: 148,
    marginTop: -45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 85, 0.1)',
    borderRadius: 74,
  },
  ringInner: {
    position: 'absolute',
    top: 16,
    right: 16,
    bottom: 16,
    left: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 85, 0.06)',
    borderRadius: 58,
  },
  mark: {
    width: 77,
    height: 99,
  },
  copy: {
    marginTop: 26,
    alignItems: 'center',
  },
  eyebrow: {
    marginBottom: 13,
    color: '#a98c50',
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 9,
    letterSpacing: 2.25,
    textTransform: 'uppercase',
  },
  title: {
    color: '#eee4d4',
    fontFamily: contemplativeFonts.serif,
    fontSize: 43,
    lineHeight: 38,
    letterSpacing: -1.5,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 19,
    color: '#756c63',
    fontFamily: contemplativeFonts.serifItalic,
    fontSize: 14,
    textAlign: 'center',
  },
  loader: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#9a7e43',
  },
});
