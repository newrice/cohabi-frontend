import React, { useCallback } from "react";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import StarIcon from "@material-ui/icons/Star";
import { IGroup } from "../../../types";
import { isEqual } from "../../../utils";

interface IGroupList {
  group: IGroup;
  selected: boolean;
  onSelect: (group: IGroup) => void;
  onEditClick: (group: IGroup) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  starIcon: {
    color: theme.palette.secondary.main,
  },
}));

const GroupListItem = React.memo(
  ({ group, selected, onSelect, onEditClick }: IGroupList): JSX.Element => {
    const classes = useStyles();
    const handleEditClick = useCallback(
      (g: IGroup) => (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      ) => {
        event.stopPropagation();
        onEditClick(g);
      },
      [onEditClick],
    );
    const handleSelectClick = useCallback((g: IGroup) => () => onSelect(g), [
      onSelect,
    ]);
    return (
      <>
        <ListItem button onClick={handleSelectClick(group)}>
          {selected ? (
            <>
              <ListItemIcon className={classes.starIcon}>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary={group.name} />
            </>
          ) : (
            <ListItemText inset primary={group.name} />
          )}
          <IconButton onClick={handleEditClick(group)}>
            <EditIcon />
          </IconButton>
        </ListItem>
      </>
    );
  },
  isEqual,
);

export default GroupListItem;
