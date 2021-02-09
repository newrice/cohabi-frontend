import React from "react";
import { useTranslation } from "react-i18next";
import { Button, TextField } from "@material-ui/core";
import clsx from "clsx";
import { ITodoBase } from "../../types";

interface IInputDialog {
  data: ITodoBase;
  onPostClick: () => void;
  disablePostButton: boolean;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCommentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const formClass = clsx("column-container");
const inputFieldClass = clsx("input-field-base");

const InputCostDialog = ({
  data,
  onPostClick,
  onNameChange,
  onCommentChange,
  disablePostButton,
}: IInputDialog): JSX.Element => {
  const { t } = useTranslation();
  // const [] = useState<>
  return (
    <div className={formClass}>
      <TextField
        label={t("LABEL_TODO")}
        className={inputFieldClass}
        onChange={onNameChange}
        value={data.name}
      />
      <TextField
        className={inputFieldClass}
        label={t("LABEL_COMMENT")}
        value={data.comment}
        variant="outlined"
        onChange={onCommentChange}
        rows={3}
        rowsMax={10}
        multiline
      />
      <Button
        className={inputFieldClass}
        disabled={disablePostButton}
        color="secondary"
        variant="contained"
        onClick={onPostClick}
      >
        {t("LABEL_SUBMIT")}
      </Button>
    </div>
  );
};

export default InputCostDialog;
