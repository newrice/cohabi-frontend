import React from "react";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import GroupList from "./GroupList";
import { IGroup } from "../../../types";
import { InsideAppDrawer } from "../../../component/parts";

interface IListDrawer {
  open: boolean;
  groups: IGroup[];
  onSelect: (group: IGroup) => void;
  onEditClick: (group: IGroup) => void;
  onAddClick: () => void;
  onClose: () => void;
}

const drawerClass = clsx("border-top-radius");

const ListDrawer = ({
  open,
  groups,
  onSelect,
  onAddClick,
  onEditClick,
  onClose,
}: IListDrawer): JSX.Element => (
  <InsideAppDrawer
    anchor="bottom"
    open={open}
    onClose={onClose}
    PaperProps={{
      className: drawerClass,
    }}
  >
    <GroupList groups={groups} onSelect={onSelect} onEditClick={onEditClick} />
    <IconButton onClick={onAddClick}>
      <AddIcon />
    </IconButton>
  </InsideAppDrawer>
);

export default ListDrawer;
