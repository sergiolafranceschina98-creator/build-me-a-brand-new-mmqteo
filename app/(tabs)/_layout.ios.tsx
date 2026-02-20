
import React from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';

// Use Stack navigation for better iPad compatibility and broader iOS version support
export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen 
        name="(home)" 
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="profile" 
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
