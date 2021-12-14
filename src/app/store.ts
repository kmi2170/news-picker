import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import newsSlice from "../features/newsSlice";
import { newsApi } from "../services/newsApi";
// import { weatherOnecallApi } from "../services/weatherOnecallApi";

export const store = configureStore({
  reducer: {
    news: newsSlice,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (gDM) =>
    gDM({ serializableCheck: false }).concat(newsApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
