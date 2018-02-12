import React, { Component } from 'react'
import { Form, Input, Button, Rate } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

const formStyle = {
  paddingTop: "80px",
  width: "30%",
  margin: "0 auto",
  // backgroundColor: "#D3D3D3"
};

class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //TODO FIGURE OUT A BETTE WAY TO DO THIS
        if (this.props.initialValues._id != null){
          values._id = this.props.initialValues._id;
          values.image = this.props.initialValues.image;
        }
        this.props.handleSubmit(values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };

    // labelCol: {
    //   xs: { span: 24 },
    //   sm: { span: 8 },
    // },
    // wrapperCol: {
    //   xs: { span: 24 },
    //   sm: { span: 16 },
    // },
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  let initialValues = this.props.initialValues;
  console.log("ANT FORM SUBMIT", this.props.handleSubmit);

  return (
    <div style={formStyle}>
      <img width={67} height={180} alt="logo" src={initialValues.image} />
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Beer"
        >
          {getFieldDecorator('name', {
            initialValue: initialValues.name
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Brewer"
        >
          {getFieldDecorator('brewer', {
            initialValue: initialValues.brewer
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="ABV"
        >
          {getFieldDecorator('abv', {
            initialValue: initialValues.abv
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Description"
        >
          {getFieldDecorator('description', {
            initialValue: initialValues.description
          })(
            <TextArea />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Rating"
        >
          {getFieldDecorator('rating', {
            initialValue: initialValues.rating
          })(
            <Rate allowHalf  />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" >AddBeer</Button>
        </FormItem>
      </Form>
    </div>
  );
  }
}

export default Form.create()(RegistrationForm);
