// #region Calondar
export interface ICalendarBase {
  date: string;
  name: string;
  comment: string;
}
export interface ICalendar extends ICalendarBase {
  id: string;
}
export interface ICalendarResponse extends ICalendar {
  user: string;
}
export interface IGroupByDateCalendars {
  [key: string]: ICalendarResponse[];
}
// #endregion

// #region Category
export interface ICategory {
  id: string;
  name: string;
  disabled: boolean;
}
// #endregion

// #region Costs
export type TKeyOfCost = "date" | "value" | "category" | "comment";
export type ICostBase = {
  [key in TKeyOfCost]: string;
};
export interface ICost extends ICostBase {
  user: string;
}
export interface ICostResponse extends ICost {
  id: string;
}
export type TCostChangeHandler = (key: TKeyOfCost, value: string) => void;
// #endregion

// #region Todo
export interface ITodoBase {
  name: string;
  comment: string;
  done: boolean;
}
export interface ITodo extends ITodoBase {
  id: string;
}
// #endregion

// #region User
export interface ICurrentUser {
  email: string;
  id: string;
  name: string;
  avatar: string;
  groups: IGroup[];
}
export interface IUser {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}
// #endregion

// #region Group
export interface IGroupBase {
  name: string;
}

export interface IGroup extends IGroupBase {
  id: string;
}

export interface IResponseGroup extends IGroup {
  users: string[];
}
// #endregion

// #region Util
export interface KeyValuePair {
  id: string | number;
  name: string | number | undefined;
  disabled?: boolean;
}
export type TCrudTypes = "insert" | "update" | "delete";
// #endregion
