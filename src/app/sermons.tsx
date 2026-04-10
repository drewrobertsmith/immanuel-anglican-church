import { Text, View } from "react-native";
import { useGetSermons } from "../api/getSermons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LegendList } from "@legendapp/list/react-native";
import { PodcastItem } from "../types/types";
import { formatDate, formatDuration } from "../utils/formatters";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { useCSSVariable } from "uniwind";

function SermonListItem({ item }: { item: PodcastItem }) {
  const border = useCSSVariable("--color-border");
  const iconColor = useCSSVariable("--color-foreground");
  return (
    <View className="flex-1 p-2 flex-row items-center gap-2 border border-border rounded-xl bg-background-light">
      <Image
        source={item.itunes.image}
        contentFit="contain"
        style={{
          width: 56,
          height: 56,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: border as string,
        }}
      />
      <View className="flex-1 gap-0.5">
        <Text className="text-xs font-medium text-foreground-muted">
          {formatDate(item.pubDate)}
        </Text>
        <Text
          className="shrink text-md text-foreground font-semibold"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
        <Text className="text-foreground-muted text-xs font-medium">
          {formatDuration(item.itunes.duration, "summary")}
        </Text>
      </View>
      <SymbolView
        name={{
          ios: "play.circle",
          android: "play_circle",
        }}
        tintColor={iconColor as string}
        size={40}
      />
    </View>
  );
}

export default function Sermons() {
  const { data, isFetching, isPending, refetch } = useGetSermons();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <LegendList
        data={data?.items}
        keyExtractor={(item) => item.guid.value}
        renderItem={({ item }: { item: PodcastItem }) => (
          <SermonListItem item={item} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 8,
          paddingBottom: insets.bottom,
          paddingHorizontal: 8,
        }}
        estimatedItemSize={88}
      />
    </View>
  );
}
