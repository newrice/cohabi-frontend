/* eslint react/destructuring-assignment:0 */
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthState } from "@aws-amplify/ui-components";
import Profile from "./features/user";
import Home from "./features/home";
import Auth from "./features/auth/Auth";

interface WithRouteProps {
  children: React.ReactNode;
}
const AppWithRoute = (props: WithRouteProps): JSX.Element => {
  const { children } = props;
  // console.log(props)
  return (
    <Router>
      {children}
      <Switch>
        <Route exact path="/signup">
          <Auth initialAuthState={AuthState.SignUp} />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Auth>
          <Route exact path="/settings">
            <Profile />
          </Route>
        </Auth>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppWithRoute;
