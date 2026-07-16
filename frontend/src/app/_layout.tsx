import { Stack } from 'expo-router';
import { ProofProvider } from '../context/ProofContext';

export default function RootLayout() {
  return (
    <ProofProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="activity" />
        <Stack.Screen name="add-proof" />
        <Stack.Screen name="analytics" />
        <Stack.Screen name="profile" />
      </Stack>
    </ProofProvider>
  );
}