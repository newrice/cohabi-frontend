import React from "react";
import { PropTypes, Typography } from "@material-ui/core";
import { Variant } from "@material-ui/core/styles/createTypography";

interface IGroupItemTitle {
  title: string;
  className?: string;
  variant?: Variant | "inherit";
  align?: PropTypes.Alignment;
}

export const GroupItemTitle = ({
  title,
  className,
  variant,
  align,
}: IGroupItemTitle): JSX.Element => (
  <Typography
    variant={variant || "subtitle1"}
    align={align}
    className={className}
  >
    {title}
  </Typography>
);

GroupItemTitle.defaultProps = {
  variant: "subtitle1",
  className: "",
  align: "center",
};

export default GroupItemTitle;
