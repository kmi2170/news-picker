import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { QueryType } from "../api/type_settngs";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  // keepUnusedDataFor: 30,
  // refetchOnMountOrArgChange: 30,
  // refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getNewsApi: builder.query({
      query: ({ q, lang, topic, page, from, to, sources }: QueryType) => {
        return `news?q=${q}&lang=${lang}&topic=${topic}&page=${page}&from=${from}&to=${to}&sources=${sources}`;
      },
    }),
  }),
});

export const { useGetNewsApiQuery } = newsApi;
