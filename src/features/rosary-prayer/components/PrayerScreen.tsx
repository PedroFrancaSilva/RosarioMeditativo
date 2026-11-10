import { useChantDuringPrayer } from '@/features/chant/useChantDuringPrayer';
import { ArtworkBackground } from '@/features/rosary-prayer/components/ArtworkBackground';
import { DeeperReferencesModal } from '@/features/rosary-prayer/components/DeeperReferencesModal';
import { DecadeBeadRow } from '@/features/rosary-prayer/components/DecadeBeadRow';
import { MeditationBlock } from '@/features/rosary-prayer/components/MeditationBlock';
import { PrayerTextBlock } from '@/features/rosary-prayer/components/PrayerTextBlock';
import { MysteryImageDevPanel } from '@/features/rosary-prayer/dev/MysteryImageDevPanel';
import { useMeditationContent } from '@/features/rosary-prayer/hooks/useMeditationContent';
import { useMeditationSelection } from '@/features/rosary-prayer/hooks/useMeditationSelection';
import { useMysteryBackground } from '@/features/rosary-prayer/hooks/useMysteryBackground';
import {
  buildDecadeBeadView,
  mysteryProgressLabel,
  prayerPanelKicker,
} from '@/features/rosary-prayer/session/decadeBeadView';
import type { StepPresentation } from '@/features/rosary-prayer/session/stepPresentation';
import type { RosaryProgressModel } from '@/domain/rosary/rosaryProgress';
import type { MysteryType } from '@/domain/mystery';
import { TERCO_TITLES } from '@/domain/mysteryTerco';
import { contemplative, contemplativeFonts, contemplativeMotion } from '@/shared/constants/contemplative';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  presentation: StepPresentation;
  persistentMysteryLabel: string;
  activeMysteryType?: MysteryType;
  activeMysterySortOrder?: number;
  progress: RosaryProgressModel;
  canGoNext: boolean;
  canGoPrevious: boolean;
  canSkipToNextMystery: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSkipToNextMystery: () => void;
};

