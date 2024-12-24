"use server";

import { HeadlinesReturnType } from "../../api/types";
import { dummyHeadlines } from "../../dummyNewsData/dummy-headline";
import { timer } from "../../utils/timer";

export const getDummyTopHeadlines = async (): Promise<HeadlinesReturnType> => {
  timer(5000);
  return dummyHeadlines as HeadlinesReturnType;
};
