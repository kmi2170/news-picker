import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(relativeTime);

export const timeFromNow = (time: string) => {
  return dayjs(time)
    .utc(true)
    .fromNow();
};
