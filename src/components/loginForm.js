import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import '../App.css';
const FormItem = Form.Item;

const formStyle = {
  background: "#fbfbfb",
  border: "1px solid #d9d9d9",
  "border-radius": "6px",
  width: "20%",
  margin: "0 auto",
  padding: "25px"
}

const topStyle = {
  paddingTop: "50px"
};
const loginForm = {
  maxWidth: "300px"
};
const loginFormForgot = {
  float: "right"
};
const  loginFormButton = {
  width: "100%"
};

class NormalLoginForm extends Component {
  handleSubmit = (e) => { e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.props.loginUser(values.email, values.password)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={topStyle}>
        <div style={formStyle}>
          <Form onSubmit={this.handleSubmit} style={loginForm}>
            <FormItem>
      {getFieldDecorator('email', {
        rules: [{ required: true, message: 'Please input your username!' }],
      })(
        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
        )}
      </FormItem>
      <FormItem>
      {getFieldDecorator('password', {
        rules: [{ required: true, message: 'Please input your Password!' }],
      })(
        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
        )}
      </FormItem>
      <FormItem>
      {getFieldDecorator('remember', {
        valuePropName: 'checked',
        initialValue: true,
      })(
        <Checkbox>Remember me</Checkbox>
        )}
        <a style={loginFormForgot} href="">Forgot password</a>
        <Button type="primary" htmlType="submit" style={loginFormButton}>
          Log in
        </Button>
        Or <a href="">register now!</a>
      </FormItem>
    </Form>
      </div>
      </div>
    );
  }
}

export default Form.create()(NormalLoginForm);

