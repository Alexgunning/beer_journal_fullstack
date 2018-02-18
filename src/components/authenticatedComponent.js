import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/login';
import { Route, Redirect }from "react-router-dom";

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        email: state.auth.email,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {
        componentWillMount() {
            this.checkAuth();
            this.state = {
                loaded_if_needed: false,
            };
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps);
        }

        checkAuth(props = this.props) {
            if (!props.isAuthenticated) {
                const token = localStorage.getItem('token');
                if (!token) {
                    // browserHistory.push('/home');
                } else {
                    fetch('/api/is_token_valid', {
                        method: 'post',
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json', // eslint-disable-line quote-props
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token }),
                    })
                        .then(res => {
                            if (res.status === 200) {
                                this.props.loginUserSuccess(token);
                                this.setState({
                                    loaded_if_needed: true,
                                });

                            } else {
                                // browserHistory.push('/home');
                            }
                        });

                }
            } else {
                this.setState({
                    loaded_if_needed: true,
                });
            }
        }
                    // {this.props.isAuthenticated && this.state.loaded_if_needed
                    //     ? <Component {...this.props} />
                    //     : null
                    // }

        render() {
            return (
                <div>
                  <Route
                    render={props =>
                        this.props.isAuthenticated ? (
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
              </div>
            );

        }
    }

  // AuthenticatedComponent.propTypes = {
  //   loginUserSuccess: React.PropTypes.func,
  //   isAuthenticated: React.PropTypes.bool,
  // };

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
