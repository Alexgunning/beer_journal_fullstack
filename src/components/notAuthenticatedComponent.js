import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/login';
import { Route, Redirect }from "react-router-dom";

export function requireNoAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      const { dispatch, checkLocalToken, isAuthenticated, isAuthenticating } = this.props
      if (!isAuthenticated)
        checkLocalToken()
    }

    render() {
    let returnAddress = this.props.location.state ? this.props.location.state.from : "/";

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

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}

