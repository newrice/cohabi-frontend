import _ from "lodash";

interface DateStrObject {
  year: string;
  month: string;
  day: string;
}

export const dateToString = (date: Date): DateStrObject => ({
  year: date.getFullYear().toString(),
  month:
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : (date.getMonth() + 1).toString(),
  day: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate().toString(),
});

/**
 * Returns string witch is formatted as yyyy/MM/dd
 * @param date if dont pass, use now
 */
export const getDateString = (date?: Date): string => {
  let now = new Date();
  if (date) {
    now = date;
  }
  const obj = dateToString(now);
  return `${obj.year}/${obj.month}/${obj.day}`;
};

/**
 * Convert date string to Date object.
 * If could not convert, return new Date().
 * @param date formatted as yyyy/MM/dd
 */
export const stringToDate = (date: string): Date => {
  try {
    const dateList = date.split("/");
    if (dateList.length !== 3) {
      throw new Error();
    }
    const separateDate = {
      year: Number(dateList[0]),
      month: Number(dateList[1]) - 1,
      day: Number(dateList[2]),
    };
    if (
      !_.isFinite(separateDate.year) ||
      !_.isFinite(separateDate.month) ||
      !_.isFinite(separateDate.day)
    ) {
      throw new Error();
    }
    return new Date(separateDate.year, separateDate.month, separateDate.day);
  } catch {
    return new Date();
  }
};
/**
 * Convert date string to DateStrObject.
 * If could not convert, return new Date() DateStrObject.
 * @param date formatted as yyyy/MM/dd
 */
export const dateStringSplit = (date: string): DateStrObject => {
  const dateObj = stringToDate(date);
  return dateToString(dateObj);
};

export const dayOfWeekStr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];