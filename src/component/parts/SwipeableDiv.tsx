import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import UndoIcon from "@material-ui/icons/Undo";
import clsx from "clsx";

const swipableBaseClass = "swipable-base";
interface ISwipeableDivBase {
  swipeableKey: string;
  className?: string;
  children?: React.ReactElement;
}
interface ISwipeDiv {
  id: string;
}

export const SwipeableDivBase = ({
  swipeableKey,
  className,
  children,
}: ISwipeableDivBase): JSX.Element => (
  <div key={swipeableKey} className={clsx(swipableBaseClass, className)}>
    {children}
  </div>
);
SwipeableDivBase.defaultProps = {
  className: "",
  children: null,
};

const swipableLtrClass = clsx(swipableBaseClass, "swipable-ltr");
const swipableRtlClass = clsx(swipableBaseClass, "swipable-rtl");
export const SwipeDone = ({ id }: ISwipeDiv): JSX.Element => (
  <SwipeableDivBase
    swipeableKey={`todo-swipe-done-${id}`}
    className={clsx(swipableRtlClass, "swipable-done")}
  >
    <DoneIcon />
  </SwipeableDivBase>
);

export const SwipeDelete = ({ id }: ISwipeDiv): JSX.Element => (
  <SwipeableDivBase
    swipeableKey={`todo-swipe-delete-${id}`}
    className={clsx(swipableRtlClass, "swipable-delete")}
  >
    <DeleteIcon />
  </SwipeableDivBase>
);

export const SwipeUndone = ({ id }: ISwipeDiv): JSX.Element => (
  <SwipeableDivBase
    swipeableKey={`todo-swipe-undone-${id}`}
    className={clsx(swipableLtrClass, "swipable-undone")}
  >
    <UndoIcon />
  </SwipeableDivBase>
);
