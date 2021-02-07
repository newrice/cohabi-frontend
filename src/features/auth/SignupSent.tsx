import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import clsx from "clsx";

const paperClass = clsx("column-container", "underlay-paper-base");
const SignupSent = (): JSX.Element => {
  const history = useHistory();
  const handleBackToTop = () => {
    history.push("/");
  };
  return (
    <>
      <Card className={paperClass}>
        <CardHeader title="Confirm Signup" />
        <CardContent>
          <h4>Confirmation message was sent to you.</h4>
          <h4>Please follow the link written in the message.</h4>
          <div>You can close this page</div>
          <button type="button" onClick={handleBackToTop}>
            back to top
          </button>
        </CardContent>
      </Card>
    </>
  );
};

export default SignupSent;
