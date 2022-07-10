export const localToUTCString = (dt: Date) => {
  const year = dt.getUTCFullYear();

  const month = (dt.getUTCMonth() + 1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  });

  const date = dt
    .getUTCDate()
    .toLocaleString('en-US', { minimumIntegerDigits: 2 });

  return `${year}/${month}/${date}`;
};

export const localString = (dt: Date) => {
  const year = dt.getFullYear();

  const month = (dt.getMonth() + 1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  });

  const date = dt
    .getDate()
    .toLocaleString('en-US', { minimumIntegerDigits: 2 });

  return `${year}/${month}/${date}`;
};
