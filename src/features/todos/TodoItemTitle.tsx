import React from "react";
import { TextField } from "@material-ui/core";

interface ITodoItemTitle {
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
  onClick: () => void;
}

const TodoItemTitle = ({
  disabled,
  value,
  onChange,
  onClick,
}: ITodoItemTitle): JSX.Element => {
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
    <TextField
      disabled={disabled}
      onClick={handleClick}
      onFocus={handleFocus}
      onChange={handleChange}
      value={value}
    />
  );
};
export default TodoItemTitle;
