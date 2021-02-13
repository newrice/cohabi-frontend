import React, { useCallback } from "react";
import { isEqual } from "../../../utils";
import { InsideAppDialog } from "../../../component/parts";
import EditCostForm, { IEditCostForm } from "../components/EditCostForm";

const paperClass = "underlay-paper-base input-dialog-base";

interface IEditCostDialog {
  open: boolean;
  onClose: () => void;
}

const EditCostDialog = React.memo(
  (props: IEditCostForm & IEditCostDialog): JSX.Element => {
    const { open, onClose, ...rest } = props;
    console.log("*** EditCostDialog");
    const handleClose = useCallback(() => {
      onClose();
    }, [onClose]);

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
          <EditCostForm {...rest} />
        </InsideAppDialog>
      </>
    );
  },
  isEqual,
);

export default EditCostDialog;
