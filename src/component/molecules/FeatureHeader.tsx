import React from "react";
import { Toolbar, Typography } from "@material-ui/core";
import clsx from "clsx";

interface IFeatureHeader {
  title: string;
  titleClass?: string;
  wrapperClass?: string;
  endAdornment?: React.ReactElement;
}

const pageTitleClass = "flex-auto";

const FeatureHeader = ({
  title,
  titleClass,
  wrapperClass,
  endAdornment,
}: IFeatureHeader): JSX.Element => (
  <Toolbar className={wrapperClass}>
    <Typography variant="h6" className={clsx(pageTitleClass, titleClass)}>
      {title}
    </Typography>
    {endAdornment}
  </Toolbar>
);

FeatureHeader.defaultProps = {
  titleClass: "",
  wrapperClass: "",
  endAdornment: null,
};

export default FeatureHeader;
