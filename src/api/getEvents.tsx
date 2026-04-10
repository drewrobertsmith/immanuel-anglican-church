import { useQuery } from "@tanstack/react-query";
import { fetch } from "react-native-nitro-fetch";
import { convertIcsCalendar, type IcsCalendar } from "ts-ics";

const url = "https://immanuelanglican.ccbchurch.com/w_calendar_sub.ics";

export const useGetEvents = () => {
  return useQuery({
    queryKey: ["all events"],
    queryFn: async () => {
      const result = await fetch(url);
      const text = await result.text();
      const data: IcsCalendar = convertIcsCalendar(undefined, text);
      return data;
    },
  });
};
