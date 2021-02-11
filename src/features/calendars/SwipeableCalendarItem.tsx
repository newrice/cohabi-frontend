import React from "react";
import SwipeableViews from "react-swipeable-views";
import CalendarItem from "./CalendarItem";
import { SwipeDelete } from "../../component/parts";
import { ICalendar, ICalendarResponse, IUser } from "../../types";

interface ISwipeableCalendarItem {
  item: ICalendarResponse;
  user?: IUser | null;
  onSubmit: (item: ICalendar) => void;
  onDelete: (id: string) => void;
}

const createSwipeableChildren = (
  calendar: ICalendarResponse,
  onSubmit: (item: ICalendar) => void,
  user?: IUser | null,
): JSX.Element[] => {
  const children: JSX.Element[] = [];
  children.push(
    <CalendarItem
      key={`calendar-swipe-item-${calendar.id}`}
      item={calendar}
      user={user}
      onSubmit={onSubmit}
    />,
  );
  children.push(
    <SwipeDelete
      key={`calendar-swipable-delete-${calendar.id}`}
      id={calendar.id}
    />,
  );
  return children;
};

const SwipeableCalendarItem = ({
  item,
  user,
  onDelete,
  onSubmit,
}: ISwipeableCalendarItem): JSX.Element => {
  // console.log("SwipeableTodoItem");
  const handleDelete = async () => {
    onDelete(item.id);
  };
  const handleChangePanelIndex = (index: number) => {
    if (index === 1) {
      handleDelete();
    }
  };
  return (
    <SwipeableViews
      enableMouseEvents
      key={`todo-swipable-${item.id}`}
      onChangeIndex={handleChangePanelIndex}
    >
      {createSwipeableChildren(item, onSubmit, user)}
    </SwipeableViews>
  );
};
SwipeableCalendarItem.defaultProps = {
  user: null,
};
export default SwipeableCalendarItem;
