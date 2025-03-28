import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="pages/JoueurPage" options={{headerShown: false}} />
      <Stack.Screen name="pages/EditPage" options={{headerShown: false}} />
      <Stack.Screen name="pages/GamePage" options={{headerShown: false, gestureEnabled: true }} />
    </Stack>
  );
}
