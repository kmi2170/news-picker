export const sortData = (data: any, name: string) => {
  let sortedData = data;

  return sortedData.sort((a: any, b: any) => (a[name] > b[name] ? -1 : 1));
};
