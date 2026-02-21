
import React from 'react';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
  const isPad = Platform.isPad;
  
  console.log('Base Tab Layout initialized - iPad:', isPad, 'Platform:', Platform.OS);
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
        ...(isPad && {
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
        }),
      }}
    >
      <Stack.Screen 
        name="(home)" 
        options={{
          headerShown: false,
          title: 'Reality Check',
        }}
      />
      <Stack.Screen 
        name="profile" 
        options={{
          headerShown: true,
          title: 'Profile',
          headerBackTitle: 'Back',
          headerLargeTitle: isPad,
        }}
      />
    </Stack>
  );
}
