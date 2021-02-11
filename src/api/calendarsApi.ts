import { postData, BASE_BACKEND, putData, deleteData } from "./api-base";
import settings from "../settings";
import {
  IApiResponseBase,
  ICalendarBase,
  ICalendar,
  ICalendarResponse,
} from "../types";
import { fetchGroupedDataBase } from "./basicApi";

const carendarsPath = BASE_BACKEND + settings.url.calendars;

export const fetchCalendars = (
  groupId: string,
): Promise<IApiResponseBase<ICalendarResponse[]>> =>
  fetchGroupedDataBase<ICalendarResponse[]>(groupId, carendarsPath);

export const createCalendar = (
  item: ICalendarBase,
  groupId: string,
): Promise<IApiResponseBase<undefined>> =>
  postData({
    url: carendarsPath,
    params: { g: groupId },
    body: item,
    withAuth: true,
  }).then((data: IApiResponseBase<undefined>) => data);

export const updateCalendar = (
  item: ICalendar,
  groupId: string,
): Promise<IApiResponseBase<undefined>> =>
  putData({
    url: carendarsPath,
    params: { id: item.id, g: groupId },
    body: item,
    withAuth: true,
  }).then((data: IApiResponseBase<undefined>) => data);

export const deleteCalendar = (
  id: string,
  groupId: string,
): Promise<IApiResponseBase<undefined>> =>
  deleteData({
    url: carendarsPath,
    params: { id, g: groupId },
    withAuth: true,
  }).then((data: IApiResponseBase<undefined>) => data);
