import { useQuery } from "@tanstack/react-query";
import { fetch } from "react-native-nitro-fetch";
import { parseRssFeed } from "feedsmith";
import { PodcastItem } from "../types/types";

const url = "https://anchor.fm/s/fd2a2ea4/podcast/rss";

export const useGetSermons = () => {
  return useQuery({
    queryKey: ["all sermons"],
    queryFn: async () => {
      const result = await fetch(url);
      const text = await result.text();
      const feed = parseRssFeed(text);

      return feed;
    },
  });
};

export const useGetSermonById = (id: string) => {
  return useQuery({
    queryKey: [id],
    queryFn: async (): Promise<PodcastItem> => {
      const result = await fetch(url);
      const text = await result.text();
      const feed = parseRssFeed(text);
      const filteredItem = feed.items?.filter((k) => k.guid?.value === id);
      return filteredItem[0];
    },
  });
};
