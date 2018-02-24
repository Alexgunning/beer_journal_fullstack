import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/login';
import { Route, Redirect }from "react-router-dom";
import NavigationBar from './navigationBar'

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      const { checkLocalToken, isAuthenticated, isAuthenticating} = this.props
      if (!isAuthenticated && !isAuthenticating)
        checkLocalToken()
    }

    render() {

      const { dispatch, checkLocalToken, isAuthenticated, isAuthenticating, authenticationAttempted  } = this.props
      if (isAuthenticating || !authenticationAttempted)
        return(<div>Loading</div>)
      else
        return (
          <div>
            <Route
              render={props =>
                  (this.props.isAuthenticated) ? (
                    <div>
                      <NavigationBar name={this.props.name} logout={this.props.logout} viewProfile={() => console.log("TODO Implement view profile")}/>
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
