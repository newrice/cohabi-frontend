import React from "react";
import SwipeableViews from "react-swipeable-views";
import { cloneDeep } from "lodash";
import TodoItem from "./TodoItem";
import { SwipeDelete, SwipeDone, SwipeUndone } from "../../component/parts";
import { ITodo } from "../../types";

interface ISwipeableTodoItem {
  item: ITodo;
  onSubmit: (item: ITodo) => void;
  onDelete: (id: string) => void;
}

const createSwipeableChildren = (
  todo: ITodo,
  onSubmit: (item: ITodo) => void,
): JSX.Element[] => {
  const children: JSX.Element[] = [];
  if (todo.done) {
    children.push(<SwipeUndone key={`swipeundone-${todo.id}`} id={todo.id} />);
  }
  children.push(
    <TodoItem key={`swipeitem-${todo.id}`} item={todo} onSubmit={onSubmit} />,
  );
  children.push(
    !todo.done ? (
      <SwipeDone key={`swipedone-${todo.id}`} id={todo.id} />
    ) : (
      <SwipeDelete key={`swipedelete-${todo.id}`} id={todo.id} />
    ),
  );
  return children;
};

const SwipeableTodoItem = ({
  item,
  onDelete,
  onSubmit,
}: ISwipeableTodoItem): JSX.Element => {
  // console.log("SwipeableTodoItem");
  const handleDelete = async () => {
    onDelete(item.id);
  };
  const handleDone = () => {
    const newItem = cloneDeep(item);
    if (newItem) {
      newItem.done = true;
      onSubmit(newItem);
    }
  };
  const handleUndone = () => {
    const newItem = cloneDeep(item);
    if (newItem) {
      newItem.done = false;
      onSubmit(newItem);
    }
  };
  const handleChangePanelIndex = (index: number) => {
    if (item.done) {
      if (index === 0) {
        handleUndone();
      } else if (index === 2) {
        handleDelete();
      }
    } else if (index === 1) {
      handleDone();
    }
  };
  return (
    <SwipeableViews
      enableMouseEvents
      key={`todo-swipable-${item.id}`}
      index={item.done ? 1 : 0}
      onChangeIndex={handleChangePanelIndex}
    >
      {createSwipeableChildren(item, onSubmit)}
    </SwipeableViews>
  );
};

export default SwipeableTodoItem;
