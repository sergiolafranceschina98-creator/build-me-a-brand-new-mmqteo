
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

export default function TabLayout() {
  const isPad = Platform.isPad;
  
  console.log('iOS Tab Layout initialized - iPad:', isPad, 'Platform:', Platform.OS);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: 'transparent',
        },
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
    </Stack.Navigator>
  );
}
