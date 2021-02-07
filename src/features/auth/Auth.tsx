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
import SignupSent from "./SignupSent";

interface IAuthPage {
  initialAuthState?: AuthState.SignIn | AuthState.SignUp;
  children?: React.ReactNode;
}
const WithAuth = ({ initialAuthState, children }: IAuthPage): JSX.Element => {
  const authState = useSelector(selectAuthState);
  // eslint-disable-next-line no-nested-ternary
  return authState === AuthState.SignedIn ? (
    <>{children}</>
  ) : authState === AuthState.ConfirmSignUp ? (
    <SignupSent />
  ) : (
    <AmplifyAuthenticator initialAuthState={initialAuthState}>
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
  initialAuthState: AuthState.SignIn,
  children: null,
};

export default WithAuth;
