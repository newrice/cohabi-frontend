import _ from "lodash";
import equal from "fast-deep-equal";
import { ISnackBarBase } from "../component/parts";
import { ICategory, IUser } from "../types";

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
