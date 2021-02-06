import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentGroup, setCurrentGroup } from "./groupSlice";
import { IGroup } from "../../types";
import { isApiError } from "../../utils";
import { createGroup, updateGroup } from "../../api";
import { fetchCurrentUser, selectCurrentUser } from "../user/userSlice";
import ListDrawer from "./view/ListDrawer";
import AddDrawer from "./view/AddDrawer";
import EditDrawer from "./view/EditDrawer";

interface IGroupsDialog {
  active: boolean;
  onDeactive: () => void;
}

type GroupDrawer = "List" | "Add" | "Edit";

const Controller = ({ active, onDeactive }: IGroupsDialog): JSX.Element => {
  const dispatch = useDispatch();
  const currentGroup = useSelector(selectCurrentGroup);
  const currentUser = useSelector(selectCurrentUser);
  const [groupList, setGroupList] = useState<IGroup[]>([]);
  const [activeDrawer, setActiveDrawer] = useState<GroupDrawer>("List");
  // new group
  const [newGroupName, setNewGroupName] = useState<string>("");
  // edit group
  const [editGroupId, setEditGroupId] = useState<string>("");
  const [editGroupName, setEditGroupName] = useState<string>(currentGroup.name);
  const [inviteUserId, setInviteUserName] = useState<string>("");

  useEffect(() => {
    if (currentUser && activeDrawer === "List") {
      setGroupList(currentUser.groups || []);
    }
  }, [active, currentUser, activeDrawer]);

  const clearAll = () => {
    setNewGroupName("");
    setEditGroupId("");
    setEditGroupName("");
    setInviteUserName("");
  };

  const handleBackToList = () => {
    setActiveDrawer("List");
  };

  const handleClose = () => {
    handleBackToList();
    onDeactive();
  };

  const handleCurrentGroupChange = (group: IGroup) => {
    if (group) {
      dispatch(setCurrentGroup(group));
      handleClose();
    }
  };

  const handleNewGroupNameChange = (name: string) => {
    setNewGroupName(name);
  };

  const handleEditGroupNameChange = (name: string) => {
    setEditGroupName(name);
  };

  const handleInviteUserNameChange = (name: string) => {
    setInviteUserName(name);
  };

  const handleCreateNewGroup = async () => {
    // const res =
    await createGroup({ name: newGroupName });
    clearAll();
    handleClose();
  };

  const handleUpdateGroup = async () => {
    // const res =
    await updateGroup({ name: editGroupName }, editGroupId);
    clearAll();
    handleClose();
  };

  const handleInviteUser = async () => {
    // const res =
    await updateGroup({ add_user: [inviteUserId] }, editGroupId);
    clearAll();
    handleClose();
  };

  const handleExitGroup = async () => {
    const res = await updateGroup(
      { remove_user: [currentUser.id] },
      editGroupId,
    );
    const { error } = isApiError(res);
    if (!error) {
      dispatch(fetchCurrentUser());
      clearAll();
      handleClose();
    }
  };

  const handleEditClick = (group: IGroup) => {
    // console.log('handleEditClick called')
    if (group) {
      setEditGroupId(group.id);
      setEditGroupName(group.name);
      setActiveDrawer("Edit");
    }
  };

  const handleAddClick = () => {
    setEditGroupId("");
    setActiveDrawer("Add");
  };

  return (
    <>
      <ListDrawer
        open={active && activeDrawer === "List"}
        groups={groupList}
        onAddClick={handleAddClick}
        onEditClick={handleEditClick}
        onClose={handleClose}
        onSelect={handleCurrentGroupChange}
      />
      <AddDrawer
        open={activeDrawer === "Add"}
        name={newGroupName}
        onNameChange={handleNewGroupNameChange}
        onSaveClick={handleCreateNewGroup}
        onClose={handleClose}
      />
      <EditDrawer
        open={active && activeDrawer === "Edit"}
        name={editGroupName}
        inviteUserName={inviteUserId}
        onNameChange={handleEditGroupNameChange}
        onInviteUserNameChange={handleInviteUserNameChange}
        onSaveClick={handleUpdateGroup}
        onInviteClick={handleInviteUser}
        onExitGroupClick={handleExitGroup}
        onClose={handleClose}
      />
    </>
  );
};

export default Controller;
