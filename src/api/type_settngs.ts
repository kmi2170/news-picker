export type LangType = 'en' | 'ja';

export interface IArticle {
  title: string | null;
  author: string | null;
  published_date: string | null;
  published_date_precision: string | null;
  link: string | null;
  clean_url: string | null;
  summary: string | null;
  rights: string | null;
  rank: number | null;
  topic: string | null;
  country: string | null;
  language: string | null;
  authors: [] | null;
  media: string | null;
  is_opinion: boolean;
  twitter_account: string | null;
  _score: number | null;
  _id: string | null;
}

export interface IData {
  status: string;
  total_hits: number;
  page: number;
  total_pages: number;
  page_size: number;
  articles: IArticle[];
  user_input: {
    q?: string;
    lang?: string;
    from?: string;
    sort_by?: string;
    page?: number;
    size?: number;
  };
}

export type CategoryType =
  | 'top'
  | 'business'
  | 'science'
  | 'technology'
  | 'sports'
  | 'health'
  | 'entertainment';

// export interface IResult {
//   title: string | null;
//   link: string | null;
//   keywords: string[] | null;
//   creator: string[] | null;
//   video_url: string | null;
//   description: string;
//   content: string | null;
//   pubDate: string | null;
//   image_url: string | null;
//   source_id: string | null;
// }

// export interface IData {
//   status: string;
//   totalResults: number;
//   results: IResult[];
//   nextPage: number;
// }
