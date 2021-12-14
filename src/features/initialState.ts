import { LangType, TopicType } from "../api/type_settngs";
import { localToUTCString } from "../utils/localToUTCString";

const initDateFrom = new Date();
initDateFrom.setDate(initDateFrom.getDate() - 7);

export const initialState: StateType = {
  q: "",
  lang: "en",
  topic: "",
  favorites: [],
  page: 1,
  from: localToUTCString(initDateFrom),
  to: localToUTCString(new Date()),
  sources: "",
  isReset: false,
  searchTerm: "",
  searchSources: "",
  pickerDateFrom: initDateFrom,
  pickerDateTo: new Date(),
};

export type StateType = {
  q: string;
  lang: LangType;
  topic: TopicType;
  favorites: string[];
  page: number;
  from: string;
  to: string;
  sources: string;
  isReset: boolean;
  searchTerm: string;
  searchSources: string;
  pickerDateFrom: Date;
  pickerDateTo: Date;
};
