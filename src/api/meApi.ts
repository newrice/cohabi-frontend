import { getData, BASE_BACKEND, putData } from "./api-base";
import settings from "../settings";
import { IApiResponseBase, ICurrentUser, IUser } from "../types";

const mePath = BASE_BACKEND + settings.url.me;

export interface ISignUpUser {
  id: string;
  email: string;
  password: string;
}

export const fetchMe = (): Promise<IApiResponseBase<ICurrentUser>> =>
  getData({
    url: mePath,
    withAuth: true,
  }).then((data: IApiResponseBase<ICurrentUser>) => data);

export const updateProfile = (
  item: IUser,
): Promise<IApiResponseBase<undefined>> =>
  putData({
    url: mePath,
    body: item,
    withAuth: true,
  }).then((data: IApiResponseBase<undefined>) => data);
