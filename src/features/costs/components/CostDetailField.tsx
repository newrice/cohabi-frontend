import React, { useCallback } from "react";
import FieldUser from "./FieldUser";
import FieldDate from "./FieldDate";
import FieldCategory from "./FieldCategory";
import FieldAmount from "./FieldAmount";
import FieldComment from "./FieldComment";
import { ICategory, ICost, IUser, TCostChangeHandler } from "../../../types";
import { getDateString, isEqual } from "../../../utils";

export interface ICostDetailField {
  item: ICost;
  onChange: TCostChangeHandler;
  categories: ICategory[];
  users: IUser[];
}

export const CostDetailField = React.memo(
  ({ item, onChange, categories, users }: ICostDetailField): JSX.Element => {
    const handleDateChange = useCallback(
      (value: Date | null) => {
        onChange("date", getDateString(value));
      },
      [item.date],
    );
    const handleCategoryChange = useCallback(
      (value: string) => {
        onChange("category", value);
      },
      [item.category],
    );
    const handleAmountChange = useCallback(
      (value: string) => {
        onChange("value", value);
      },
      [item.value],
    );
    const handleCommentChange = useCallback(
      (value: string) => {
        onChange("comment", value);
      },
      [item.comment],
    );

    return (
      <>
        <FieldDate value={item.date} onChange={handleDateChange} />
        <FieldCategory
          value={item.category}
          categories={categories}
          onChange={handleCategoryChange}
        />
        <FieldUser value={item.user} users={users} />
        <FieldAmount value={item.value} onChange={handleAmountChange} />
        <FieldComment value={item.comment} onChange={handleCommentChange} />
      </>
    );
  },
  isEqual,
);

export default CostDetailField;
