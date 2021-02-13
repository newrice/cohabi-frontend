import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { LabeledSelectList } from "../../../component/molecules";
import { ICategory } from "../../../types";
import { isEqual } from "../../../utils";

interface IFieldCategory {
  value: string;
  onChange: (value: string) => void;
  categories: ICategory[];
}
const formFieldCommonClass = "input-field-base";

export const FieldCategory = React.memo(
  ({ value, onChange, categories }: IFieldCategory): JSX.Element => {
    console.log("*** FieldCategory : ", value, categories);
    const { t } = useTranslation();

    const handler = useCallback(
      (
        event: React.ChangeEvent<{
          name?: string | undefined;
          value: unknown;
        }>,
      ) => {
        onChange((event.target.value as string | undefined) || "");
      },
      [],
    );

    return (
      <LabeledSelectList
        label={t("LABEL_CATEGORY")}
        className={formFieldCommonClass}
        value={value}
        options={categories}
        onChange={handler}
      />
    );
  },
  isEqual,
);

export default FieldCategory;
