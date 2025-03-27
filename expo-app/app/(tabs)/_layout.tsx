import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="device" options={{ title: 'Create Device' }} />
      <Tabs.Screen name="account" options={{ title: 'Create Account' }} />
    </Tabs>
  );
}
