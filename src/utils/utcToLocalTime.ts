export const utcToLocalTime = (dt: string) => {
  const [d_str, t_str] = dt.split(' ');
  const dt_arr = [...d_str.split('-'), ...t_str.split(':')];
  const ndt_arr = dt_arr.map((el) => +el);

  const nutc = new Date(
    Date.UTC(
      ndt_arr[0],
      ndt_arr[1] - 1,
      ndt_arr[2],
      ndt_arr[3],
      ndt_arr[4],
      ndt_arr[5]
    )
  );

  return nutc.toLocaleString();
};
