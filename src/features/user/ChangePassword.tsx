import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, DialogActions, TextField } from "@material-ui/core";
import clsx from "clsx";
import { InsideAppDialog } from "../../component/parts";

const formClass = clsx("column-container");
const formFieldCommonClass = clsx("input-field-base");

interface IChangePassword {
  open: boolean;
  onCancel: () => void;
  onSubmit: (oldPassword: string, newPassword: string) => void;
}
type TPassword = "OLD" | "NEW" | "CONFIRM_NEW";
interface IChangePasswordField {
  label: string;
  value: string;
  onChange: (value: string) => void;
  testId?: string;
}
const ChangePasswordField = ({
  label,
  value,
  onChange,
  testId,
}: IChangePasswordField) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <TextField
      type="password"
      label={label}
      value={value}
      autoComplete="new-password"
      onChange={handleChange}
      className={formFieldCommonClass}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{ "data-testid": testId }}
    />
  );
};

const ChangePassword = ({
  open,
  onCancel,
  onSubmit,
}: IChangePassword): JSX.Element => {
  const { t } = useTranslation();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const handleChangeOldPassword = (passType: TPassword) => (value: string) => {
    if (passType === "OLD") {
      setOldPassword(value);
    } else if (passType === "NEW") {
      setNewPassword(value);
    } else if (passType === "CONFIRM_NEW") {
      setConfirmNewPassword(value);
    }
  };
  return (
    <InsideAppDialog
      open={open}
      onClose={onCancel}
      PaperProps={{ style: { padding: "0px 20px" } }}
    >
      <div className={formClass}>
        <ChangePasswordField
          label={t("LABEL_OLD_PASSWORD")}
          value={oldPassword}
          onChange={handleChangeOldPassword("OLD")}
          testId="input-old-password"
        />
        <ChangePasswordField
          label={t("LABEL_NEW_PASSWORD")}
          value={newPassword}
          onChange={handleChangeOldPassword("NEW")}
          testId="input-new-password"
        />
        <ChangePasswordField
          label={t("LABEL_CONFIRM_NEW_PASSWORD")}
          value={confirmNewPassword}
          onChange={handleChangeOldPassword("CONFIRM_NEW")}
          testId="input-confirm-new-password"
        />
      </div>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          {t("LABEL_CANCEL")}
        </Button>
        <Button
          onClick={() => onSubmit(oldPassword, newPassword)}
          color="secondary"
          variant="outlined"
          disabled={
            !oldPassword ||
            !newPassword ||
            !confirmNewPassword ||
            newPassword !== confirmNewPassword
          }
        >
          {t("LABEL_SAVE")}
        </Button>
      </DialogActions>
    </InsideAppDialog>
  );
};

ChangePasswordField.defaultProps = {
  testId: "",
};

export default ChangePassword;
