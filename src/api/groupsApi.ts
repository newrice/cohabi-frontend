/* eslint-disable camelcase */
import _ from "lodash";
import { postData, BASE_BACKEND, putData, deleteData } from "./api-base";
import settings from "../settings";
import { IApiResponseBase, IResponseGroup, IGroupBase } from "../types";
import { fetchDataBase, fetchGroupedDataBase } from "./basicApi";

const groupsPath = BASE_BACKEND + settings.url.groups;

interface IUpdateGroup {
  name?: string;
  add_user?: string[];
  remove_user?: string[];
}

export const fetchGroups = (): Promise<IApiResponseBase<IResponseGroup[]>> =>
  fetchDataBase<IResponseGroup[]>(groupsPath, undefined, true);

export const fetchGroup = (
  groupId: string,
): Promise<IApiResponseBase<IResponseGroup>> =>
  fetchGroupedDataBase<IResponseGroup>(groupId, groupsPath);

export const createGroup = (
  item: IGroupBase,
): Promise<IApiResponseBase<undefined>> =>
  postData({
    url: groupsPath,
    body: item,
    withAuth: true,
  }).then((data: IApiResponseBase<undefined>) => data);

/**
 * add_user及びremove_user配列内の空文字ははじいて送信します
 * @param item
 * @param groupId
 */
export const updateGroup = (
  item: IUpdateGroup,
  groupId: string,
): Promise<IApiResponseBase<undefined>> => {
  const body = _.cloneDeep(item);
  if (body.add_user) body.add_user = body.add_user.filter(u => u);
  return putData({
    url: groupsPath,
    params: { g: groupId },
    body,
    withAuth: true,
  }).then((data: IApiResponseBase<undefined>) => data);
};

export const deleteGroup = (
  id: string,
  groupId: string,
): Promise<IApiResponseBase<undefined>> =>
  deleteData({
    url: groupsPath,
    params: { id, g: groupId },
    withAuth: true,
  }).then((data: IApiResponseBase<undefined>) => data);
