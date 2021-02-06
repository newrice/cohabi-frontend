/* eslint @typescript-eslint/no-explicit-any:0 */
import React from "react";
import { useSelector } from "react-redux";
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import { AuthState } from "@aws-amplify/ui-components";
import { selectAuthState } from "./authSlice";

interface IAuthPage {
  children?: React.ReactNode;
}

const WithAuth = ({ children }: IAuthPage): JSX.Element => {
  const authState = useSelector(selectAuthState);
  return authState === AuthState.SignedIn ? (
    <>{children}</>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignIn slot="sign-in" />
      <AmplifySignUp
        slot="sign-up"
        formFields={[
          { type: "username" },
          { type: "email" },
          { type: "password" },
        ]}
      />
    </AmplifyAuthenticator>
  );
};

WithAuth.defaultProps = {
  children: null,
};

export default WithAuth;
