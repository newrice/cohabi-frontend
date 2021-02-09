import { cloneDeep } from "lodash";

export const arrayMoveMutate = <T>(
  array: T[],
  from: number,
  to: number,
): void => {
  const startIndex = from < 0 ? array.length + from : from;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = to < 0 ? array.length + to : to;

    const [item] = array.splice(from, 1);
    array.splice(endIndex, 0, item);
  }
};

export const arrayMoveClone = <T>(
  array: T[],
  from: number,
  to: number,
): T[] => {
  const newArray = cloneDeep(array);
  arrayMoveMutate(newArray, from, to);
  return newArray;
};
