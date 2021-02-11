import { ICalendarResponse } from "../../types";

export const calendarsData: ICalendarResponse[] = [
  {
    date: "2020/12/31",
    id: "CAL_1",
    name: "家具購入",
    comment: "",
    user: "USR_1",
  },
  {
    date: "2021/01/01",
    id: "TCAL_2",
    name: "牛乳購入",
    comment: "コメント",
    user: "USR_1",
  },
  {
    date: "2021/03/01",
    id: "CAL_3",
    name: "基本情報受験",
    comment: "",
    user: "USR_2",
  },
  {
    date: "2022/12/31",
    id: "CAL_4",
    name: "空",
    comment: "",
    user: "USR_2",
  },
  {
    date: "2021/08/10",
    id: "CAL_5",
    name: "お盆",
    comment: "帰省します",
    user: "USR_4", // 存在しない
  },
];
export default calendarsData;
