import React from "react";
import { useTranslation } from "react-i18next";
import { TextField } from "@material-ui/core";
import { DatePicker } from "../../component/parts";

interface ICalendarItemContent {
  dateDisabled?: boolean;
  commentDisabled?: boolean;
  date: string;
  comment: string;
  onDateChange: (value: Date | null) => void;
  onCommentChange: (value: string) => void;
}

const formFieldCommonClass = "input-field-base";

const CalendarItemContent = ({
  dateDisabled,
  commentDisabled,
  date,
  comment,
  onDateChange,
  onCommentChange,
}: ICalendarItemContent): JSX.Element => {
  const { t } = useTranslation();
  const handleDateChange = (d: Date | null) => {
    onDateChange(d);
  };
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCommentChange(event.target.value);
  };
  return (
    <>
      <DatePicker
        disabled={dateDisabled}
        value={date}
        onChange={handleDateChange}
        format="yyyy/MM/dd"
        className={formFieldCommonClass}
      />
      <TextField
        disabled={commentDisabled}
        label={t("LABEL_COMMENT")}
        className={formFieldCommonClass}
        value={comment}
        variant="outlined"
        onChange={handleCommentChange}
        rows={3}
        rowsMax={10}
        multiline
      />
    </>
  );
};
CalendarItemContent.defaultProps = {
  dateDisabled: false,
  commentDisabled: false,
};
export default CalendarItemContent;
