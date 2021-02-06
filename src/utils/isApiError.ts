import { IApiResponseBase } from "../types";

/**
 * is api response error
 * error -> returns message string
 * not error -> returns empty string
 */

export interface IIsApiResponseError {
  error: boolean;
  message: string;
}
export const isApiError = <T>(
  data?: IApiResponseBase<T>,
  withBody?: boolean,
): IIsApiResponseError => {
  const obj = {
    error: false,
    message: "",
  };
  if (!data || !data.result) {
    obj.error = true;
    return obj;
  }
  if (data.result.error || (withBody && !data.body)) {
    obj.error = true;
    obj.message = data.result.message;
  }
  return obj;
};
