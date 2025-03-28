import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="Page/JoueurPage" options={{headerShown: false}} />
      <Stack.Screen name="Page/EditPage" options={{headerShown: false}} />
      <Stack.Screen name="Page/GamePage" options={{headerShown: false, gestureEnabled: true }} />
    </Stack>
  );
}
