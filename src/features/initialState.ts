import { NewsDataType, LangType, TopicType } from "../api/type_settngs";

export const initialState: StateType = {
  news: null,
  lang: "en",
  topic: null,
  favorites: [],
  /* isLoading: false,
  isError: false, */
};

export type StateType = {
  news: NewsDataType;
  lang: LangType;
  topic: TopicType | null;
  favorites: string[];
  /* isLoading: boolean;
  isError: boolean; */
};
