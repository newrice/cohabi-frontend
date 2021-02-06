import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  IconButton,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import clsx from "clsx";
import { GroupNameField } from "./GroupNameTextField";

interface IGroupEditForm {
  name: string;
  inviteUserName: string;
  onNameChange: (name: string) => void;
  onInviteUserNameChange: (name: string) => void;
  onSaveClick: () => void;
  onInviteClick: () => void;
  onExitGroupClick: () => void;
}

const formClass = clsx("column-container");
const rowClass = clsx(
  "row-container",
  "jc-center-container",
  "ai-flex-end-container",
);
const formFieldCommonClass = clsx("input-field-base");
const formFieldExtendStyle = { margin: "8px 0px" };

const useStyles = makeStyles((theme: Theme) => ({
  exitButton: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
}));

// eslint-disable-next-line import/prefer-default-export
export const GroupEditForm = ({
  name,
  inviteUserName,
  onNameChange,
  onInviteUserNameChange,
  onSaveClick,
  onInviteClick,
  onExitGroupClick,
}: IGroupEditForm): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div className={formClass}>
      <div className={rowClass}>
        <GroupNameField
          name={name}
          onNameChange={onNameChange}
          className={formFieldCommonClass}
          style={formFieldExtendStyle}
        />
        <IconButton disabled={!name} onClick={onSaveClick}>
          <SaveIcon />
        </IconButton>
      </div>
      <div className={rowClass}>
        <TextField
          label={t("LABEL_INVITE_USER_ID")}
          value={inviteUserName}
          onChange={event => onInviteUserNameChange(event.target.value)}
          className={formFieldCommonClass}
          style={formFieldExtendStyle}
          inputProps={{ "data-testid": "input-ammount" }}
        />
        <IconButton disabled={!inviteUserName} onClick={onInviteClick}>
          <GroupAddIcon />
        </IconButton>
      </div>
      <div className={rowClass}>
        <Button
          onClick={onExitGroupClick}
          variant="outlined"
          className={classes.exitButton}
        >
          {t("LABEL_EXIT_GROUP")}
        </Button>
      </div>
    </div>
  );
};
