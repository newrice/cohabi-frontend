import React, { useCallback, useState } from "react";
import { Paper } from "@material-ui/core";
import clsx from "clsx";
import Header from "./Header";
import NewCalendarDialog from "./NewCalendarDialog";
import CalendarDateList from "./CalendarDateList";
import {
  ICalendarBase,
  ICalendar,
  IGroupByDateCalendars,
  IUser,
} from "../../types";

interface ICalendarForm {
  groupedCalendar: IGroupByDateCalendars;
  users: IUser[];
  onDelete: (id: string) => void;
  onPost: (item: ICalendarBase) => void;
  onPut: (item: ICalendar) => void;
}

const divClass = clsx("input-wrapper", "fab-bottom-spacer");
const paperClass = clsx("underlay-paper-base");

const CalendarForm = ({
  groupedCalendar,
  users,
  onDelete,
  onPost,
  onPut,
}: ICalendarForm): JSX.Element => {
  const [showPast, setShowPast] = useState<boolean>(false);

  const handleShowPastChange = useCallback(() => {
    setShowPast(!showPast);
  }, [showPast]);

  return (
    <div className={divClass}>
      <Paper className={paperClass}>
        <Header showPast={showPast} onChangeShowPast={handleShowPastChange} />
        <CalendarDateList
          groupedCalendar={groupedCalendar}
          users={users}
          showPast={showPast}
          onDelete={onDelete}
          onSubmit={onPut}
        />
        <NewCalendarDialog onPostClick={onPost} />
      </Paper>
    </div>
  );
};

export default CalendarForm;
