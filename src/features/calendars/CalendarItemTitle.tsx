import React from "react";
import { Avatar, TextField } from "@material-ui/core";
import clsx from "clsx";

interface ICalendarItemTitle {
  disabled?: boolean;
  value: string;
  avatarSrc?: string;
  avatarText?: string;
  onChange: (value: string) => void;
  onClick: () => void;
}

const CalendarItemTitle = ({
  avatarSrc,
  avatarText,
  disabled,
  value,
  onChange,
  onClick,
}: ICalendarItemTitle): JSX.Element => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick();
  };
  const handleFocus = (event: React.FocusEvent) => {
    event.stopPropagation();
    onClick();
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <div className={clsx("row-container", "ai-center-container")}>
      <Avatar src={avatarSrc}>{avatarText}</Avatar>
      <TextField
        className={clsx("flex-auto", "margin-rl-8")}
        disabled={disabled}
        onClick={handleClick}
        onFocus={handleFocus}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};
CalendarItemTitle.defaultProps = {
  disabled: false,
  avatarSrc: "",
  avatarText: "",
};
export default CalendarItemTitle;
