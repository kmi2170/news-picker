export type LangType = 'en' | 'jp';

export type CategoryType =
  | 'top'
  | 'business'
  | 'science'
  | 'technology'
  | 'sports'
  | 'health'
  | 'entertainment';

interface IResults {
  title: string | null;
  link: string | null;
  keywords: string[] | null;
  creator: string[] | null;
  video_url: string | null;
  description: string;
  content: string | null;
  pubDate: string | null;
  image_url: string | null;
  source_id: string | null;
}

export interface IData {
  status: string;
  totalResults: number;
  results: IResults[];
  nextPage: number;
}
