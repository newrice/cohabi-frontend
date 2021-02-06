import { getData, BASE_BACKEND } from "./api-base";
import settings from "../settings";
import { IApiResponseBase, ICategory, IUser, QueryParams } from "../types";

export const fetchDataBase = <T>(
  url: string,
  params?: QueryParams,
  withAuth?: boolean,
): Promise<IApiResponseBase<T>> =>
  getData({
    url,
    params,
    withAuth,
  }).then((data: IApiResponseBase<T>) => data);

export const fetchAuthDataBase = <T>(
  groupId: string,
  url: string,
): Promise<IApiResponseBase<T>> => fetchDataBase<T>(url, { g: groupId }, true);

export const fetchGroupedDataBase = <T>(
  groupId: string,
  url: string,
): Promise<IApiResponseBase<T>> => fetchAuthDataBase<T>(groupId, url);

export const fetchCategories = (
  groupId: string,
): Promise<IApiResponseBase<ICategory[] | undefined>> =>
  fetchGroupedDataBase<ICategory[] | undefined>(
    groupId,
    `${BASE_BACKEND}${settings.url.categories}`,
  );

export const fetchUsers = (
  groupId: string,
): Promise<IApiResponseBase<IUser[] | undefined>> =>
  fetchGroupedDataBase<IUser[] | undefined>(
    groupId,
    `${BASE_BACKEND}${settings.url.users}`,
  );
