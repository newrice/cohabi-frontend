import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Backdrop,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  createStyles,
  IconButton,
  makeStyles,
  TextField,
  Theme,
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
import { ISnackBarBase, SnackBar } from "../../component/parts";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }),
);

const SettingsController = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentUser = useSelector(selectCurrentUser);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState<boolean>(false);
  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const [snack, setSnack] = useState<ISnackBarBase>(
    createSnackState(false, ""),
  );

  useEffect(() => {
    // console.log("aaa");
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("handlechange", event.target.value);
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
        // const result =
        await Auth.changePassword(user, oldPassword, newPassword);
        // console.log(result); // SUCCESS
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
    setSnack(createSnackState(error, message));
    setSnackOpen(true);
  };

  const handleUpdate = async (): Promise<void> => {
    if (!isNameValid(name) || !isEmailValid(email)) return;
    setSending(true);
    const user = getDefaultUser();
    user.id = currentUser.id;
    user.name = name || currentUser.name;
    user.email = email || currentUser.name;
    const res = await updateProfile(user);
    setSending(false);
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
      {/* {authData ? (
        <>
          <Card className={paperClass}>
            <CardHeader title={t('HEADER_GROUP_MEMBERS')} />
            <CardContent>
              {users.map(item => (
                <div
                  key={`members-wrapper-${item.id}`}
                  className={membersClass}
                >
                  <Avatar
                    className={membersAvatar}
                    src={getAvatarData(item.id)}
                  >
                    {name[0]}
                  </Avatar>
                  <TextField
                    label={t('LABEL_NAME')}
                    value={item.name}
                    className={membersNameClass}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className={paperClass}>
            <CardHeader title={t('HEADER_INVITE_NEW_MEMBER')} />
            <div className={formClass}>
              <TextField
                error={!isCognitoUserNameValid(newUserName)}
                label={t('LABEL_ID')}
                value={newUserName}
                type="url"
                helperText={
                  !isCognitoUserNameValid(newUserName) &&
                  t('MSG_USER_ID_ALLOWED_CHARS')
                }
                onChange={handleNewUserNameChange}
                className={fieldClass}
              />
              <TextField
                error={!!newUserEmail && !isEmailValid(newUserEmail)}
                label={t('LABEL_EMAIL')}
                value={newUserEmail}
                type="email"
                onChange={handleNewUserEmailChange}
                className={fieldClass}
              />
              <Button
                disabled={
                  !isCognitoUserNameValid(newUserName) ||
                  !isEmailValid(newUserEmail)
                }
                color="secondary"
                variant="contained"
                onClick={handleInvite}
                className={fieldClass}
              >
                {t('LABEL_INVITE')}
              </Button>
            </div>
          </Card>
        </>
      ) : null} */}
      {/* controles */}
      <Backdrop open={sending} className={classes.backdrop}>
        <CircularProgress color="secondary" size={80} />
      </Backdrop>
      <SnackBar
        open={snackOpen}
        message={snack.message}
        severity={snack.severity}
        closable
        autoHideDuration={snack.autoHideDuration}
        handleClose={() => setSnackOpen(false)}
      />
    </div>
  );
};

export default SettingsController;
