/* eslint react/destructuring-assignment:0 */
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./features/auth/Auth";
import Home from "./home";
import Calendars from "./features/calendars";
import Categories from "./features/categories";
import Costs from "./features/costs";
import Todos from "./features/todos";
import Profile from "./features/user";
import Signup from "./features/auth/Signup";

interface WithRouteProps {
  children: React.ReactNode;
}

const AppWithRoute = (props: WithRouteProps): JSX.Element => {
  const { children } = props;
  // console.log("*** AppWithRoute");
  return (
    <Router>
      {children}
      <Switch>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/calendars">
          <Auth>
            <Calendars />
          </Auth>
        </Route>
        <Route exact path="/categories">
          <Auth>
            <Categories />
          </Auth>
        </Route>
        <Route exact path="/costs">
          <Auth>
            <Costs />
          </Auth>
        </Route>
        <Route exact path="/settings">
          <Auth>
            <Profile />
          </Auth>
        </Route>
        <Route exact path="/todos">
          <Auth>
            <Todos />
          </Auth>
        </Route>
        <Route path="*">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppWithRoute;
