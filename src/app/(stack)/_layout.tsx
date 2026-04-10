import { Stack } from "expo-router";
import { useCSSVariable } from "uniwind";

export default function SermonLayout() {
  const bg = useCSSVariable("--color-background-dark");

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
