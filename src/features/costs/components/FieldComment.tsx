import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { MemoizedTextField } from "../../../component/parts";
import { isEqual } from "../../../utils";

interface IFieldComment {
  value: string;
  onChange: (value: string) => void;
}
const formFieldCommonClass = "input-field-base";

export const FieldComment = React.memo(
  ({ value, onChange }: IFieldComment): JSX.Element => {
    console.log("*** FieldComment : ", value);
    const { t } = useTranslation();

    const handleCommentChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      },
      [],
    );

    return (
      <MemoizedTextField
        type="text"
        label={t("LABEL_COMMENT")}
        value={value}
        onChange={handleCommentChange}
        className={formFieldCommonClass}
        inputProps={{ "data-testid": "input-comment" }}
      />
    );
  },
  isEqual,
);

export default FieldComment;
