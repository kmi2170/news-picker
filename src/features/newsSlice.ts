import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { initialState } from "./initialState";
import { LangType, TopicType } from "../api/type_settngs";

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<LangType>) => {
      state.lang = action.payload;
    },
    setTopic: (state, action: PayloadAction<TopicType>) => {
      state.topic = action.payload;
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
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

export const { setLang, setTopic, setFavorites } = newsSlice.actions;

export default newsSlice.reducer;
