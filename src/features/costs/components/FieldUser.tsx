import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MemoizedTextField } from "../../../component/parts";
import { IUser } from "../../../types";
import { isEqual } from "../../../utils";

interface IFieldUser {
  value: string;
  users: IUser[];
}

const formFieldCommonClass = "input-field-base";

export const FieldUser = React.memo(
  ({ value, users }: IFieldUser): JSX.Element => {
    console.log("*** FieldUser : ", value, users);
    const { t } = useTranslation();

    const getUserName = useMemo(() => {
      const findUser = users.find(u => u.id === value);
      return findUser ? findUser.name : "unknown user";
    }, [value, users]);

    return (
      <MemoizedTextField
        label={t("LABEL_USER")}
        value={getUserName}
        InputProps={{
          readOnly: true,
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        inputProps={{ "data-testid": "cost-detail-field-user" }}
        className={formFieldCommonClass}
      />
    );
  },
  isEqual,
);

export default FieldUser;
