import React from "react";
import { Route, Switch } from "react-router-dom";
//import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";

function Body() {
  return (
    <section>
      <Switch>
        <Route path="/login" component={Login} exact />
      </Switch>
    </section>
  );
}

export default Body;
