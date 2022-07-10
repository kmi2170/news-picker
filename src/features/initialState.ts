import { LangType, TopicType } from '../api/type_settngs';
import { localToUTCString, localString } from '../utils/localToUTCString';

const initDateFrom = new Date();
initDateFrom.setDate(initDateFrom.getDate() - 7);

export const initialState: StateType = {
  q: '',
  lang: 'en',
  topic: '',
  topicsAvailable: [],
  favorites: [],
  page: 1,
  from: localToUTCString(initDateFrom),
  to: localToUTCString(new Date()),
  fromLocal: localString(initDateFrom),
  toLocal: localString(new Date()),
  sources: '',
  searchTerm: '',
  searchSources: '',
  pickerDateFrom: initDateFrom,
  pickerDateTo: new Date(),
};

export type StateType = {
  q: string;
  lang: LangType;
  topic: TopicType;
  topicsAvailable: TopicType[];
  favorites: string[];
  page: number;
  from: string;
  to: string;
  fromLocal: string;
  toLocal: string;
  sources: string;
  searchTerm: string;
  searchSources: string;
  pickerDateFrom: Date;
  pickerDateTo: Date;
};
