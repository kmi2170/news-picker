import { resolve } from "path";

export const timer = (duration: number) => {
  return new Promise(() => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};
