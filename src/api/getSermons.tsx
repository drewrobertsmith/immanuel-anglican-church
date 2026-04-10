import { useQuery } from "@tanstack/react-query";
import { fetch } from "react-native-nitro-fetch";
import { parseRssFeed } from "feedsmith";

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
