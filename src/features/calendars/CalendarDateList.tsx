import React, { Fragment } from "react";
import equal from "fast-deep-equal";
import { ICalendar, IGroupByDateCalendars, IUser } from "../../types";
import { dayOfWeekStr, getDateString, stringToDate } from "../../utils";
import GroupItemTitle from "../../component/molecules/GroupItemTitle";
import CalendarList from "./CalendarList";

interface ICalendarDateList {
  groupedCalendar: IGroupByDateCalendars;
  users: IUser[];
  showPast: boolean;
  onSubmit: (item: ICalendar) => void;
  onDelete: (id: string) => void;
}
const isEqual = (
  prevProps: ICalendarDateList,
  nextProps: ICalendarDateList,
) => {
  if (process.env.NODE_ENV === "development") {
    console.log("isEqual", equal(prevProps, nextProps));
  }
  return equal(prevProps, nextProps);
};

const CalendarDateList = React.memo(
  ({
    groupedCalendar,
    users,
    showPast,
    onSubmit,
    onDelete,
  }: ICalendarDateList): JSX.Element => (
    <>
      {Object.keys(groupedCalendar).map(key => {
        const list = groupedCalendar[key];
        const dateStr = dayOfWeekStr[stringToDate(key).getDay()];
        return (
          (showPast || key >= getDateString()) && (
            <Fragment key={`calendar-date-wrapper-${key}`}>
              <GroupItemTitle title={`${key}(${dateStr})`} />
              <CalendarList
                calendars={list}
                users={users}
                onSubmit={onSubmit}
                onDelete={onDelete}
              />
            </Fragment>
          )
        );
      })}
    </>
  ),
  isEqual,
);

export default CalendarDateList;
