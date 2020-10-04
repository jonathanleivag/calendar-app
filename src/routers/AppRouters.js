import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";

export const AppRouters = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <CalendarScreen />
          </Route>
          <Route path="/login" exact>
            <LoginScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
