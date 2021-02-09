import { ITodoBase, ITodo } from "../../types";

/**
 * Is Invalide Post Data
 * @param item ITodoBase
 * @returns true: invalid false:valid
 */
export const postValidator = (item: ITodoBase): boolean => !item.name;

/**
 * Is Invalide Delete Data
 * @param item ITodo
 * @returns true: invalid false:valid
 */
const deleteValidator = (item: ITodo): boolean => !item.id;

/**
 * Is Invalide Put Data
 * @param item ITodo
 * @returns true: invalid false:valid
 */
export const putValidator = (item: ITodo): boolean =>
  postValidator(item) || deleteValidator(item);
