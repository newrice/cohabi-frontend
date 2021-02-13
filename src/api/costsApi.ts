import {
  getData,
  BASE_BACKEND,
  postData,
  putData,
  deleteData,
} from "./api-base";
import { dateToString } from "../utils";
import settings from "../settings";
import { IApiResponseBase, ICostBase, ICostResponse } from "../types";

interface IPostCostBody {
  date: string;
  value: number;
  category: string;
  comment: string;
}

const costsPath = BASE_BACKEND + settings.url.costs;

/**
 * Request Path Creator
 * @param date
 */
const createGetRequestPath = (date: Date): string => {
  const { year, month } = dateToString(date);
  const path = `${year}/${month}`;
  return path;
};

/**
 * Request Param Creator
 */
const createRequestBody = ({
  date,
  value,
  category,
  comment,
}: ICostBase): IPostCostBody => {
  const body = {
    date,
    value: Number(value),
    category,
    comment,
  };
  return body;
};

export const fetchMonthlyList = (
  groupId: string,
  date: Date,
): Promise<IApiResponseBase<ICostResponse[]>> =>
  getData({
    url: `${costsPath}/${createGetRequestPath(date)}`,
    params: { g: groupId },
    withAuth: true,
  }).then((data: IApiResponseBase<ICostResponse[]>) => data);

export const createCost = (
  groupId: string,
  item: ICostBase,
): Promise<IApiResponseBase<undefined>> =>
  postData({
    url: costsPath,
    params: { g: groupId },
    body: createRequestBody(item),
    withAuth: true,
  }).then((data: IApiResponseBase<undefined>) => data);

export const updateCost = (
  id: string,
  groupId: string,
  item: ICostBase,
): Promise<IApiResponseBase<undefined>> =>
  putData({
    url: costsPath,
    params: { g: groupId, id },
    body: createRequestBody(item),
    withAuth: true,
  }).then((data: IApiResponseBase<undefined>) => data);

export const deleteCost = (
  id: string,
  groupId: string,
): Promise<IApiResponseBase<undefined>> =>
  deleteData({
    url: costsPath,
    params: { g: groupId, id },
    withAuth: true,
  }).then((data: IApiResponseBase<undefined>) => data);
