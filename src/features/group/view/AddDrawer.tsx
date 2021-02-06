import React from "react";
import { IconButton } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import clsx from "clsx";
import { InsideAppDrawer } from "../../../component/parts";
import { GroupNameField } from "./GroupNameTextField";

interface IAddDrawer {
  open: boolean;
  name: string;
  onNameChange: (name: string) => void;
  onSaveClick: () => void;
  onClose: () => void;
}

const drawerClass = clsx("border-top-radius");
const formClass = clsx("column-container");
const rowClass = clsx(
  "row-container",
  "jc-center-container",
  "ai-flex-end-container",
);
const formFieldCommonClass = clsx("input-field-base");
const formFieldExtendStyle = { margin: "8px 0px" };

const AuthDrawer = ({
  open,
  name,
  onNameChange,
  onSaveClick,
  onClose,
}: IAddDrawer): JSX.Element => (
  <InsideAppDrawer
    anchor="bottom"
    open={open}
    onClose={onClose}
    PaperProps={{
      style: { padding: "24px 16px 36px 16px" },
      className: drawerClass,
    }}
  >
    <div className={formClass}>
      <div className={rowClass}>
        <GroupNameField
          name={name}
          onNameChange={onNameChange}
          className={formFieldCommonClass}
          style={formFieldExtendStyle}
        />
        <IconButton disabled={!name} onClick={onSaveClick}>
          <SaveIcon />
        </IconButton>
      </div>
    </div>
  </InsideAppDrawer>
);

export default AuthDrawer;
