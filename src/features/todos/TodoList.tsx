import React from "react";
import SwipeableTodoItem from "./SwipeableTodoItem";
import { ITodo } from "../../types";

interface ITodoList {
  todos: ITodo[];
  showDisabled: boolean;
  onSubmit: (item: ITodo) => void;
  onDelete: (id: string) => void;
}
const TodoList = ({
  todos,
  showDisabled,
  onSubmit,
  onDelete,
}: ITodoList): JSX.Element => (
  <>
    {todos.map(todo =>
      !todo.done || showDisabled ? (
        <SwipeableTodoItem
          key={`swipeable-todo-item-${todo.id}`}
          item={todo}
          onDelete={onDelete}
          onSubmit={onSubmit}
        />
      ) : null,
    )}
  </>
);

export default TodoList;
