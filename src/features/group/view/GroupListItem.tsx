import React from "react";
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

interface IGroupList {
  group: IGroup;
  selected?: boolean;
  onSelect: (group: IGroup) => void;
  onEditClick: (group: IGroup) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  starIcon: {
    color: theme.palette.secondary.main,
  },
}));

const GroupListItem = ({
  group,
  selected,
  onSelect,
  onEditClick,
}: IGroupList): JSX.Element => {
  const classes = useStyles();
  const handleEditClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    g: IGroup,
  ) => {
    event.stopPropagation();
    onEditClick(g);
  };
  return (
    <>
      <ListItem button onClick={() => onSelect(group)}>
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
        <IconButton onClick={event => handleEditClick(event, group)}>
          <EditIcon />
        </IconButton>
      </ListItem>
    </>
  );
};

GroupListItem.defaultProps = {
  selected: false,
};

export default GroupListItem;
