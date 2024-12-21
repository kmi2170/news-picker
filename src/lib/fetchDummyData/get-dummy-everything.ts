"use server";

import { EverythingReturnType } from "../../api/types";
import { dummyEverything } from "../../dummyNewsData/dummy-evertything";
import { timer } from "../../utils/timer";

export const getDummyEverything = async (): Promise<EverythingReturnType> => {
  timer(2000);
  return dummyEverything as EverythingReturnType;
};
