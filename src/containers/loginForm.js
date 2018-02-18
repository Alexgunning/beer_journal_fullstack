import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginUser } from '../actions/login'
import LoginForm from '../components/loginForm'
import { Route, Redirect }from "react-router-dom";
import * as actionCreators from '../actions/login';
import AddBeerButton from '../components/addBeerButton.js'

const listStyle = {
  width: "20%",
  margin: "0 auto"
};

class LoginFormContainer extends Component {

  componentDidMount() {
    const { dispatch, checkLocalToken } = this.props
    checkLocalToken()
  }

  render() {
    const {  loginUser, from } = this.props
    let returnAddress = this.props.location.state ? this.props.location.state.from : "/";
    console.log("IS AUTHENTICATED", this.props.isAuthenticated);
    console.log("RETURN ADDRESS", returnAddress);
    if ( this.props.isAuthenticated ) {
      return (
        <Redirect to={returnAddress} />
      )
    }
    else
      return (
        <div>
          <LoginForm from={from} loginUser={loginUser}/>
          <AddBeerButton/>
        </div>
      )
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  email: state.auth.email,
  isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = (dispatch) => (bindActionCreators(actionCreators, dispatch)
)

// You have to connect() to any reducers that you wish to connect to yourself
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormContainer)

