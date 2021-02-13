import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles, PropTypes, Theme } from "@material-ui/core";
import clsx from "clsx";
import { isUndefined } from "lodash";
import { SimpleButton } from "../parts";
import { TCrudTypes } from "../../types";

export interface ICrudButton {
  key?: string;
  label?: string;
  visible?: boolean;
  disable?: boolean;
  className?: string;
  onClick?: () => void;
}
interface ICrudButtonBase {
  type: TCrudTypes;
  props: ICrudButton;
}
interface IDefaults {
  tKey: string;
  defaultKey: string;
  color: PropTypes.Color;
  variant: "text" | "outlined" | "contained";
}
type TButtonDefaults = {
  [key in TCrudTypes]: IDefaults;
};

const useStyles = makeStyles((theme: Theme) => ({
  deleteButton: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
}));

const keyPreffix = "crud-button";
const insertKey = `${keyPreffix}-insert`;
const updateKey = `${keyPreffix}-update`;
const deleteKey = `${keyPreffix}-delete`;

const defaultProps: TButtonDefaults = {
  insert: {
    tKey: "LABEL_SUBMIT",
    defaultKey: insertKey,
    color: "secondary",
    variant: "contained",
  },
  update: {
    tKey: "LABEL_SAVE",
    defaultKey: updateKey,
    color: "secondary",
    variant: "outlined",
  },
  delete: {
    tKey: "LABEL_DELETE",
    defaultKey: deleteKey,
    color: "secondary",
    variant: "contained",
  },
};

const BaseButton = ({ type, props }: ICrudButtonBase): JSX.Element => {
  const { t } = useTranslation();
  const { key, label, visible, disable, className, onClick } = props;
  const { tKey, defaultKey, color, variant } = defaultProps[type];
  return (
    <SimpleButton
      label={label || t(tKey)}
      key={key || defaultKey}
      testid={key || defaultKey}
      visible={isUndefined(visible) ? true : visible}
      disabled={isUndefined(disable) ? false : disable}
      color={color}
      variant={variant}
      onClick={onClick}
      className={className}
    />
  );
};

export const InsertButton = (props: ICrudButton): JSX.Element => (
  <BaseButton type="insert" props={props} />
);
export const UpdateButton = (props: ICrudButton): JSX.Element => (
  <BaseButton type="update" props={props} />
);
export const DeleteButton = (props: ICrudButton): JSX.Element => {
  const classes = useStyles();
  const { className, ...rest } = props;
  const extendProps = {
    ...rest,
    ...{ className: clsx(classes.deleteButton, className) },
  };
  return <BaseButton type="delete" props={extendProps} />;
};
