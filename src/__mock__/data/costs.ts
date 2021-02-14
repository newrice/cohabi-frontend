import { ICostResponse } from "../../types";

export const costsData: ICostResponse[] = [
  {
    id: "COSTS_1",
    date: "2021/02/10",
    user: "test.user2",
    value: "1000",
    comment: "コメント1",
    category: "CAT_1",
  },
  {
    id: "COSTS_2",
    date: "2021/02/11",
    user: "test.user1",
    value: "1000",
    comment: "コメント2",
    category: "CAT_2",
  },
  {
    id: "COSTS_3",
    date: "2021/01/10",
    user: "test.user2",
    value: "3000",
    comment: "コメント3",
    category: "CAT_3",
  },
  {
    id: "COSTS_4",
    date: "2021/02/09",
    user: "test.user2",
    value: "4000",
    comment: "コメント4",
    category: "CAT_4",
  },
];
export default costsData;
