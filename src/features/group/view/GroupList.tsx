import React from "react";
import { useSelector } from "react-redux";
import { createStyles, List, makeStyles, Theme } from "@material-ui/core";
import { selectCurrentGroup } from "../groupSlice";
import { IGroup } from "../../../types";
import GroupListItem from "./GroupListItem";

interface IGroupList {
  groups: IGroup[];
  onSelect: (group: IGroup) => void;
  onEditClick: (group: IGroup) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const GroupList = ({
  groups,
  onSelect,
  onEditClick,
}: IGroupList): JSX.Element => {
  const currentGroup = useSelector(selectCurrentGroup);
  const classes = useStyles();
  // console.log("groups : ", groups);
  return (
    <List component="nav" className={classes.root} aria-label="contacts">
      {groups.map(group => (
        <GroupListItem
          key={`group-list-${group.id}`}
          group={group}
          selected={group.id === currentGroup.id}
          onSelect={onSelect}
          onEditClick={onEditClick}
        />
      ))}
    </List>
  );
};

export default GroupList;
