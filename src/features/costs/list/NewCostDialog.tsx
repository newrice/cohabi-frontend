import React, { useCallback, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { isEqual } from "../../../utils";
import NewCostForm, { INewCostForm } from "../components/NewCostForm";
import { InsideAppDialog, SimpleFab } from "../../../component/parts";

const paperClass = "underlay-paper-base";

const NewCostDialog = React.memo((props: INewCostForm): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  console.log("*** NewCostDialog");
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <InsideAppDialog
        open={open}
        container={() => document.getElementById("_App_")}
        onClose={handleClose}
        keepMounted
        PaperProps={{
          className: paperClass,
        }}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <NewCostForm {...props} />
      </InsideAppDialog>
      <SimpleFab icon={<AddIcon />} handleClick={handleOpen} />
    </>
  );
}, isEqual);

export default NewCostDialog;
