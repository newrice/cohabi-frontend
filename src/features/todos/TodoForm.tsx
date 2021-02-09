import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import clsx from "clsx";
import Header from "./Header";
import NewTodoDialog from "./NewTodoDialog";
import TodoList from "./TodoList";
import { ITodo } from "../../types";

interface ITodoForm {
  todos: ITodo[];
  onDelete: (id: string) => void;
  onPost: (item: ITodo) => void;
  onPut: (item: ITodo) => void;
}

const divClass = clsx("input-wrapper", "fab-bottom-spacer");
const paperClass = clsx("underlay-paper-base");

const TodoForm = ({
  todos,
  onDelete,
  onPost,
  onPut,
}: ITodoForm): JSX.Element => {
  const [showDisabled, setShowDisanled] = useState<boolean>(false);

  const handleShowDisaledChange = () => {
    setShowDisanled(!showDisabled);
  };

  return (
    <div className={divClass}>
      <Paper className={paperClass}>
        <Header
          showDisabled={showDisabled}
          onShowDisabledChange={handleShowDisaledChange}
        />
        <TodoList
          todos={todos}
          showDisabled={showDisabled}
          onDelete={onDelete}
          onSubmit={onPut}
        />
        <NewTodoDialog onPostClick={onPost} />
      </Paper>
    </div>
  );
};

export default TodoForm;
