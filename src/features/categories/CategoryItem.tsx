import React, { useState } from "react";
import equal from "fast-deep-equal/es6/react";
import { IconButton, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { isN999 } from "../../utils";
import { ICategory } from "../../types";
import CategoryEditMenu from "./CategoryEditMenu";

// #region Interface
interface ICategoryItemBase {
  item: ICategory;
}
interface ICategoryItem extends ICategoryItemBase {
  onChangeName?: (value: string | undefined) => void;
}
export interface IBaseCategoryItem extends ICategoryItem {
  endAdornment?: React.ReactElement;
}
export interface INormalCategoryItem extends ICategoryItem {
  onDisableClick: () => void;
  onRemoveClick: () => void;
}
export interface IN999CategoryItem extends ICategoryItemBase {
  onAddClick: () => void;
}
// #endregion
export const endAddornmentClass = "edit-categories-add-button";

// #region BaseCategoryItem
const BaseItem = ({
  item,
  onChangeName,
  endAdornment,
}: IBaseCategoryItem): JSX.Element => {
  // console.log("render base");
  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (onChangeName && typeof onChangeName === "function")
      onChangeName(event.target.value);
  };

  return (
    <>
      <TextField
        value={item.name}
        InputProps={{
          readOnly: isN999(item),
        }}
        margin="none"
        size="small"
        disabled={item.disabled}
        onChange={handleNameChange}
      />
      {endAdornment}
    </>
  );
};
const BaseCategoryItem = React.memo(BaseItem, (prev, next) =>
  equal(prev, next),
);
// #endregion

// #region NormalCategoryItem
const NormalItem = ({
  item,
  onChangeName,
  onDisableClick,
  onRemoveClick,
}: INormalCategoryItem): JSX.Element => {
  // console.log("render normal");
  const [el, setEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setEl(null);
  };
  const handleDisableClick = () => {
    onDisableClick();
    handleMenuClose();
  };
  const handleRemoveClick = () => {
    onRemoveClick();
    handleMenuClose();
  };
  const endAdornment = (
    <IconButton
      onClick={handleMenuOpen}
      size="small"
      className={endAddornmentClass}
    >
      <MoreVertIcon />
    </IconButton>
  );
  return (
    <>
      <BaseCategoryItem
        item={item}
        onChangeName={onChangeName}
        endAdornment={endAdornment}
      />
      <CategoryEditMenu
        el={el}
        open={Boolean(el)}
        category={item}
        onClose={handleMenuClose}
        onDisableClick={handleDisableClick}
        onRemoveClick={handleRemoveClick}
      />
    </>
  );
};
export const NormalCategoryItem = React.memo(NormalItem, (prev, next) =>
  equal(prev, next),
);
// #endregion

// #region N999CategoryItem
const N999Item = ({ item, onAddClick }: IN999CategoryItem): JSX.Element => {
  // console.log("render n999");
  const endAdornment = (
    <IconButton
      onClick={onAddClick}
      size="small"
      className={endAddornmentClass}
    >
      <AddIcon />
    </IconButton>
  );
  return <BaseCategoryItem item={item} endAdornment={endAdornment} />;
};
export const N999CategoryItem = React.memo(N999Item, (prev, next) =>
  equal(prev, next),
);
// #endregion

// #region default props
const defaults = {
  onChangeName: () => null,
};
BaseItem.defaultProps = {
  ...defaults,
  endAdornment: null,
};
NormalItem.defaultProps = defaults;
// #endregion
export default BaseCategoryItem;
