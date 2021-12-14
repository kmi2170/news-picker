export const localToUTCString = (dt: Date) => {
  const year = dt.getUTCFullYear();

  const month = (dt.getUTCMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });

  const date = dt
    .getUTCDate()
    .toLocaleString("en-US", { minimumIntegerDigits: 2 });

  return `${year}/${month}/${date}`;
};
