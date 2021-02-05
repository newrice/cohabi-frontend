import React from "react";
import { Auth } from "aws-amplify";
import { Button } from "@material-ui/core";

interface ISignOut {
  onSignOutSuccess: () => void;
  onSignOutFailed?: (error?: any) => void;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ onSignOutSuccess, onSignOutFailed }: ISignOut) => {
  const handleSignout = async () => {
    try {
      const res = await Auth.signOut();
      console.log("sign out success : ", res);
      onSignOutSuccess();
    } catch (e) {
      console.log("sign out failed : ", e);
      if (onSignOutFailed) onSignOutFailed(e);
    }
  };
  return <Button onClick={handleSignout}>Signout</Button>;
};
