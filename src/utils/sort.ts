export const sortData = (data: unknown, sortby: string) => {
  const sortData = [...(data as unknown[])]; // copy array to avoid data mutation
  return sortData.sort((a: unknown, b: unknown) =>
    a[sortby] > b[sortby] ? -1 : 1
  );
};
