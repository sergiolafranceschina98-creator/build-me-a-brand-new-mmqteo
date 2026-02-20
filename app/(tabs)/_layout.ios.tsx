
import React from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';

// Use Stack navigation instead of NativeTabs for better iPad compatibility
export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      <Stack.Screen key="home" name="(home)" />
      <Stack.Screen key="profile" name="profile" />
    </Stack>
  );
}
