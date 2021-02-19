import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import { MemoizedTextField } from "../../../component/parts";
import { IRequestHandler, IGroup } from "../../../types";
import { invite } from "./functions";

interface IGroupInvite extends IRequestHandler {
  group: IGroup;
}
const formFieldCommonClass = "input-field-base margin-tb-8";

export const GroupInvite = ({
  group,
  onRequestEnd,
  onRequestStart,
}: IGroupInvite): JSX.Element => {
  const { t } = useTranslation();
  const [userid, setUserid] = useState<string>("");
  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserid(event.target.value);
  };
  const handleInvite = () => {
    invite({
      data: {
        groupid: group.id,
        userid,
      },
      onRequestEnd,
      onRequestStart,
    });
  };
  return (
    <>
      <MemoizedTextField
        label={t("LABEL_INVITE_USER_ID")}
        value={userid}
        onChange={handleUserIdChange}
        className={formFieldCommonClass}
        inputProps={{ "data-testid": "group-invite-userid" }}
      />
      <Button
        disabled={!userid}
        onClick={handleInvite}
        variant="outlined"
        color="secondary"
      >
        {t("LABEL_INVITE")}
      </Button>
    </>
  );
};

export default GroupInvite;
