import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import NewCalendarDialogContent from "./NewCalendarDialogContent";
import { InsideAppDialog, SimpleFab } from "../../component/parts";
import { ICalendarBase } from "../../types";

interface INewCalendarDialog {
  onPostClick: (item: ICalendarBase) => void;
}

const dialogClass = "input-dialog-base";

const NewCalendarDialog = ({
  onPostClick,
}: INewCalendarDialog): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };
  const handlePostClick = (item: ICalendarBase) => {
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
        <NewCalendarDialogContent onPostClick={handlePostClick} />
      </InsideAppDialog>
      <SimpleFab icon={<AddIcon />} handleClick={handleDialogOpen} />
    </>
  );
};

export default NewCalendarDialog;
