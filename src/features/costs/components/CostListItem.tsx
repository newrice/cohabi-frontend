import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { thousandCommas, ph, isEqual } from "../../../utils";

interface IListedItem {
  id: string;
  date: string;
  categoryid: string;
  categoryName: string;
  value: number;
  userid: string;
  userName: string;
  userAvatarSrc: string;
}
interface IListedDetailItem {
  item: IListedItem;
  editable: boolean | ((userid: string) => boolean);
  onEditClick: () => void;
}

export const CostListItem = React.memo(
  ({ item, editable, onEditClick }: IListedDetailItem): JSX.Element => {
    const { t } = useTranslation();
    const isEditable = useMemo((): boolean => {
      if (typeof editable === "boolean") {
        return editable;
      }
      return editable(item.userid);
    }, [editable, item.userid]);
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar src={item.userAvatarSrc}>{item.userName[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${ph(t("PH_YEN"), [thousandCommas(item.value)])}`}
          secondary={<>{`${item.date}:${item.categoryName}`}</>}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" disabled={!isEditable} onClick={onEditClick}>
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  },
  isEqual,
);
export default CostListItem;