export function PrayerScreen({
  presentation,
  persistentMysteryLabel,
  activeMysteryType,
  activeMysterySortOrder,
  progress,
  canGoNext,
  canGoPrevious,
  canSkipToNextMystery,
  onNext,
  onPrevious,
  onSkipToNextMystery,
}: Props) {
  const insets = useSafeAreaInsets();
  useChantDuringPrayer();
  const { source, credit, motion, devCrop, backgroundKey } = useMysteryBackground(
    presentation.mysteryId,
    {
      hailMaryIndex: presentation.hailMaryIndex,
      prayerId: presentation.step.prayerId,
      mysteryType: activeMysteryType,
      mysterySortOrder: activeMysterySortOrder,
    },
  );

  const isCompletion = presentation.step.kind === 'completion';
  const isMysteryAnnouncement = presentation.step.kind === 'mystery-announcement';
  const showMeditation = isMysteryAnnouncement && Boolean(presentation.mysteryId);
  const hasMystery = Boolean(presentation.mysteryId);

  const meditationQuery = useMeditationContent(
    showMeditation ? presentation.mysteryId : null,
    showMeditation ? { type: activeMysteryType, sortOrder: activeMysterySortOrder } : undefined,
  );
  const meditation = useMeditationSelection(meditationQuery.data);
  const [deeperOpen, setDeeperOpen] = useState(false);
  const advancing = useRef(false);

  const screenOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(1);

  useEffect(() => {
    screenOpacity.value = withTiming(1, { duration: contemplativeMotion.screen });
  }, [screenOpacity]);

  useEffect(() => {
    contentOpacity.value = withSequence(
      withTiming(0.55, { duration: 80 }),
      withTiming(1, { duration: contemplativeMotion.content - 80 }),
    );
  }, [contentOpacity, presentation.step.id]);

  useEffect(() => {
    if (!showMeditation) setDeeperOpen(false);
  }, [showMeditation]);

  const leaveTo = useCallback(
    (action: () => void) => {
      screenOpacity.value = withTiming(0, { duration: contemplativeMotion.screen }, (finished) => {
        if (finished) runOnJS(action)();
      });
    },
    [screenOpacity],
  );

  const handleAdvance = useCallback(() => {
    if (isCompletion || !canGoNext || advancing.current) return;
    advancing.current = true;
    onNext();
    setTimeout(() => {
      advancing.current = false;
    }, contemplativeMotion.advanceLock);
  }, [canGoNext, isCompletion, onNext]);

  const handleBack = useCallback(() => {
    if (isCompletion || !canGoPrevious) return;
    onPrevious();
  }, [canGoPrevious, isCompletion, onPrevious]);

  const pan = Gesture.Pan()
    .runOnJS(true)
    .activeOffsetX([-24, 24])
    .onEnd((event) => {
      if (isCompletion) return;
      if (event.translationX < -40) handleAdvance();
      else if (event.translationX > 40) handleBack();
    });

  const fadeStyle = useAnimatedStyle(() => ({ opacity: screenOpacity.value }));
  const contentStyle = useAnimatedStyle(() => ({ opacity: contentOpacity.value }));

  const header = isCompletion
    ? { kicker: 'Conclusão', detail: '' }
    : mysteryProgressLabel(progress.mysteries, hasMystery);
  const beadView = buildDecadeBeadView(isCompletion ? undefined : presentation.step, progress);
  const setName = activeMysteryType ? TERCO_TITLES[activeMysteryType] : null;
  const meditationStatus = !showMeditation
    ? 'empty'
    : meditationQuery.isLoading && !meditation.passage
      ? 'loading'
      : meditation.passage
        ? 'ready'
        : 'empty';

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.root, fadeStyle]}>
        <StatusBar style="light" />
        <View style={styles.background}>
          <ArtworkBackground key={backgroundKey} source={source} motion={motion} backgroundKey={backgroundKey} />
          <LinearGradient
            colors={['rgba(13,11,10,0.12)', 'rgba(13,11,10,0.28)', contemplative.background]}
            locations={[0, 0.42, 1]}
            style={styles.gradient}>
            <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
              <Pressable
                style={styles.backButton}
                onPress={() => leaveTo(() => router.back())}
                accessibilityRole="button"
                accessibilityLabel="Voltar à seleção">
                <Text style={styles.backMark}>‹</Text>
              </Pressable>
              <View style={styles.headerCenter}>
                <Text style={styles.headerKicker}>{header.kicker}</Text>
                {header.detail ? <Text style={styles.headerDetail}>{header.detail}</Text> : null}
                {canSkipToNextMystery && !isCompletion ? (
                  <Pressable
                    onPress={onSkipToNextMystery}
                    accessibilityRole="button"
                    accessibilityLabel="Próximo mistério"
                    hitSlop={8}>
                    <Text style={styles.skip}>Próximo mistério</Text>
                  </Pressable>
                ) : null}
              </View>
              <View style={styles.headerSpacer} />
            </View>

            {devCrop ? (
              <MysteryImageDevPanel
                cropPercent={devCrop.cropPercent}
                bakedPercent={devCrop.bakedPercent}
                onNudge={devCrop.nudge}
                onReset={devCrop.resetToBaked}
              />
            ) : null}

            <View style={styles.advance}>
              {isCompletion ? null : (
                <View style={styles.advanceRow}>
                  <Pressable
                    style={styles.half}
                    onPress={handleBack}
                    accessibilityRole="button"
                    accessibilityLabel="Voltar à oração anterior">
                    <Text style={styles.advanceHint}>Toque para voltar</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.half, styles.halfRight]}
                    onPress={handleAdvance}
                    accessibilityRole="button"
                    accessibilityLabel="Avançar para a próxima oração">
                    <Text style={[styles.advanceHint, styles.advanceHintRight]}>Toque para avançar</Text>
                  </Pressable>
                </View>
              )}
              {credit && presentation.step.mysteryId == null ? (
                <Pressable
                  style={styles.credit}
                  onPress={() => undefined}
                  accessibilityRole="text"
                  accessibilityLabel={`${credit.title}, ${credit.artist}`}>
                  <Text style={styles.creditText} numberOfLines={1}>
                    {credit.title} — {credit.artist}
                  </Text>
                </Pressable>
              ) : null}
            </View>

            <View style={[styles.bottom, { paddingBottom: insets.bottom + 16 }]}>
              {isCompletion ? (
                <View style={styles.completion}>
                  <Text style={styles.completionTitle}>{presentation.title}</Text>
                  <Text style={styles.completionBody}>{presentation.bodyFull}</Text>
                  <Pressable
                    style={styles.homeButton}
                    onPress={() => leaveTo(() => router.replace('/(tabs)'))}
                    accessibilityRole="button">
                    <Text style={styles.homeButtonText}>Voltar ao início</Text>
                  </Pressable>
                </View>
              ) : (
                <>
                  <Animated.View style={contentStyle}>
                    {setName && hasMystery ? <Text style={styles.setName}>{setName}</Text> : null}
                    <Text style={styles.mysteryTitle}>{persistentMysteryLabel}</Text>
                    {showMeditation ? (
                      <MeditationBlock
                        status={meditationStatus}
                        passage={meditation.passage}
                        commentary={meditation.commentary}
                        hasDeeperReferences={meditation.hasDeeperReferences}
                        onOpenDeeper={() => setDeeperOpen(true)}
                      />
                    ) : null}
                    <PrayerTextBlock
                      key={presentation.step.id}
                      kicker={prayerPanelKicker(presentation.step)}
                      title={presentation.title}
                      lead={presentation.lead}
                      summary={presentation.bodySummary}
                      fullText={presentation.bodyFull}
                    />
                  </Animated.View>
                  <DecadeBeadRow view={beadView} />
                </>
              )}
            </View>

          </LinearGradient>
        </View>
        <DeeperReferencesModal
          visible={deeperOpen}
          references={meditation.deeperReferences}
          onClose={() => setDeeperOpen(false)}
        />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  background: { flex: 1, overflow: 'hidden', backgroundColor: contemplative.background },
  gradient: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    gap: 8,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(242,234,219,0.28)',
    backgroundColor: 'rgba(13,11,10,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backMark: {
    color: contemplative.cream,
    fontSize: 28,
    lineHeight: 30,
    marginTop: -2,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  headerKicker: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 10,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  headerDetail: {
    color: 'rgba(242,234,219,0.72)',
    fontFamily: contemplativeFonts.sans,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  skip: {
    marginTop: 4,
    color: contemplative.gold,
    fontFamily: contemplativeFonts.serifItalic,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  headerSpacer: {
    width: 36,
  },
  advance: {
    flex: 1,
    minHeight: 72,
  },
  advanceRow: {
    flex: 1,
    flexDirection: 'row',
  },
  half: {
    flex: 1,
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingLeft: 18,
  },
  halfRight: {
    alignItems: 'flex-end',
    paddingLeft: 0,
    paddingRight: 18,
  },
  advanceHint: {
    color: 'rgba(242,234,219,0.72)',
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  advanceHintRight: {
    textAlign: 'right',
  },
  bottom: {
    paddingHorizontal: 20,
  },
  setName: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 10,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  mysteryTitle: {
    marginTop: 4,
    marginBottom: 12,
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serif,
    fontSize: 32,
    lineHeight: 36,
  },
  credit: {
    position: 'absolute',
    left: 16,
    bottom: 8,
    maxWidth: '78%',
  },
  creditText: {
    color: 'rgba(242,234,219,0.55)',
    fontFamily: contemplativeFonts.sans,
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  completion: {
    backgroundColor: contemplative.panel,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: contemplative.panelBorder,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  completionTitle: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serif,
    fontSize: 32,
    lineHeight: 36,
    textAlign: 'center',
  },
  completionBody: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serifRegular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  homeButton: {
    marginTop: 8,
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: contemplative.gold,
  },
  homeButtonText: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 13,
    letterSpacing: 0.6,
  },
});
