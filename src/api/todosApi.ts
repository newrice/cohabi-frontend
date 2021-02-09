import { postData, BASE_BACKEND, putData, deleteData } from "./api-base";
import settings from "../settings";
import { IApiResponseBase, ITodoBase, ITodo } from "../types";
import { fetchGroupedDataBase } from "./basicApi";

const todosPath = BASE_BACKEND + settings.url.todos;

export const fetchTodos = (
  groupId: string,
): Promise<IApiResponseBase<ITodo[]>> =>
  fetchGroupedDataBase<ITodo[]>(groupId, todosPath);

export const createTodo = (
  item: ITodoBase,
  groupId: string,
): Promise<IApiResponseBase<undefined>> =>
  postData({
    url: todosPath,
    params: { g: groupId },
    body: item,
    withAuth: true,
  }).then((data: IApiResponseBase<undefined>) => data);

export const updateTodo = (
  item: ITodo,
  groupId: string,
): Promise<IApiResponseBase<undefined>> =>
  putData({
    url: todosPath,
    params: { id: item.id, g: groupId },
    body: item,
    withAuth: true,
  }).then((data: IApiResponseBase<undefined>) => data);

export const deleteTodo = (
  id: string,
  groupId: string,
): Promise<IApiResponseBase<undefined>> =>
  deleteData({
    url: todosPath,
    params: { id, g: groupId },
    withAuth: true,
  }).then((data: IApiResponseBase<undefined>) => data);
