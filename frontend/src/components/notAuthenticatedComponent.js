import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/auth';
import { Route, Redirect }from "react-router-dom";
import Auth from '../auth/auth';

let auth = new Auth();

export function requireNoAuthentication(Component) {
  class NotAuthenticatedComponent extends React.Component {
    componentWillMount() {
      const { checkLocalToken, isAuthenticated } = this.props
      if (!isAuthenticated)
        checkLocalToken()
    }

    render() {
      if (this.props.isAuthenticating)
        return(<div></div>)
      else
        return (
          <div>
            <Route
              render={props =>
                  !this.props.isAuthenticated  ? (
                    <Component {...props} />
                  ) : (
                    <Redirect
                      to={{
                        pathname:"/"
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
    };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(NotAuthenticatedComponent);
}

