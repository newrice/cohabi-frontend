import React, { useState, useEffect } from "react";
import {
  Paper,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
} from "@material-ui/core";
import clsx from "clsx";
import TodoItemAction from "./TodoItemAction";
import TodoItemContent from "./TodoItemContent";
import TodoItemTitle from "./TodoItemTitle";
import { ITodo } from "../../types";

const accordionDetailsClass = clsx("column-container", "ai-strech-container");

interface ITodoItem {
  item: ITodo;
  onSubmit: (item: ITodo) => void;
}
const TodoItem = ({ item, onSubmit }: ITodoItem): JSX.Element => {
  let prevItem: ITodo = { ...item };
  const [name, setName] = useState<string>(item.name);
  const [comment, setComment] = useState<string>(item.comment);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    prevItem = { ...item };
  }, []);

  const handleEditCancel = () => {
    if (name !== prevItem.name) {
      setName(prevItem.name);
    }
    if (comment !== prevItem.comment) {
      setComment(prevItem.comment);
    }
  };
  const handleExpandChange = () => setExpanded(!expanded);
  const handleExpand = () => setExpanded(true);
  const handleExpandLess = () => setExpanded(false);

  const handleNameChange = (value: string) => setName(value);
  const handleCommentChange = (value: string) => setComment(value);

  const handleSubmit = () => onSubmit({ ...item, name, comment });
  return (
    <Paper key={`todo-accordinon-wrapper-${item.id}`}>
      <Accordion
        elevation={0}
        key={`todo-accordinon-${item.id}`}
        expanded={expanded}
        onChange={handleExpandChange}
      >
        <AccordionSummary>
          <TodoItemTitle
            disabled={item.done}
            value={name}
            onClick={handleExpand}
            onChange={handleNameChange}
          />
        </AccordionSummary>
        <AccordionDetails className={accordionDetailsClass}>
          <TodoItemContent
            disabled={item.done}
            value={comment}
            onChange={handleCommentChange}
          />
        </AccordionDetails>
        <AccordionActions>
          <TodoItemAction
            submitButtonDisabled={!item.id || !item.name}
            onCancelClick={handleEditCancel}
            onExpandLessClick={handleExpandLess}
            onSubmitClick={handleSubmit}
          />
        </AccordionActions>
      </Accordion>
    </Paper>
  );
};
export default TodoItem;
