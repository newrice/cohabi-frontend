import React, { useState, useEffect, useMemo } from "react";
import {
  Paper,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
} from "@material-ui/core";
import clsx from "clsx";
import CalendarItemContent from "./CalendarItemContent";
import CalendarItemTitle from "./CalendarItemTitle";
import { ExpandEditButton } from "../../component/molecules";
import { ICalendar, ICalendarResponse, IUser } from "../../types";
import { getDateString } from "../../utils";

const accordionDetailsClass = clsx("column-container", "ai-strech-container");

interface ICalendarItem {
  item: ICalendarResponse;
  user?: IUser | null;
  onSubmit: (item: ICalendar) => void;
}
const CalendarItem = ({ item, user, onSubmit }: ICalendarItem): JSX.Element => {
  let prevItem: ICalendarResponse = { ...item };
  const [date, setDate] = useState<string>(item.date);
  const [name, setName] = useState<string>(item.name);
  const [comment, setComment] = useState<string>(item.comment);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    prevItem = { ...item };
  }, []);
  const isPast = useMemo(() => prevItem.date < getDateString(), [
    prevItem.date,
  ]);

  const handleEditCancel = () => {
    if (date !== prevItem.date) {
      setDate(prevItem.date);
    }
    if (name !== prevItem.name) {
      setName(prevItem.name);
    }
    if (comment !== prevItem.comment) {
      setComment(prevItem.comment);
    }
  };
  const handleExpandChange = () => setExpanded(!expanded);
  const handleExpand = () => setExpanded(true);
  const handleExpandLess = () => setExpanded(false);

  const handleDateChange = (value: Date | null) =>
    setDate(getDateString(value));
  const handleNameChange = (value: string) => setName(value);
  const handleCommentChange = (value: string) => setComment(value);

  const handleSubmit = () => onSubmit({ ...item, date, name, comment });
  return (
    <Paper key={`todo-accordinon-wrapper-${item.id}`}>
      <Accordion
        elevation={0}
        className={isPast ? "calendar-item-past-container" : ""}
        key={`todo-accordinon-${item.id}`}
        expanded={expanded}
        onChange={handleExpandChange}
      >
        <AccordionSummary>
          <CalendarItemTitle
            avatarSrc={user && user.avatar ? user.avatar[0] : ""}
            avatarText={user ? user.name[0] : ""}
            // disabled={isPast}
            value={name}
            onClick={handleExpand}
            onChange={handleNameChange}
          />
        </AccordionSummary>
        <AccordionDetails className={accordionDetailsClass}>
          <CalendarItemContent
            // dateDisabled={isPast}
            // commentDisabled={isPast}
            date={date}
            comment={comment}
            onDateChange={handleDateChange}
            onCommentChange={handleCommentChange}
          />
        </AccordionDetails>
        <AccordionActions>
          <ExpandEditButton
            // cancelButtonDisabled={isPast}
            submitButtonDisabled={
              // isPast ||
              !item.id || !item.date || !item.name
            }
            onCancelClick={handleEditCancel}
            onExpandLessClick={handleExpandLess}
            onSubmitClick={handleSubmit}
          />
        </AccordionActions>
      </Accordion>
    </Paper>
  );
};
CalendarItem.defaultProps = {
  user: null,
};
export default CalendarItem;
