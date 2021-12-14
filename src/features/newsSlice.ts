import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { initialState } from "./initialState";
import { LangType, TopicType } from "../api/type_settngs";

export const newsSlice = createSlice({
  name: "news",
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
    setSources: (state, action: PayloadAction<string>) => {
      state.sources = action.payload;
    },
    setIsReset: (state, action: PayloadAction<boolean>) => {
      state.isReset = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
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
    reset: () => initialState,
  },
  /* extraReducers: (builder) => {
    builder
      .addCase(asyncThunkIpLookupLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(asyncThunkIpLookupLocation.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(asyncThunkIpLookupLocation.rejected, (state, error) => {
        state.isLoading = false;
        state.isError = true;
        console.log(error);
      })
  }, */
});

export const selectNews = (state: RootState) => state.news;

export const {
  setQ,
  setLang,
  setTopic,
  setFavorites,
  setPage,
  setFrom,
  setTo,
  setSources,
  setIsReset,
  reset,
  setSearchTerm,
  setSearchSources,
  setPickerDateFrom,
  setPickerDateTo,
} = newsSlice.actions;

export default newsSlice.reducer;
