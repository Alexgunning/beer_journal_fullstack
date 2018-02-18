import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/login'
import LoginForm from '../components/loginForm'
import { Route, Redirect }from "react-router-dom";

const listStyle = {
  width: "20%",
  margin: "0 auto"
};

class LoginFormContainer extends Component {
  // render() {
  //   const { from } = this.props.location.state || { from: { pathname: "/" } };
  //   const { redirectToReferrer } = this.state;

  //   if (redirectToReferrer) {
  //     return <Redirect to={from} />;
  //   }

  //   return (
  //     <div>
  //       <p>You must log in to view the page at {from.pathname}</p>
  //       <button onClick={this.login}>Log in</button>
  //     </div>
  //   );

  render() {
    const {  loginUser, from } = this.props
    let returnAddress = this.props.location.state ? this.props.location.state.from : "/beer/alex";
    if ( this.props.isAuthenticated ) {
      return (
        <Redirect to={returnAddress} />
      )
    }
    else
      return (
        <LoginForm from={from} loginUser={loginUser}/>
      )
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  email: state.auth.email,
  isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = (dispatch) => ({
  loginUser: (email, password) => dispatch(loginUser(email, password))
})

// You have to connect() to any reducers that you wish to connect to yourself
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormContainer)

