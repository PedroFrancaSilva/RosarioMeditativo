import type { Commentary, Passage } from '@/domain/mystery';
import { meditationExcerpt } from '@/domain/meditationExcerpt';
import { usePrayerPreferences } from '@/features/preferences/preferencesContext';
import { contemplative, contemplativeFonts } from '@/shared/constants/contemplative';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  status: 'loading' | 'ready' | 'empty';
  passage?: Passage;
  commentary?: Commentary;
  hasDeeperReferences: boolean;
  onOpenDeeper: () => void;
  canDrawAnother?: boolean;
  onDrawAnother?: () => void;
};

function ExpandableText({ text, meta }: { text: string; meta?: string }) {
  const excerpt = meditationExcerpt(text);
  const [expanded, setExpanded] = useState(false);
  const body = excerpt && !expanded ? excerpt : text;
  const { textScale } = usePrayerPreferences();
  const scaled = { fontSize: 15 * textScale, lineHeight: 22 * textScale };

  const inner = (
    <>
      <Text style={[styles.body, scaled]}>{body}</Text>
      {meta ? <Text style={styles.commentaryMeta}>{meta}</Text> : null}
      {excerpt ? (
        <Text style={styles.hint}>
          {expanded ? 'Toque para recolher' : 'Toque para ver texto completo'}
        </Text>
      ) : null}
    </>
  );

  if (!excerpt) return <View style={styles.block}>{inner}</View>;

  return (
    <Pressable
      style={styles.block}
      onPress={() => setExpanded((value) => !value)}
      accessibilityRole="button"
      accessibilityHint="Toque para expandir ou recolher o texto">
      {inner}
    </Pressable>
  );
}

export function MeditationBlock({
  status,
  passage,
  commentary,
  hasDeeperReferences,
  onOpenDeeper,
  canDrawAnother = false,
  onDrawAnother,
}: Props) {
  if (status === 'loading') {
    return (
      <View style={styles.wrap}>
        <ActivityIndicator
          color={contemplative.gold}
          accessibilityLabel="A carregar"
        />
      </View>
    );
  }

  if (status === 'empty' || !passage) return null;

  return (
    <View style={styles.wrap}>
      <View style={styles.block}>
        <Text style={styles.reference}>Evangelho</Text>
        <Text style={styles.reference}>{passage.reference}</Text>
        <ExpandableText text={passage.text} />
      </View>
      {commentary ? (
        <View style={styles.block}>
          <Text style={styles.reference}>Comentário</Text>
          <ExpandableText
            text={commentary.text}
            meta={`${commentary.author}${commentary.source ? ` · ${commentary.source}` : ''}`}
          />
        </View>
      ) : null}
      {hasDeeperReferences || (canDrawAnother && onDrawAnother) ? (
        <View style={styles.actions}>
          {canDrawAnother && onDrawAnother ? (
            <Pressable
              style={styles.deeperButton}
              onPress={onDrawAnother}
              accessibilityRole="button"
              accessibilityLabel="Outra meditação"
              accessibilityHint="Mostra outra passagem ou outro comentário deste mistério"
              hitSlop={8}>
              <Text style={styles.deeperText}>Outra meditação</Text>
            </Pressable>
          ) : null}
          {hasDeeperReferences ? (
            <Pressable
              style={styles.deeperButton}
              onPress={onOpenDeeper}
              accessibilityRole="button"
              accessibilityLabel="Quero me aprofundar"
              hitSlop={8}>
              <Text style={styles.deeperText}>Quero me aprofundar</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
    marginBottom: 4,
  },
  block: {
    gap: 6,
  },
  reference: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  body: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serifRegular,
    fontSize: 15,
    lineHeight: 22,
  },
  commentaryMeta: {
    color: contemplative.muted,
    fontFamily: contemplativeFonts.sans,
    fontSize: 11,
  },
  hint: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 12,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 20,
  },
  deeperButton: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  deeperText: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.serifItalic,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
