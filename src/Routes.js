import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import Privacy from "./Privacy/Privacy";
import Profile from "./Profile/EditProfile";


export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/Privacy" component={Privacy} />
              <Route path="/Profile" component={Profile}/>
          </Switch>
      </Router>
      )
  }
}
