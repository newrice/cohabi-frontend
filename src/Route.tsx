/* eslint react/destructuring-assignment:0 */
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthState } from "@aws-amplify/ui-components";
import Auth from "./features/auth/Auth";
import Home from "./home";
import Calendars from "./features/calendars";
import Categories from "./features/categories";
import Costs from "./features/costs";
import Todos from "./features/todos";
import Profile from "./features/user";

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
          <Route exact path="/calendars">
            <Calendars />
          </Route>
          <Route exact path="/categories">
            <Categories />
          </Route>
          <Route exact path="/costs">
            <Costs />
          </Route>
          <Route exact path="/settings">
            <Profile />
          </Route>
          <Route exact path="/todos">
            <Todos />
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
