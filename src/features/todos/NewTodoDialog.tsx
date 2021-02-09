import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import NewTodoDialogContent from "./NewTodoDialogContent";
import { InsideAppDialog, SimpleFab } from "../../component/parts";
import { ITodo } from "../../types";

interface INewTodoDialog {
  onPostClick: (item: ITodo) => void;
}

const dialogClass = "input-dialog-base";

const NewTodoDialog = ({ onPostClick }: INewTodoDialog): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };
  const handlePostClick = (item: ITodo) => {
    onPostClick(item);
    handleDialogClose();
  };

  return (
    <>
      <InsideAppDialog
        open={open}
        onClose={handleDialogClose}
        PaperProps={{
          className: clsx(dialogClass),
        }}
      >
        <NewTodoDialogContent onPostClick={handlePostClick} />
      </InsideAppDialog>
      <SimpleFab icon={<AddIcon />} handleClick={handleDialogOpen} />
    </>
  );
};

export default NewTodoDialog;
