/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { IconButton, SvgIcon } from "@material-ui/core";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import _ from "lodash";
import {
  endAddornmentClass,
  IN999CategoryItem,
  INormalCategoryItem,
  N999CategoryItem,
  NormalCategoryItem,
} from "./CategoryItem";
import { isN999 } from "../../utils";
import { ICategory } from "../../types";
import settings from "../../settings";

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

const SortableN999 = SortableElement((props: IN999CategoryItem) => (
  <div>
    <DragHandle iconElem={<SvgIcon />} disabled />
    <N999CategoryItem {...props} />
  </div>
));

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
    const newArray = _.cloneDeep(items);
    newArray[index].name = value || "";
    onEditCategories(newArray);
  };
  const handleAdd = () => {
    const newArray = _.cloneDeep(items);
    newArray.splice(newArray.length - 1, 0, getBaseCategory());
    onEditCategories(newArray);
  };
  const handleDisableClick = (index: number, disabled: boolean) => () => {
    const newArray = _.cloneDeep(items);
    newArray[index].disabled = disabled;
    onEditCategories(newArray);
  };
  const handleRemoveClick = (index: number) => () => {
    const newArray = _.cloneDeep(items.filter((item, i) => i !== index));
    onEditCategories(newArray);
  };

  return (
    // divがないとsortableできない
    <div>
      {items.map((category, index) =>
        isN999(category) ? (
          <SortableN999
            disabled
            key={`category-item-${category.id}`}
            item={category}
            index={index}
            onAddClick={handleAdd}
          />
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
  />
);

export default SortableCategoryList;
