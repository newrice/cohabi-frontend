/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { IconButton, SvgIcon } from "@material-ui/core";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import clone from "lodash/cloneDeep";
import {
  endAddornmentClass,
  INormalCategoryItem,
  N999CategoryItem,
  NormalCategoryItem,
} from "./CategoryItem";
import { isN999 } from "../../utils";
import { ICategory } from "../../types";
import settings from "../../settings";
import { arrayMoveClone } from "../../utils/arrayUtil";

const getBaseCategory = (): ICategory => ({
  id: settings.constants.newId + performance.now(),
  name: "",
  disabled: false,
});

interface ICategoryLista {
  items: ICategory[];
  onEditCategories: (categories: ICategory[]) => void;
}

interface ICategoryList {
  categories: ICategory[];
  onEditCategories: (categories: ICategory[]) => void;
}

const DragHandle = SortableHandle(
  ({
    iconElem,
    disabled,
  }: {
    iconElem: React.ReactElement;
    disabled?: boolean;
  }) => (
    <IconButton disabled={disabled} className={endAddornmentClass}>
      {iconElem}
    </IconButton>
  ),
);

const SortableNormal = SortableElement((props: INormalCategoryItem) => (
  <div>
    <DragHandle iconElem={<DragHandleIcon />} />
    <NormalCategoryItem {...props} />
  </div>
));

const CategoryList = ({
  items,
  onEditCategories,
}: ICategoryLista): JSX.Element => {
  const handleNameChange = (index: number) => (value: string | undefined) => {
    const newArray = clone(items);
    newArray[index].name = value || "";
    onEditCategories(newArray);
  };
  const handleAdd = () => {
    const newArray = clone(items);
    newArray.splice(newArray.length - 1, 0, getBaseCategory());
    onEditCategories(newArray);
  };
  const handleDisableClick = (index: number, disabled: boolean) => () => {
    const newArray = clone(items);
    newArray[index].disabled = disabled;
    onEditCategories(newArray);
  };
  const handleRemoveClick = (index: number) => () => {
    const newArray = clone(items.filter((item, i) => i !== index));
    onEditCategories(newArray);
  };

  return (
    // divがないとsortableできない
    <div>
      {items.map((category, index) =>
        isN999(category) ? (
          <div>
            <DragHandle iconElem={<SvgIcon />} disabled />
            <N999CategoryItem
              key={`category-item-${category.id}`}
              item={category}
              onAddClick={handleAdd}
            />
          </div>
        ) : (
          <SortableNormal
            key={`category-item-${category.id}`}
            item={category}
            index={index}
            onChangeName={handleNameChange(index)}
            onDisableClick={handleDisableClick(index, !category.disabled)}
            onRemoveClick={handleRemoveClick(index)}
          />
        ),
      )}
    </div>
  );
};

const SortableList = SortableContainer(CategoryList);

// TODO: 順番入れ替えロジック
const SortableCategoryList = ({
  categories,
  onEditCategories,
}: ICategoryList): JSX.Element => (
  <SortableList
    items={categories}
    lockAxis="y"
    useDragHandle
    onEditCategories={onEditCategories}
    onSortEnd={({ oldIndex, newIndex }) => {
      const newArray = arrayMoveClone(categories, oldIndex, newIndex);
      onEditCategories(newArray);
    }}
  />
);

export default SortableCategoryList;
