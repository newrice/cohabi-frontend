import React from "react";
import SwipeableCalendarItem from "./SwipeableCalendarItem";
import { ICalendar, ICalendarResponse, IUser } from "../../types";

interface ICalendarList {
  calendars: ICalendarResponse[];
  users: IUser[];
  onSubmit: (item: ICalendar) => void;
  onDelete: (id: string) => void;
}
const CalendarList = ({
  calendars,
  users,
  onSubmit,
  onDelete,
}: ICalendarList): JSX.Element => (
  <>
    {calendars.map(calendar => (
      <SwipeableCalendarItem
        key={`swipeable-todo-item-${calendar.id}`}
        item={calendar}
        user={users.find(user => user.id === calendar.user)}
        onDelete={onDelete}
        onSubmit={onSubmit}
      />
    ))}
  </>
);

export default CalendarList;
