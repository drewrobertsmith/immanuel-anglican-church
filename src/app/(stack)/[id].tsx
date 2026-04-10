import { useGetSermonById, useGetSermons } from "@/src/api/getSermons";
import { formatDate, formatDuration } from "@/src/utils/formatters";
import Constants from "expo-constants";

import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import RenderHTML from "react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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

export default function SermonPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useGetSermonById(id);
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-background-dark"
      contentContainerStyle={{
        paddingBottom: insets.bottom,
        gap: 16,
        paddingHorizontal: 8,
        paddingTop: 8,
      }}
    >
      <View className="items-center gap-2">
        <Image
          source={data?.itunes.image}
          style={{ height: 160, width: 160, borderRadius: 8 }}
          contentFit="contain"
        />
        <Text className="text-base text-foreground font-semibold">
          {data?.title}
        </Text>
      </View>
      <View className="border-t border-border" />
      <View className="flex-row justify-between">
        <Text className="text-foreground-muted">
          {formatDate(data?.pubDate)}
        </Text>
        <Text className="text-foreground-muted">
          {formatDuration(data?.itunes.duration, "summary")}
        </Text>
      </View>
      <View className="p-2 bg-background rounded-xl shadow">
        <DescriptionHTML item={data?.description} />
      </View>
    </ScrollView>
  );
}
