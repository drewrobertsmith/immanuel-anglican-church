export interface PodcastItem {
  dc: DcInfo;
  description: string;
  enclosures: Enclosure[];
  guid: Guid;
  itunes: ItunesInfo;
  link: string;
  pubDate: string;
  title: string;
}

export interface DcInfo {
  creator: string;
  creators: string[];
}

export interface Enclosure {
  length: number;
  type: string;
  url: string;
}

export interface Guid {
  isPermaLink: boolean;
  value: string;
}

export interface ItunesInfo {
  duration: number;
  episodeType: "full" | "trailer" | "bonus" | string;
  explicit: boolean;
  image: string;
  summary: string;
}
