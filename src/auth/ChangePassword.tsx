import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { TextField, Button } from "@material-ui/core";

interface IPasswordChange {
  onChangePasswordSuccess?: () => void;
  onChangePasswordFailed?: (error?: any) => void;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
  onChangePasswordSuccess,
  onChangePasswordFailed,
}: IPasswordChange) => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const handleOldPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOldPassword(event.target.value);
  };
  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      let user = await Auth.currentAuthenticatedUser();
      let result = await Auth.changePassword(user, oldPassword, newPassword);
      if (onChangePasswordSuccess) onChangePasswordSuccess();
      console.log(result); // SUCCESS
    } catch (error) {
      console.log("error signing in", error);
      if (onChangePasswordFailed) onChangePasswordFailed();
    }
  };
  return (
    <div>
      <TextField
        label='old password'
        type='password'
        value={oldPassword}
        autoComplete='new-password'
        onChange={handleOldPasswordChange}
      />
      <TextField
        label='new passward'
        type='password'
        autoComplete='new-password'
        value={newPassword}
        onChange={handleNewPasswordChange}
      />
      <Button onClick={handleSubmit}>Change Password</Button>
    </div>
  );
};
