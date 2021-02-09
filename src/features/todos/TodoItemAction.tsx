import React from "react";
import { useTranslation } from "react-i18next";
import { Button, IconButton } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

interface ITodoItemAction {
  submitButtonDisabled?: boolean;
  onCancelClick: () => void;
  onSubmitClick: () => void;
  onExpandLessClick: () => void;
}

const TodoItemAction = ({
  submitButtonDisabled,
  onCancelClick,
  onExpandLessClick,
  onSubmitClick,
}: ITodoItemAction): JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <Button size="small" onClick={onCancelClick}>
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

TodoItemAction.defaultProps = {
  submitButtonDisabled: false,
};

export default TodoItemAction;
