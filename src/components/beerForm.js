import React, { Component } from 'react'
import { Form, Input, Button, Rate } from 'antd';
import { Route, Redirect } from 'react-router-dom'
const FormItem = Form.Item;
const { TextArea } = Input;

const formPadStyle = {
  padding: "25px"
  // backgroundColor: "#D3D3D3"
};

// const beerStyles = ["India Pale Ale (IPA)", "American Pale Ale", "Imperial IPA", "Imperial Stout", "Sour/Wild Ale", "Saison", "Stout",
// "Golden Ale/Blond Ale", "Porter", "Session IPA", "Sweet Stout", "Cider", "Amber Ale", "Fruit Beer", "Brown Ale"]


const formStyle = {
  background: "#fbfbfb",
  border: "1px solid #d9d9d9",
  borderRadius: "6px",
  width: "50%",
  margin: "0 auto", padding: "25px"
  // backgroundColor: "#D3D3D3"
};

class BeerForm extends Component {
  state = {
    confirmDirty: false,
    attemptToLeave: false,
    updated: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //TODO FIGURE OUT A BETTE WAY TO DO THIS
        if (this.props.initialValues._id != null){
          values._id = this.props.initialValues._id;
          values.image = this.props.initialValues.image;
        }
        this.setState({updated : true})
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

    const formItemLayout = {
      span: 10,
      offset: 3,
    }

    const buttonRow = {
      display: "flex",
      justifyContent: "center",
    }

    const buttonItem = {
      margin: "20px"
    }

    let initialValues = this.props.initialValues;
    if (this.state.updated)
      return (
        <Redirect
          to={{
            pathname: "/"
          }}
        />

      )

    else
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
                label="Image"
              >
                {getFieldDecorator('image', {
                  initialValue: initialValues.image
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
              <Route render={({history}) => (
                <div style={buttonRow} id="button-row">
                  <FormItem>
                    <Button style={buttonItem} type="primary" htmlType="submit">{buttonName}</Button>
                  </FormItem>
                  <FormItem>
                    <Button style={buttonItem} type="danger" htmlType="button" onClick={() => history.push('/') } >Cancel</Button>
                  </FormItem>
                </div>
              )} />
          </Form>
        </div>
      </div>
      );
  }
}

export default Form.create()(BeerForm);
