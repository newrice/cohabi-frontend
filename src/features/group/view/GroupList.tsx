import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, List } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import GroupListItem from "./GroupListItem";
import { selectCurrentGroup, setCurrentGroup } from "../groupSlice";
import { selectCurrentUser } from "../../user/userSlice";
import { IGroup } from "../../../types";
import { isEqual } from "../../../utils";

interface IGroupList {
  onAddClick: () => void;
  onEditClick: (group: IGroup) => void;
}

export const GroupList = React.memo(
  ({ onAddClick, onEditClick }: IGroupList): JSX.Element => {
    const dispatch = useDispatch();
    const { groups } = useSelector(selectCurrentUser);
    const currentGroup = useSelector(selectCurrentGroup);
    const handleSelect = useCallback((group: IGroup) => {
      dispatch(setCurrentGroup(group));
    }, []);
    return (
      <>
        <List component="nav" aria-label="contacts">
          {groups.map(group => (
            <GroupListItem
              key={`group-list-${group.id}`}
              group={group}
              selected={group.id === currentGroup.id}
              onSelect={handleSelect}
              onEditClick={onEditClick}
            />
          ))}
        </List>
        <Button onClick={onAddClick}>
          <AddIcon />
        </Button>
      </>
    );
  },
  isEqual,
);

export default GroupList;
