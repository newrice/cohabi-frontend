import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, IconButton, makeStyles, Theme } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { GroupNameField } from "./GroupNameTextField";
import { IGroup, IRequestHandler } from "../../../types";
import { edit } from "./functions";

interface IGroupEdit extends IRequestHandler {
  group: IGroup;
  onExitClick: (group: IGroup) => void;
  onInviteClick: (group: IGroup) => void;
}

const rowClass = "row-container jc-center-container";
const formFieldCommonClass = "input-field-base margin-tb-8";

const useStyles = makeStyles((theme: Theme) => ({
  exitButton: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
}));

export const GroupEdit = ({
  group,
  onExitClick,
  onInviteClick,
  onRequestEnd,
  onRequestStart,
}: IGroupEdit): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [newName, setNewName] = useState<string>(group.name);
  useEffect(() => {
    setNewName(group.name);
  }, [group.id, group.name]);
  const handleNameChange = (value: string) => {
    setNewName(value);
  };
  const handleExitClick = () => {
    onExitClick(group);
  };
  const handleInviteClick = () => {
    onInviteClick(group);
  };
  const handleSavename = () => {
    edit({
      data: { ...group, ...{ name: newName } },
      onRequestStart,
      onRequestEnd,
    });
  };
  return (
    <>
      <GroupNameField
        name={newName}
        onNameChange={handleNameChange}
        className={formFieldCommonClass}
      />
      <IconButton disabled={!newName} onClick={handleSavename}>
        <SaveIcon />
      </IconButton>
      <div className={rowClass}>
        <Button
          onClick={handleExitClick}
          variant="outlined"
          className={classes.exitButton}
        >
          {t("LABEL_EXIT_GROUP")}
        </Button>
        <Button
          onClick={handleInviteClick}
          variant="outlined"
          color="secondary"
        >
          {t("LABEL_INVITE")}
        </Button>
      </div>
    </>
  );
};
export default GroupEdit;
