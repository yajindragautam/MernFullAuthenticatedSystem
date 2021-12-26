import React from "react";
import { Switch, Route } from "react-router-dom";
function Body() {
  return (
    <section>
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
    </section>
  );
}

export default Body;
