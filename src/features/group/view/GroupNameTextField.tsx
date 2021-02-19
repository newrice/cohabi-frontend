import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { StandardTextFieldProps } from "@material-ui/core";
import { MemoizedTextField } from "../../../component/parts";

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
  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onNameChange(event.target.value);
    },
    [],
  );
  return (
    <MemoizedTextField
      label={t("LABEL_GROUP_NAME")}
      value={name}
      onChange={handleNameChange}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{ "data-testid": "input-group-name" }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
};
