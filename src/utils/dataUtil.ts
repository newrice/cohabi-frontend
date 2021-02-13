import _ from "lodash";
import equal from "fast-deep-equal";
import { ISnackBarBase } from "../component/parts";
import { ICategory, IGroupedCostList, IUser } from "../types";

export const getCategoryName = (
  categories: ICategory[],
  categoryId: string,
): string => {
  const c = categories.find(item => categoryId === item.id);
  return c ? c.name : categoryId;
};

export const getUserName = (users: IUser[], userId: string): string => {
  const u = users.find(item => userId === item.id);
  return u ? u.name : userId;
};

export const getAvatar = (users: IUser[], userId: string): string => {
  const u = users.find(item => userId === item.id);
  return u ? u.avatar || "" : "";
};

export const createSnackState = (
  isError: boolean,
  msg: string,
): ISnackBarBase => ({
  message: msg,
  severity: isError ? "error" : "success",
  closable: isError,
  autoHideDuration: !isError ? 3000 : undefined,
});

const n999 = ["N_999", "N_XXX"];
export const isN999 = (item?: string | ICategory): boolean => {
  if (_.isUndefined(item)) {
    return false;
  }
  if (_.isString(item)) {
    return n999.includes(item);
  }
  return n999.includes(item.id);
};

export const isEqual = <T>(a: T, b: T): boolean => equal(a, b);

interface IHasValue {
  value: string | number;
}
interface IGroupedHasValue {
  [groupKey: string]: IHasValue[];
}
interface IGroupedHasValueTotaled {
  [groupKey: string]: number;
}

export const getTotal = (list: IHasValue[]): number =>
  list
    .map(item => Number(item.value || 0))
    .reduce((prev, curr) => prev + curr, 0);

export const getTotals = (data: IGroupedHasValue): IGroupedHasValueTotaled => {
  const obj: IGroupedHasValueTotaled = {};
  Object.keys(data).forEach(key => {
    obj[key] = getTotal(data[key]);
  });
  return obj;
};

export const getFullTotal = (data: IGroupedHasValue): number => {
  let total = 0;
  const totals = getTotals(data);
  Object.keys(totals).forEach(key => {
    total += totals[key];
  });
  return total;
};

export const sortByKey = (data: IGroupedCostList): IGroupedCostList => {
  const ordered: IGroupedCostList = {};
  Object.keys(data)
    .sort()
    .forEach(key => {
      ordered[key] = data[key];
    });
  return ordered;
};
