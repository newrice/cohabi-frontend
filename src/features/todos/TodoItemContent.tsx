import React from "react";
import { useTranslation } from "react-i18next";
import { TextField } from "@material-ui/core";

interface ITodoItemContent {
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
}

const formFieldCommonClass = "input-field-base";

const TodoItemContent = ({
  disabled,
  value,
  onChange,
}: ITodoItemContent): JSX.Element => {
  const { t } = useTranslation();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <TextField
      label={t("LABEL_COMMENT")}
      className={formFieldCommonClass}
      value={value}
      variant="outlined"
      disabled={disabled}
      onChange={handleChange}
      rows={3}
      rowsMax={10}
      multiline
    />
  );
};
export default TodoItemContent;
