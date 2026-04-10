import "../global.css";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCSSVariable } from "uniwind";

const queryClient = new QueryClient();

function TabLayout() {
  const iconColor = useCSSVariable("--color-primary");
  const bgLightColor = useCSSVariable("--color-background-light");

  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      tintColor={iconColor as string}
      iconColor={bgLightColor as string}
      backgroundColor={bgLightColor as string}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house" md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="sermons">
        <NativeTabs.Trigger.Label>Sermons</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="mic" md="mic" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="events">
        <NativeTabs.Trigger.Label>Events</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="calendar" md="calendar_clock" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="giving">
        <NativeTabs.Trigger.Label>Giving</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="heart" md="heart_smile" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <TabLayout />
    </QueryClientProvider>
  );
}
