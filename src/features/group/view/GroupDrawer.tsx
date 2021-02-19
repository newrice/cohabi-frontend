import React, { ReactNode, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { InsideAppDrawer } from "../../../component/parts";
import { IGroup, IRequestHandler } from "../../../types";
import GroupList from "./GroupList";
import GroupEdit from "./GroupEdit";
import GroupExit from "./GroupExit";
import GroupInvite from "./GroupInvite";
import { selectIsGroupDialogOpen, setIsGroupDialogOpen } from "../groupSlice";
import GroupAdd from "./GroupAdd";

const drawerClass = clsx("border-top-radius");
const formClass = clsx("column-container");
const rowClass = clsx(
  "row-container",
  "jc-center-container",
  "ai-flex-end-container",
);

type GroupDrawer = "Add" | "Edit" | "Exit" | "Invite" | "List";

interface IDrawer {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}
const Drawer = ({ open, onClose, children }: IDrawer) => (
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
      <div className={rowClass}>{children}</div>
    </div>
  </InsideAppDrawer>
);

export const GroupDrawer = (props: IRequestHandler): JSX.Element => {
  const [current, setCurrent] = useState<GroupDrawer>("List");
  const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsGroupDialogOpen);
  const handler = useCallback((group: IGroup, drawer: GroupDrawer) => {
    setSelectedGroup(group);
    setCurrent(drawer);
  }, []);
  const handleAddClick = useCallback(() => {
    setCurrent("Add");
  }, []);
  const handleEditClick = useCallback(
    (group: IGroup) => handler(group, "Edit"),
    [],
  );
  const handleExitClick = useCallback(
    (group: IGroup) => handler(group, "Exit"),
    [],
  );
  const handleInviteClick = useCallback(
    (group: IGroup) => handler(group, "Invite"),
    [],
  );
  const handleClose = useCallback(() => {
    dispatch(setIsGroupDialogOpen(false));
    setCurrent("List");
    setSelectedGroup(null);
  }, []);
  let Content: JSX.Element | null = null;
  switch (current) {
    case "List":
      Content = (
        <GroupList onAddClick={handleAddClick} onEditClick={handleEditClick} />
      );
      break;
    case "Add":
      // eslint-disable-next-line react/jsx-props-no-spreading
      Content = <GroupAdd {...props} />;
      break;
    case "Edit":
      Content = selectedGroup && (
        <GroupEdit
          group={selectedGroup}
          onExitClick={handleExitClick}
          onInviteClick={handleInviteClick}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      );
      break;
    case "Exit":
      // eslint-disable-next-line react/jsx-props-no-spreading
      Content = selectedGroup && <GroupExit group={selectedGroup} {...props} />;
      break;
    case "Invite":
      Content = selectedGroup && (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <GroupInvite group={selectedGroup} {...props} />
      );
      break;
    default:
      break;
  }
  return (
    <Drawer open={isOpen} onClose={handleClose}>
      {Content}
    </Drawer>
  );
};

export default GroupDrawer;
