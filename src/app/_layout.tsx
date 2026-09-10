import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F4F7F4' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Agro Pacayales - Acceso' }} />
        <Stack.Screen name="home" options={{ title: 'Agro Pacayales - Monitoreo' }} />
        <Stack.Screen name="detail" options={{ title: 'Agro Pacayales - Ficha Técnica' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
