export const sortData = (data: any, sortby: string) => {
  const sortData = [...data]; // copy array to avoid data mutation
  return sortData.sort((a: any, b: any) => (a[sortby] > b[sortby] ? -1 : 1));
};
