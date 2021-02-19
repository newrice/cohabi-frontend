import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import clsx from "clsx";
import { AuthState } from "@aws-amplify/ui-components";
import { useSelector } from "react-redux";
import { selectAuthState } from "./authSlice";
import { AuthComponent } from "./Auth";

const paperClass = clsx("column-container", "underlay-paper-base");
interface IWrapper {
  title: string;
  children: React.ReactNode;
}
const Wrapper = ({ title, children }: IWrapper) => (
  <Card className={paperClass}>
    <CardHeader title={title} />
    <CardContent>{children}</CardContent>
  </Card>
);
const SignupSent = (): JSX.Element => {
  const history = useHistory();
  const handleBackToTop = () => {
    history.push("/");
  };
  return (
    <Wrapper title="Confirm Signup">
      <h4>Confirmation message was sent to you.</h4>
      <h4>Please follow the link written in the message.</h4>
      <div>You can close this page</div>
      <button type="button" onClick={handleBackToTop}>
        back to top
      </button>
    </Wrapper>
  );
};

const AlreadySignedIn = (): JSX.Element => {
  const history = useHistory();
  const handleBackToTop = () => {
    history.push("/");
  };
  return (
    <Wrapper title="Already Logged in">
      <div>You have been logged in.</div>
      <button type="button" onClick={handleBackToTop}>
        back to top
      </button>
    </Wrapper>
  );
};

export const Signup = (): JSX.Element => {
  const authState = useSelector(selectAuthState);
  if (authState === AuthState.SignedIn) {
    return <AlreadySignedIn />;
  }
  return authState === AuthState.ConfirmSignUp ? (
    <SignupSent />
  ) : (
    <AuthComponent initialAuthState={AuthState.SignUp} />
  );
};

export default Signup;
