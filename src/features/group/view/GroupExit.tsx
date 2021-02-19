import React from "react";
import { useTranslation } from "react-i18next";
import { Button, makeStyles, Theme, Typography } from "@material-ui/core";
import { IGroup, IRequestHandler } from "../../../types";
import { exit } from "./functions";

interface IGroupExit extends IRequestHandler {
  group: IGroup;
}

const useStyles = makeStyles((theme: Theme) => ({
  exitButton: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
}));

export const GroupExit = ({
  group,
  onRequestEnd,
  onRequestStart,
}: IGroupExit): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();
  const handleExit = () => {
    exit({ data: { id: group.id }, onRequestEnd, onRequestStart });
  };
  return (
    <>
      <Typography>{t("MSG_CONFIRM_EXIT_GROUP")}</Typography>
      <Button
        onClick={handleExit}
        variant="outlined"
        className={classes.exitButton}
      >
        {t("LABEL_EXIT_GROUP")}
      </Button>
    </>
  );
};
export default GroupExit;
