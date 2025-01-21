import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="JoueurPage" options={{headerShown: false}} />
      <Stack.Screen name="EditPage" options={{headerShown: false}} />
      <Stack.Screen name="GamePage" options={{headerShown: false}} />
    </Stack>
  );
}
