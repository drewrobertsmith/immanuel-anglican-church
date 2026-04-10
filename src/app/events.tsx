import { Dimensions, Text, View } from "react-native";
import { useGetEvents } from "../api/getEvents";
import Constants from "expo-constants";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LegendList } from "@legendapp/list/react-native";
import { IcsEvent } from "ts-ics";
import { useMemo } from "react";
import RenderHTML from "react-native-render-html";
import { useCSSVariable } from "uniwind";

function DescriptionHTML({ item }) {
  const { width } = Dimensions.get("window");
  const primary = useCSSVariable("--color-primary");
  const foregroundMuted = useCSSVariable("--color-foreground-muted");

  const sanitizedHTML = useMemo(() => {
    if (!item) return "";
    return item.replace(/<input.*?>|<textarea.*?>/gi, "");
  }, [item]);

  return (
    <RenderHTML
      contentWidth={width}
      source={{ html: sanitizedHTML }}
      systemFonts={Constants.systemFonts}
      tagsStyles={{
        a: {
          color: primary as string,
          textDecorationLine: "underline",
        },
        p: {
          color: foregroundMuted as string,
        },
      }}
    />
  );
}

function EventsListItem({ item }: { item: IcsEvent }) {
  return (
    <View className="flex-1 p-2 g-8 border border-border rounded-xl bg-background-light">
      <View className="flex-row gap-2 items-center justify-between">
        <Text className="text-base font-semibold shrink text-foreground">
          {item.summary}
        </Text>
        <Text className="text-foreground-muted font-semibold">
          {new Date(item.start.date).toLocaleDateString()}
        </Text>
      </View>
      <View className="shrink">
        <DescriptionHTML item={item.description?.substring(27)} />
      </View>
    </View>
  );
}

export default function Events() {
  const { data } = useGetEvents();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <LegendList
        data={data?.events}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => <EventsListItem item={item} />}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          gap: 8,
          paddingHorizontal: 8,
        }}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={158}
      />
    </View>
  );
}
