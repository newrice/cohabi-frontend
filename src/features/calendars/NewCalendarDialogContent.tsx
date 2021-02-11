import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, TextField } from "@material-ui/core";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import clsx from "clsx";
import { ICalendarBase } from "../../types";
import { DatePicker } from "../../component/parts";
import { getDateString } from "../../utils";
import { isPostValid } from "./validator";

interface INewCalendarDialogContent {
  onPostClick: (item: ICalendarBase) => void;
}

const formClass = clsx("column-container");
const inputFieldClass = clsx("input-field-base");
const baseTodo: ICalendarBase = {
  date: getDateString(),
  name: "",
  comment: "",
};

const NewCalendarDialogContent = ({
  onPostClick,
}: INewCalendarDialogContent): JSX.Element => {
  const { t } = useTranslation();
  const [date, setDate] = useState<string>(baseTodo.date);
  const [name, setName] = useState<string>(baseTodo.name);
  const [comment, setComment] = useState<string>(baseTodo.comment);
  const handleDateChange = (d: MaterialUiPickersDate) => {
    if (d) {
      const newDate = getDateString(d);
      setDate(newDate);
    }
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };
  const handlePostClick = () => {
    onPostClick({ ...baseTodo, date, name, comment });
    setDate(baseTodo.date);
    setName("");
    setComment("");
  };

  return (
    <div className={formClass}>
      <DatePicker
        className={inputFieldClass}
        value={date}
        onChange={handleDateChange}
        format="yyyy/MM/dd"
      />
      <TextField
        className={inputFieldClass}
        label={t("LABEL_SCHEDULE")}
        onChange={handleNameChange}
        value={name}
      />
      <TextField
        className={inputFieldClass}
        label={t("LABEL_COMMENT")}
        value={comment}
        variant="outlined"
        onChange={handleCommentChange}
        rows={3}
        rowsMax={10}
        multiline
      />
      <Button
        className={inputFieldClass}
        disabled={isPostValid({ date, name, comment })}
        color="secondary"
        variant="contained"
        onClick={handlePostClick}
      >
        {t("LABEL_SUBMIT")}
      </Button>
    </div>
  );
};

export default NewCalendarDialogContent;
