import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

//This injects a authetnication check and redirects to login if unautheitnacted then passes down all props as normal
let privateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      false ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;

export default privateRoute;
