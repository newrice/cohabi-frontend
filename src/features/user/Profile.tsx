import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  IconButton,
  TextField,
} from "@material-ui/core";
import PasswordIcon from "@material-ui/icons/VpnKey";
import clsx from "clsx";
import { Auth } from "aws-amplify";
import ChangePasswordDialog from "./ChangePassword";
import { isNameValid, isEmailValid } from "./validator";
import { IApiResponseBase, IUser } from "../../types";
import { fetchCurrentUser, selectCurrentUser } from "./userSlice";
import { updateProfile } from "../../api";
import { createSnackState, isApiError } from "../../utils";
import { setProgress, setSnackState } from "../feedback/feedbackSlice";

const divClass = "input-wrapper";
const paperClass = clsx("column-container", "underlay-paper-base");
const formClass = clsx("column-container", "input-signup-form");
const selfAvatarWrapperClss = clsx("row-container", "jc-center-container");
const selfAvatar = clsx("user-avatar", "avatar-large");
const fieldClass = "input-field-base";

const getDefaultUser = (): IUser => ({
  id: "",
  name: "",
  email: "",
});

const SettingsController = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [passwordDialogOpen, setPasswordDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordClick = () => {
    setPasswordDialogOpen(true);
  };
  const handleChangePasswordCalncelClick = () => {
    setPasswordDialogOpen(false);
  };
  const handleChangePasswordSubmit = (
    oldPassword: string,
    newPassword: string,
  ) => {
    const ChangePassword = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.changePassword(user, oldPassword, newPassword);
      } catch (error) {
        // console.log("error signing in", error);
      } finally {
        setPasswordDialogOpen(false);
      }
    };
    ChangePassword();
  };

  const responseHandler = (
    res: IApiResponseBase<undefined>,
    withBody?: boolean,
  ) => {
    const { error, message } = isApiError(res, withBody);
    if (!error) {
      dispatch(fetchCurrentUser());
    }
    dispatch(setSnackState(createSnackState(error, message)));
  };

  const handleUpdate = async (): Promise<void> => {
    if (!isNameValid(name) || !isEmailValid(email)) return;
    dispatch(setProgress(true));
    const user = getDefaultUser();
    user.id = currentUser.id;
    user.name = name || currentUser.name;
    user.email = email || currentUser.name;
    const res = await updateProfile(user);
    dispatch(setProgress(false));
    responseHandler(res);
  };

  return (
    <div className={divClass}>
      <Card className={paperClass}>
        <CardHeader
          title={currentUser.id}
          action={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <IconButton onClick={handlePasswordClick}>
              <PasswordIcon />
            </IconButton>
          }
        />
        <div className={formClass}>
          <TextField
            label={t("LABEL_NAME")}
            value={name}
            onChange={handleNameChange}
            className={fieldClass}
          />
          <TextField
            label={t("LABEL_EMAIL")}
            value={email}
            type="email"
            onChange={handleEmailChange}
            className={fieldClass}
            disabled
          />
          <div className={selfAvatarWrapperClss}>
            <IconButton component="label">
              <Avatar className={selfAvatar}>
                {currentUser && currentUser.name[0]}
              </Avatar>
            </IconButton>
          </div>
          <Button
            disabled={!isNameValid(name) || !isEmailValid(email)}
            color="secondary"
            variant="outlined"
            onClick={handleUpdate}
            className={fieldClass}
          >
            {t("LABEL_SAVE")}
          </Button>
        </div>
      </Card>
      <ChangePasswordDialog
        open={passwordDialogOpen}
        onSubmit={handleChangePasswordSubmit}
        onCancel={handleChangePasswordCalncelClick}
      />
    </div>
  );
};

export default SettingsController;
