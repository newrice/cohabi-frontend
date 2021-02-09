import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, TextField } from "@material-ui/core";
import clsx from "clsx";
import { ITodo } from "../../types";

interface INewTodoDialogContent {
  onPostClick: (item: ITodo) => void;
}

const formClass = clsx("column-container");
const inputFieldClass = clsx("input-field-base");
const baseTodo: ITodo = {
  id: "",
  name: "",
  comment: "",
  done: false,
};

const NewTodoDialogContent = ({
  onPostClick,
}: INewTodoDialogContent): JSX.Element => {
  const { t } = useTranslation();
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };
  const handlePostClick = () => {
    onPostClick({ ...baseTodo, name, comment });
    setName("");
    setComment("");
  };

  return (
    <div className={formClass}>
      <TextField
        label={t("LABEL_TODO")}
        className={inputFieldClass}
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
        disabled={!name}
        color="secondary"
        variant="contained"
        onClick={handlePostClick}
      >
        {t("LABEL_SUBMIT")}
      </Button>
    </div>
  );
};

export default NewTodoDialogContent;
