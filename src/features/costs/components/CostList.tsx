import React, { useCallback } from "react";
import ListItem from "./CostListItem";
import {
  getAvatar,
  getCategoryName,
  getUserName,
  isEqual,
} from "../../../utils";
import { ICategory, ICostResponse, IUser } from "../../../types";

interface ICostList {
  list: ICostResponse[];
  categories: ICategory[];
  users: IUser[];
  editable: boolean | ((userid: string) => boolean);
  onSelect: (id: string) => void;
}

export const CostList = React.memo(
  ({ list, editable, categories, users, onSelect }: ICostList): JSX.Element => {
    const handleSelect = useCallback(
      (id: string) => () => {
        onSelect(id);
      },
      [onSelect],
    );
    return (
      <>
        {list.map(item => {
          const { id, date, category, value, user } = item;
          return (
            <ListItem
              key={`datelist-item-${id}`}
              item={{
                id,
                date,
                categoryid: category,
                categoryName: getCategoryName(categories, category),
                value: Number(value),
                userid: user,
                userName: getUserName(users, user),
                userAvatarSrc: getAvatar(users, user),
              }}
              editable={editable}
              onEditClick={handleSelect(id)}
            />
          );
        })}
      </>
    );
  },
  isEqual,
);

export default CostList;
