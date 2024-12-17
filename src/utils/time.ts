import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export const timePeriodFromNow = (time: string) => {
  return dayjs.utc(time).fromNow();
};

export const convertToLocalTime = (time: string) => {
  return dayjs(time).local().format(" h:mma MMM DD");
};
