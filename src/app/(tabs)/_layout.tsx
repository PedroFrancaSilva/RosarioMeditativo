import { Tabs } from 'expo-router';

import { contemplative } from '@/shared/constants/contemplative';

/** Uma só aba, sem barra: o grupo existe para ancorar a pilha em `/`. */
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Rezar',
          sceneStyle: { backgroundColor: contemplative.background },
        }}
      />
    </Tabs>
  );
}
