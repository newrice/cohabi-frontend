import { getDateStr } from "../../testutil/date";
import {
  dateToString,
  stringToDate,
  dateStringSplit,
  dayOfWeekStr,
  getDateString,
} from "./dateUtil";

describe("* dateToString", () => {
  test("** with 0s", () => {
    const date = new Date(2000, 0, 1);
    const obj = dateToString(date);
    expect(obj.year).toBe("2000");
    expect(obj.month).toBe("01");
    expect(obj.day).toBe("01");
  });
  test("** with 10s", () => {
    const date = new Date(2020, 9, 10);
    const obj = dateToString(date);
    expect(obj.year).toBe("2020");
    expect(obj.month).toBe("10");
    expect(obj.day).toBe("10");
  });
  test("** with no 0s", () => {
    const date = new Date(2222, 11, 31);
    const obj = dateToString(date);
    expect(obj.year).toBe("2222");
    expect(obj.month).toBe("12");
    expect(obj.day).toBe("31");
  });
});

describe("* stringToDate", () => {
  test("** with 0s", () => {
    const date = "2000/01/01";
    const obj = stringToDate(date);
    expect(obj.getFullYear()).toBe(2000);
    expect(obj.getMonth() + 1).toBe(1);
    expect(obj.getDate()).toBe(1);
  });
  test("** with 10s", () => {
    const date = "2020/10/10";
    const obj = stringToDate(date);
    expect(obj.getFullYear()).toBe(2020);
    expect(obj.getMonth() + 1).toBe(10);
    expect(obj.getDate()).toBe(10);
  });
  test("** with no 0s", () => {
    const date = "2222/12/31";
    const obj = stringToDate(date);
    expect(obj.getFullYear()).toBe(2222);
    expect(obj.getMonth() + 1).toBe(12);
    expect(obj.getDate()).toBe(31);
  });
  test("** error ass format", () => {
    const date = "2222-10-10";
    const now = new Date();
    const obj = stringToDate(date);
    expect(obj.getFullYear()).toBe(now.getFullYear());
    expect(obj.getMonth()).toBe(now.getMonth());
    expect(obj.getDate()).toBe(now.getDate());
  });
  test("** error as test", () => {
    const date = "aaaa/bb/cc";
    const now = new Date();
    const obj = stringToDate(date);
    expect(obj.getFullYear()).toBe(now.getFullYear());
    expect(obj.getMonth()).toBe(now.getMonth());
    expect(obj.getDate()).toBe(now.getDate());
  });
});

describe("* dateStringSplit", () => {
  test("** with 0s", () => {
    const date = "2000/01/01";
    const obj = dateStringSplit(date);
    expect(obj.year).toBe("2000");
    expect(obj.month).toBe("01");
    expect(obj.day).toBe("01");
  });
  test("** with 10s", () => {
    const date = "2020/10/10";
    const obj = dateStringSplit(date);
    expect(obj.year).toBe("2020");
    expect(obj.month).toBe("10");
    expect(obj.day).toBe("10");
  });
  test("** with no 0s", () => {
    const date = "2222/12/31";
    const obj = dateStringSplit(date);
    expect(obj.year).toBe("2222");
    expect(obj.month).toBe("12");
    expect(obj.day).toBe("31");
  });
});

describe("* dayOfWeekStr", () => {
  test("** week days", () => {
    const sun = new Date(2020, 9, 18);
    const mon = new Date(2020, 9, 19);
    const tue = new Date(2020, 9, 20);
    const wed = new Date(2020, 9, 21);
    const thu = new Date(2020, 9, 22);
    const fri = new Date(2020, 9, 23);
    const sat = new Date(2020, 9, 24);
    expect(dayOfWeekStr[sun.getDay()]).toBe("Sun");
    expect(dayOfWeekStr[mon.getDay()]).toBe("Mon");
    expect(dayOfWeekStr[tue.getDay()]).toBe("Tue");
    expect(dayOfWeekStr[wed.getDay()]).toBe("Wed");
    expect(dayOfWeekStr[thu.getDay()]).toBe("Thu");
    expect(dayOfWeekStr[fri.getDay()]).toBe("Fri");
    expect(dayOfWeekStr[sat.getDay()]).toBe("Sat");
  });
});

describe("* getDateString", () => {
  test("** has date", () => {
    const d = new Date(2020, 11, 31);
    const s = getDateString(d);
    expect(s).toBe("2020/12/31");
  });
  test("** no date", () => {
    const d = new Date();
    const s = getDateString();
    const exp = getDateStr(d); // test util
    expect(s).toBe(exp);
  });
});
