import React from "react";
import { useTranslation } from "react-i18next";
import { StandardTextFieldProps, TextField } from "@material-ui/core";

interface IGroupNameField extends StandardTextFieldProps {
  name: string;
  onNameChange: (name: string) => void;
}

// eslint-disable-next-line import/prefer-default-export
export const GroupNameField = ({
  name,
  onNameChange,
  ...rest
}: IGroupNameField): JSX.Element => {
  const { t } = useTranslation();
  return (
    <TextField
      label={t("LABEL_GROUP_NAME")}
      value={name}
      onChange={event => onNameChange(event.target.value)}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{ "data-testid": "input-group-name" }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
};
