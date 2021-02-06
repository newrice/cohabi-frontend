import React from "react";
import { Button, ButtonProps } from "@material-ui/core";
import clsx from "clsx";

interface ISimpleButton extends ButtonProps {
  visible?: boolean;
  className?: string;
  testid?: string;
  label: string;
}

const buttonClass = "parts-simple-button";

// eslint-disable-next-line import/prefer-default-export
export const SimpleButton = ({
  visible,
  label,
  className,
  testid,
  ...rest
}: ISimpleButton): JSX.Element => {
  const buttonProps = {
    "data-testid": testid,
    ...rest,
  };
  return visible ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Button className={clsx(buttonClass, className)} {...buttonProps}>
      {label}
    </Button>
  ) : (
    <></>
  );
};

SimpleButton.defaultProps = {
  visible: true,
  className: undefined,
  testid: undefined,
};
