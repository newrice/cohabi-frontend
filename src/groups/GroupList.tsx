import React, { useEffect, useState } from "react";
import { TextField, Button, Radio } from "@material-ui/core";
import { IGroup } from "../types";

interface IGroupList {
  groups: IGroup[];
  currentGroup: IGroup;
  onChangeCurrentGroup: (group: IGroup) => void;
  onChangeSubmit: (id: string, name: string) => void;
  onInviteClick: (groupId: string, usreId: string) => void;
  onExitClick: (groupId: string) => void;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
  groups,
  currentGroup,
  onChangeCurrentGroup,
  onChangeSubmit,
  onInviteClick,
  onExitClick,
}: IGroupList) => {
  const [edittingId, setEdittingId] = useState<string>("");

  const handleEdittingClick = (groupId: string) => {
    setEdittingId(groupId);
  };
  const handleSubmit = (id: string, groupName: string) => {
    if (id === edittingId) {
      onChangeSubmit(edittingId, groupName);
      setEdittingId("");
    }
  };
  return (
    <div>
      {groups &&
        groups.map((group) => {
          return (
            <GroupItem
              group={group}
              selected={group.id === currentGroup.id}
              editting={group.id === edittingId}
              onChangeCurrentGroup={onChangeCurrentGroup}
              onEdittingClick={handleEdittingClick}
              onSubmit={handleSubmit}
              onInviteClick={onInviteClick}
              onExitClick={onExitClick}
            />
          );
        })}
    </div>
  );
};
const GroupItem = ({
  group,
  selected,
  editting,
  onChangeCurrentGroup,
  onEdittingClick,
  onSubmit,
  onInviteClick,
  onExitClick,
}: {
  group: IGroup;
  selected: boolean;
  editting: boolean;
  onChangeCurrentGroup: (group: IGroup) => void;
  onEdittingClick: (id: string) => void;
  onSubmit: (id: string, name: string) => void;
  onInviteClick: (groupId: string, usreId: string) => void;
  onExitClick: (groupId: string) => void;
}) => {
  const [groupName, setGroupName] = useState<string>(group.name);
  const [inviteUserId, setInviteUserId] = useState<string>("");
  useEffect(() => {
    setInviteUserId("");
  }, [editting]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };
  const handleChangeInviteUserId = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInviteUserId(event.target.value);
  };
  console.log("group list render");
  return (
    <>
      <div>
        <TextField
          label='group name'
          value={groupName}
          onChange={handleChange}
          InputProps={{
            readOnly: !editting,
          }}
        />
        <Button onClick={() => onEdittingClick(group.id)}>Edit</Button>
        <Button
          onClick={() => onSubmit(group.id, group.name)}
          disabled={!editting}
        >
          Submit
        </Button>
        <Button onClick={() => onExitClick(group.id)}>Exit</Button>
        <Radio
          checked={selected}
          onChange={() => onChangeCurrentGroup(group)}
        />
      </div>
      {editting && (
        <div>
          <TextField
            label='invite user-id'
            value={inviteUserId}
            onChange={handleChangeInviteUserId}
          />
          <Button onClick={() => onInviteClick(group.id, inviteUserId)}>
            Invite
          </Button>
        </div>
      )}
    </>
  );
};
