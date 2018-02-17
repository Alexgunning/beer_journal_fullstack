import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/login'
import LoginForm from '../components/loginForm'

const listStyle = {
  width: "20%",
  margin: "0 auto"
};

class LoginFormContainer extends Component {

  render() {
    const {  loginUser } = this.props
    return (
      <LoginForm  loginUser={loginUser}/>
    )
  }
}


// You have to connect() to any reducers that you wish to connect to yourself
 export default connect(
  state => ({}),
  dispatch => ({
    loginUser: (email, password) => dispatch(loginUser(email, password))
  }) // bind account loading action creator
)(LoginFormContainer)

