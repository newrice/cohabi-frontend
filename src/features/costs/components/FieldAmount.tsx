import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { MemoizedTextField } from "../../../component/parts";
import { isEqual } from "../../../utils";

interface IFieldAmount {
  value: string;
  onChange: (value: string) => void;
}
const formFieldCommonClass = "input-field-base";

// eslint-disable-next-line import/prefer-default-export
export const FieldAmount = React.memo(
  ({ value, onChange }: IFieldAmount): JSX.Element => {
    console.log("*** FieldAmount : ", value);
    const { t } = useTranslation();

    const handleAmountChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      },
      [onChange],
    );

    return (
      <MemoizedTextField
        type="number"
        label={t("LABEL_AMMOUNT")}
        value={value}
        onChange={handleAmountChange}
        className={formFieldCommonClass}
        inputProps={{ "data-testid": "input-ammount" }}
      />
    );
  },
  isEqual,
);

export default FieldAmount;
