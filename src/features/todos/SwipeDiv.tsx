import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import UndoIcon from "@material-ui/icons/Undo";
import clsx from "clsx";

const swipableBaseClass = "swipable-base";
const swipableLtrClass = clsx(swipableBaseClass, "swipable-ltr");
const swipableRtlClass = clsx(swipableBaseClass, "swipable-rtl");
interface ISwipeDiv {
  id: string;
}
export const SwipeDone = ({ id }: ISwipeDiv): JSX.Element => (
  <div
    key={`todo-swipe-done-${id}`}
    className={clsx(swipableRtlClass, "swipable-done")}
  >
    <DoneIcon />
  </div>
);

export const SwipeDelete = ({ id }: ISwipeDiv): JSX.Element => (
  <div
    key={`todo-swipe-delete-${id}`}
    className={clsx(swipableRtlClass, "swipable-delete")}
  >
    <DeleteIcon />
  </div>
);

export const SwipeUndone = ({ id }: ISwipeDiv): JSX.Element => (
  <div
    key={`todo-swipe-undone-${id}`}
    className={clsx(swipableLtrClass, "swipable-undone")}
  >
    <UndoIcon />
  </div>
);
