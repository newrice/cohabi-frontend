import { postData, BASE_BACKEND } from "./api-base";
import settings from "../settings";
import { IApiResponseBase, ICategory } from "../types";

const categoriesPath = BASE_BACKEND + settings.url.categories;

// eslint-disable-next-line import/prefer-default-export
export const createCategories = (
  items: ICategory[],
  groupId: string
): Promise<IApiResponseBase<undefined>> =>
  postData({
    url: categoriesPath,
    params: { g: groupId },
    body: items,
    withAuth: true,
  }).then((data: IApiResponseBase<undefined>) => data);
