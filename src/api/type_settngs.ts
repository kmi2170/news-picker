export type LangType = "en" | "ja";

export type QueryType = {
  q: string;
  lang: LangType;
  page: number;
  topic: TopicType;
  from: string | null;
  to: string | null;
  sources: string;
};

export type ArticleDataType = {
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
};

export type TopicType =
  | ""
  | "news"
  | "sport"
  | "tech"
  | "world"
  | "finance"
  | "politics"
  | "business"
  | "economics"
  | "entertainment"
  | "beauty"
  | "gaming";

/* export type NewsDataType = {
  status: string;
  total_hits: number;
  page: number;
  total_pages: number;
  page_size: number;
  articles: ArticleDataType[];
  user_input: {
    q?: string;
    lang?: string;
    from?: string;
    sort_by?: string;
    page?: number;
    size?: number;
  };
}; */
