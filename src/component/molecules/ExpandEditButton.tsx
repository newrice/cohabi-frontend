import React from "react";
import { useTranslation } from "react-i18next";
import { Button, IconButton } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

interface IExpandEditButton {
  submitButtonDisabled?: boolean;
  cancelButtonDisabled?: boolean;
  onCancelClick: () => void;
  onSubmitClick: () => void;
  onExpandLessClick: () => void;
}

export const ExpandEditButton = ({
  cancelButtonDisabled,
  submitButtonDisabled,
  onCancelClick,
  onExpandLessClick,
  onSubmitClick,
}: IExpandEditButton): JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <Button
        size="small"
        disableTouchRipple={cancelButtonDisabled}
        onClick={onCancelClick}
      >
        {t("LABEL_CANCEL")}
      </Button>
      <Button
        size="small"
        color="secondary"
        disabled={submitButtonDisabled}
        onClick={onSubmitClick}
      >
        {t("LABEL_SAVE")}
      </Button>
      <IconButton onClick={onExpandLessClick}>
        <ExpandLessIcon />
      </IconButton>
    </>
  );
};

ExpandEditButton.defaultProps = {
  cancelButtonDisabled: false,
  submitButtonDisabled: false,
};

export default ExpandEditButton;
