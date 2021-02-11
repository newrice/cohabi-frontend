import { ICalendar, ICalendarBase } from "../../types";

/**
 * Is Invalide Post Data
 * @param item ITodoBase
 * @returns true: invalid false:valid
 */
export const isPostValid = (item: ICalendarBase): boolean =>
  !item.name || !item.date;

/**
 * Is Invalide Delete Data
 * @param item ITodo
 * @returns true: invalid false:valid
 */
const isDeleteValid = (item: ICalendar): boolean => !item.id;

/**
 * Is Invalide Put Data
 * @param item ITodo
 * @returns true: invalid false:valid
 */
export const isPutValid = (item: ICalendar): boolean =>
  isPostValid(item) || isDeleteValid(item);
