import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/auth';
import { Route, Redirect }from "react-router-dom";
import NavigationBar from './navigationBar'
import Auth from '../auth/auth';

let auth = new Auth();

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {

    render() {
        return (
          <div>
            <Route
              render={props =>
                  (auth.isAuthenticated()) ? (
                    <div>
                      <NavigationBar name={this.props.name} logout={()=> auth.logout(this.props.history)} viewProfile={() => console.log("TODO Implement view profile")}/>
                      <Component {...props} />
                    </div>
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
          </div>
        );

    }
  }

  function mapStateToProps(state) {
    return {
      token: state.auth.token,
      email: state.auth.email,
      isAuthenticated: state.auth.isAuthenticated,
      isAuthenticating: state.auth.isAuthenticating,
      authenticationAttempted: state.auth.authenticationAttempted,
      name: state.auth.name,
    };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
