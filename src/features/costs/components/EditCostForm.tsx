import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CostDetailField from "./CostDetailField";
import { deleteCost, updateCost } from "../../../api";
import { DeleteButton, UpdateButton } from "../../../component/molecules";
import {
  ICategory,
  IUser,
  IApiResponseBase,
  TKeyOfCost,
  ICostResponse,
} from "../../../types";
import { isApiError, isEqual } from "../../../utils";

export interface IEditCostForm {
  item: ICostResponse | null;
  currentGroupId: string;
  users: IUser[];
  categories: ICategory[];
  onRequestStart: () => void;
  onRequestEnd: (error: boolean, message: string) => void;
}

const formClass = "column-container";

const EditCostForm = React.memo(
  ({
    item,
    currentGroupId,
    users,
    categories,
    onRequestStart,
    onRequestEnd,
  }: IEditCostForm): JSX.Element => {
    const { t } = useTranslation();
    const [cost, setCost] = useState<ICostResponse | null>(item);
    useEffect(() => {
      setCost(item);
    }, [item]);

    const handler = useCallback((key: TKeyOfCost, value: string) => {
      setCost(prevState => {
        if (!prevState) {
          return null;
        }
        return {
          ...prevState,
          ...{ [key]: value },
        };
      });
    }, []);
    const responseHandler = useCallback(
      (res: IApiResponseBase<undefined>, withBody?: boolean) => {
        const { error, message } = isApiError(res, withBody);
        onRequestEnd(error, message);
      },
      [onRequestEnd],
    );
    const handlePut = async () => {
      if (cost) {
        onRequestStart();
        const res = await updateCost(cost.id, currentGroupId, cost);
        responseHandler(res);
      }
    };
    const handleDelete = async () => {
      if (cost) {
        onRequestStart();
        const res = await deleteCost(cost.id, currentGroupId);
        responseHandler(res);
      }
    };
    return (
      <div className={formClass}>
        {cost ? (
          <>
            <CostDetailField
              item={cost}
              onChange={handler}
              users={users}
              categories={categories}
            />
            <UpdateButton
              label={t("LABEL_SAVE")}
              onClick={handlePut}
              className="input-field-base"
            />
            <DeleteButton
              label={t("LABEL_DELETE")}
              onClick={handleDelete}
              className="input-field-base"
            />
          </>
        ) : (
          <>{t("MSG_SELECT_ITEM")}</>
        )}
      </div>
    );
  },
  isEqual,
);

export default EditCostForm;
