import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isArray, isEmpty } from "lodash";
import TodoForm from "./TodoForm";
import { setProgress, setSnackState } from "../feedback/feedbackSlice";
import { selectCurrentGroup } from "../group/groupSlice";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "../../api";
import { IApiResponseBase, ITodoBase, ITodo } from "../../types";
import { createSnackState, isApiError } from "../../utils";

const TodosController = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentGroup = useSelector(selectCurrentGroup);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setProgress(true));
    const getDatas = async () => {
      const data = await fetchTodos(currentGroup.id);
      const { error, message } = isApiError(data, true);
      if (error) {
        dispatch(setSnackState(createSnackState(error, message)));
      } else {
        setTodos(
          data.body && !isEmpty(data.body) && isArray(data.body) // FIXME: API修正次第削除
            ? data.body
            : [],
        );
      }
      // setTodos(MockData);
      dispatch(setProgress(false));
    };
    getDatas();
  }, [dispatch, refresh, currentGroup]);

  const responseHandler = (
    res: IApiResponseBase<undefined>,
    withBody?: boolean,
  ) => {
    const { error, message } = isApiError(res, withBody);
    dispatch(setSnackState(createSnackState(error, message)));
    setRefresh(!refresh);
  };

  const handlePost = async (item: ITodoBase) => {
    dispatch(setProgress(true));
    const res = await createTodo(item, currentGroup.id);
    dispatch(setProgress(false));
    responseHandler(res);
  };

  const handlePut = async (item: ITodo) => {
    dispatch(setProgress(true));
    const res = await updateTodo(item, currentGroup.id);
    dispatch(setProgress(false));
    responseHandler(res);
  };

  const handleDelete = async (id: string) => {
    dispatch(setProgress(true));
    const res = await deleteTodo(id, currentGroup.id);
    dispatch(setProgress(false));
    responseHandler(res);
  };

  return (
    <TodoForm
      todos={todos}
      onDelete={handleDelete}
      onPost={handlePost}
      onPut={handlePut}
    />
  );
};

TodosController.defaultProps = {
  authData: null,
};

export default TodosController;
