import type { MysteryType } from '@/domain/mystery';
import type { TercoSection } from '@/domain/mysteryTerco';
import { contemplative, contemplativeFonts } from '@/shared/constants/contemplative';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  sections: TercoSection[];
  offline: boolean;
  dayType: MysteryType;
  onStartTerco: (type: MysteryType) => void;
};

export function TercoChoiceList({ sections, offline, dayType, onStartTerco }: Props) {
  return (
    <View>
      {offline ? <Text style={styles.note}>Usando catálogo offline embutido.</Text> : null}
      {sections.map((section) => (
        <View key={section.type} style={styles.section}>
          <View style={styles.heading}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.type === dayType ? <Text style={styles.today}>Do dia</Text> : null}
          </View>
          <Text style={styles.days}>{section.recommendedDays}</Text>
          {section.mysteries.map((mystery) => (
            <Text key={mystery.id} style={styles.name}>
              {mystery.name}
            </Text>
          ))}
          <Pressable
            onPress={() => onStartTerco(section.type)}
            accessibilityRole="button"
            accessibilityLabel={`Rezar ${section.title}`}
            hitSlop={8}>
            <Text style={styles.pray}>Rezar este terço</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  note: {
    color: contemplative.muted,
    fontFamily: contemplativeFonts.sans,
    fontSize: 12,
    marginBottom: 16,
  },
  section: {
    marginBottom: 28,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  sectionTitle: {
    flex: 1,
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serif,
    fontSize: 28,
    lineHeight: 32,
  },
  today: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  days: {
    marginTop: 4,
    color: contemplative.muted,
    fontFamily: contemplativeFonts.sans,
    fontSize: 11,
    letterSpacing: 1.2,
  },
  name: {
    marginTop: 12,
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serifRegular,
    fontSize: 17,
    lineHeight: 22,
  },
  pray: {
    marginTop: 14,
    alignSelf: 'flex-start',
    color: contemplative.gold,
    fontFamily: contemplativeFonts.serifItalic,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
