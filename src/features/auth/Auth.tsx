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

export interface IAuth {
  initialAuthState?: AuthState.SignIn | AuthState.SignUp;
}

interface IWithAuth extends IAuth {
  children?: React.ReactNode;
}
export const AuthComponent = (props: IAuth): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <AmplifyAuthenticator {...props}>
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
const WithAuth = ({ initialAuthState, children }: IWithAuth): JSX.Element => {
  const authState = useSelector(selectAuthState);
  // eslint-disable-next-line no-nested-ternary
  return authState === AuthState.SignedIn ? (
    <>{children}</>
  ) : (
    <AuthComponent initialAuthState={initialAuthState} />
  );
};

WithAuth.defaultProps = {
  children: null,
};
AuthComponent.defalutProps = {
  initialAuthState: AuthState.SignIn,
};

export default WithAuth;
