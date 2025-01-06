import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const convertToIST = (dateString: Date): string => {
  const istDate = dayjs.utc(dateString).tz("Asia/Kolkata");
  return istDate.format("MMM DD YYYY");
};

export const toUTCISOString = (date: Date | null): string => {
  if (!date) return "";
  return dayjs(date).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
};
