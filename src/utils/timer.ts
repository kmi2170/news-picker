export const timer = (duration: number) => {
  return new Promise(() => {
    setTimeout(() => {
      Promise.resolve();
    }, duration);
  });
};
