import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function QuizLayout() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  return (
    <Stack screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}>
      <Stack.Screen name="index" options={{ title: 'Quiz Intro' }} />
      <Stack.Screen name="questions" options={{ title: 'Quiz Questions' }} />
      <Stack.Screen name="results" options={{ title: 'Quiz Results' }} />
    </Stack>
  );
}