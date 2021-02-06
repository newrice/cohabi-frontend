import React from "react";
import clsx from "clsx";
import { InsideAppDrawer } from "../../../component/parts";
import { GroupEditForm } from "./GroupEditForm";

interface IAddDrawer {
  open: boolean;
  name: string;
  inviteUserName: string;
  onNameChange: (name: string) => void;
  onInviteUserNameChange: (name: string) => void;
  onSaveClick: () => void;
  onInviteClick: () => void;
  onExitGroupClick: () => void;
  onClose: () => void;
}

const drawerClass = clsx("border-top-radius");

const EditDrawer = ({
  open,
  name,
  inviteUserName,
  onNameChange,
  onInviteUserNameChange,
  onSaveClick,
  onInviteClick,
  onExitGroupClick,
  onClose,
}: IAddDrawer): JSX.Element => (
  <InsideAppDrawer
    anchor="bottom"
    open={open}
    onClose={onClose}
    PaperProps={{
      style: { padding: "24px 16px 12px 16px" },
      className: drawerClass,
    }}
  >
    <GroupEditForm
      name={name}
      inviteUserName={inviteUserName}
      onNameChange={onNameChange}
      onInviteUserNameChange={onInviteUserNameChange}
      onSaveClick={onSaveClick}
      onInviteClick={onInviteClick}
      onExitGroupClick={onExitGroupClick}
    />
  </InsideAppDrawer>
);

export default EditDrawer;
