
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

export default function TabLayout() {
  console.log('iOS Tab Layout initialized for iPad support');
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
        animation: 'default',
        contentStyle: {
          backgroundColor: 'transparent',
        },
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
          headerLargeTitle: Platform.isPad,
        }}
      />
    </Stack.Navigator>
  );
}
