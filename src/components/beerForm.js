import React, { Component } from 'react'
import { Form, Input, Button, Rate } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

const formPadStyle = {
  padding: "25px"
  // backgroundColor: "#D3D3D3"
};

const formStyle = {
  background: "#fbfbfb",
  border: "1px solid #d9d9d9",
  "border-radius": "6px",
  width: "50%",
  margin: "0 auto",
  padding: "25px"
  // backgroundColor: "#D3D3D3"
};

class BeerForm extends Component {
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
    const buttonName = this.props.buttonName;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      span: 10,
      offset: 3,
    }

    const tailFormItemLayout = {
      wrapperCol: {
        span: 12,
        offset: 6,
      },
    }

    let initialValues = this.props.initialValues;

    return (
      <div style={formPadStyle}>
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
              <Button type="primary" htmlType="submit" >{buttonName}</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(BeerForm);
