import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CostDetailField from "./CostDetailField";
import { createCost } from "../../../api";
import { InsertButton } from "../../../component/molecules";
import {
  ICategory,
  IUser,
  IApiResponseBase,
  ICost,
  TKeyOfCost,
} from "../../../types";
import { getDateString, isApiError, isEqual } from "../../../utils";

export interface INewCostForm {
  currentGroupId: string;
  currentUserId: string;
  users: IUser[];
  categories: ICategory[];
  onRequestStart: () => void;
  onRequestEnd: (error: boolean, message: string) => void;
}

const baseCost = (username: string): ICost => ({
  date: getDateString(),
  user: username,
  category: "",
  comment: "",
  value: "",
});
const formClass = "column-container";

const NewCostForm = React.memo(
  ({
    currentGroupId,
    currentUserId,
    users,
    categories,
    onRequestStart,
    onRequestEnd,
  }: INewCostForm): JSX.Element => {
    console.log("*** NewCostDetailForm");
    const { t } = useTranslation();
    const [cost, setCost] = useState<ICost>(baseCost(currentUserId));

    useEffect(() => {
      setCost(baseCost(currentUserId));
    }, [currentGroupId, currentUserId]);

    const handler = useCallback((key: TKeyOfCost, value: string) => {
      setCost(prevState => ({
        ...prevState,
        ...{ [key]: value },
      }));
    }, []);
    const responseHandler = (
      res: IApiResponseBase<undefined>,
      withBody?: boolean,
    ) => {
      const { error, message } = isApiError(res, withBody);
      if (!error) {
        setCost(baseCost(currentUserId));
      }
      onRequestEnd(error, message);
    };
    const handlePost = async () => {
      onRequestStart();
      const res = await createCost(currentGroupId, cost);
      responseHandler(res);
    };
    return (
      <div className={formClass}>
        <CostDetailField
          item={cost}
          onChange={handler}
          users={users}
          categories={categories}
        />
        <InsertButton
          label={t("LABEL_SAVE")}
          onClick={handlePost}
          className="input-field-base"
        />
      </div>
    );
  },
  isEqual,
);

export default NewCostForm;
