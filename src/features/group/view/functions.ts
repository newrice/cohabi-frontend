import _ from "lodash";
import { createGroup, updateGroup } from "../../../api";
import Store from "../../../app/store";
import { IApiResponseBase, IGroup, IGroupHandler } from "../../../types";
import { arrayRemove, isApiError } from "../../../utils";
import { fetchCurrentUser, setCurrentUserGroup } from "../../user/userSlice";
import {
  fetchCurrentGroupUsers,
  initialState,
  setCurrentGroup,
  setGroup,
} from "../groupSlice";

export const changeGroupName = (id: string, name: string): IGroup[] => {
  const { groups } = Store.getState().user.currentUser;
  const newGroups = _.cloneDeep(groups);
  return newGroups.map(item => (item.id === id ? { id, name } : item));
};

export const getExited = (groupId: string): IGroup[] => {
  const { groups } = Store.getState().user.currentUser;
  const newGroups = _.cloneDeep(groups);
  arrayRemove(newGroups, "id", groupId);
  return newGroups;
};

export const add = async (
  props: IGroupHandler<{ name: string }>,
): Promise<IApiResponseBase<void>> => {
  const { data, onRequestEnd, onRequestStart } = props;
  if (onRequestStart) onRequestStart("Add");
  const res = await createGroup({ name: data.name });
  // ユーザ名が必要のためリクエストを飛ばす
  if (!isApiError(res)) Store.dispatch(fetchCurrentUser());
  if (onRequestEnd) onRequestEnd(res);
  return res;
};

export const edit = async ({
  data,
  onRequestEnd,
  onRequestStart,
}: IGroupHandler<IGroup>): Promise<IApiResponseBase<void>> => {
  const { id, name } = data;
  const isCurrent = id === Store.getState().group.currentGroup.id;
  if (onRequestStart) onRequestStart("Update");
  const res = await updateGroup({ name }, id);
  if (!isApiError(res).error) {
    Store.dispatch(setCurrentUserGroup(changeGroupName(id, name)));
    if (isCurrent) {
      // 更新したグループ名をストアに反映
      Store.dispatch(setCurrentGroup(data));
    }
  }
  if (onRequestEnd) onRequestEnd(res);
  return res;
};

export const exit = async ({
  data,
  onRequestEnd,
  onRequestStart,
}: IGroupHandler<{ id: string }>): Promise<IApiResponseBase<void>> => {
  const { id } = data;
  const { currentUser } = Store.getState().user;
  const { currentGroup } = Store.getState().group;
  if (onRequestStart) onRequestStart("Exit");
  const res = await updateGroup({ remove_user: [currentUser.id] }, id);
  if (!isApiError(res).error) {
    Store.dispatch(setCurrentUserGroup(getExited(id)));
    if (id === currentGroup.id) {
      // 削除の場合グループを初期化
      Store.dispatch(setGroup(initialState));
    }
  }
  if (onRequestEnd) onRequestEnd(res);
  return res;
};

interface IInvite {
  groupid: string;
  userid: string;
}
export const invite = async ({
  data,
  onRequestEnd,
  onRequestStart,
}: IGroupHandler<IInvite>): Promise<IApiResponseBase<void>> => {
  const { groupid, userid } = data;
  const { currentGroup } = Store.getState().group;
  if (onRequestStart) onRequestStart("Invite");
  const res = await updateGroup({ add_user: [userid] }, groupid);
  if (!isApiError(res).error) {
    if (groupid === currentGroup.id) {
      // ユーザ名を取得するために必要
      Store.dispatch(fetchCurrentGroupUsers(groupid));
    }
  }
  if (onRequestEnd) onRequestEnd(res);
  return res;
};
