import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { initialState } from './initialState';
import { LangType, TopicType } from '../api/type_settngs';

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setQ: (state, action: PayloadAction<string>) => {
      state.q = action.payload;
    },
    setLang: (state, action: PayloadAction<LangType>) => {
      state.lang = action.payload;
    },
    setTopic: (state, action: PayloadAction<TopicType>) => {
      state.topic = action.payload;
    },
    setTopicsAvailable: (state, action: PayloadAction<TopicType[]>) => {
      state.topicsAvailable = action.payload;
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setFrom: (state, action: PayloadAction<string>) => {
      state.from = action.payload;
    },
    setTo: (state, action: PayloadAction<string>) => {
      state.to = action.payload;
    },
    setFromLocal: (state, action: PayloadAction<string>) => {
      state.fromLocal = action.payload;
    },
    setToLocal: (state, action: PayloadAction<string>) => {
      state.toLocal = action.payload;
    },
    setSources: (state, action: PayloadAction<string>) => {
      state.sources = action.payload;
    },
    setSearchSources: (state, action: PayloadAction<string>) => {
      state.searchSources = action.payload;
    },
    setPickerDateFrom: (state, action: PayloadAction<Date>) => {
      state.pickerDateFrom = action.payload;
    },
    setPickerDateTo: (state, action: PayloadAction<Date>) => {
      state.pickerDateTo = action.payload;
    },
    reset: (state) => {
      const lang = state.lang;
      const topicsAvailable = state.topicsAvailable;
      return { ...initialState, lang, topicsAvailable };
    },
    // setSearchTerm: (state, action: PayloadAction<string>) => {
    //   state.searchTerm = action.payload;
    // },
  },
});

export const selectNews = (state: RootState) => state.news;

export const {
  setQ,
  setLang,
  setTopic,
  setTopicsAvailable,
  setFavorites,
  setPage,
  setFrom,
  setTo,
  setFromLocal,
  setToLocal,
  setSources,
  reset,
  setSearchSources,
  setPickerDateFrom,
  setPickerDateTo,
  // setSearchTerm,
} = newsSlice.actions;

export default newsSlice.reducer;
