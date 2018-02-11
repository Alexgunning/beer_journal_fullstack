import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from "redux-form";
import { requestBeer, fetchBeerIfNeeded, newBeer } from '../actions/selectedBeer'
import { Form, Input, Radio, Select, Checkbox, Button } from "antd";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;

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

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 14,
      offset: 6
    }
  }
};

const formStyle = {
  margin: "0 auto",
  "margin-top": "80px"
};

const makeField = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      {...formItemLayout}
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} children={children} />
    </FormItem>
  );
};

const AInput = makeField(Input);
const ARadioGroup = makeField(RadioGroup);
const ASelect = makeField(Select);
const ACheckbox = makeField(Checkbox);
const ATextarea = makeField(TextArea);

class SimpleForm extends Component {

  componentDidMount() {
    const { fetchBeer, beerId } = this.props
    fetchBeer(beerId)
  }
  render() {
    const { initialValues, handleSubmit, pristine, reset, submitting, beer } = this.props;
    console.log("INITIAL VALUES:", initialValues);
    return (
      <div style={formStyle}>
        <Form onSubmit={handleSubmit} initialValues={initialValues}>
          <Field
            label="Name"
            name="name"
            component={AInput}
            hasFeedback
          />

        <Field
          label="Brewer"
          name="brewer"
          component={AInput}
        />

      <Field
        label="ABV"
        name="abv"
        component={AInput}
      />

    <Field label="Description" name="description" component={ATextarea} />

    <FormItem {...tailFormItemLayout}>
      <Button
        type="primary"
        disabled={pristine || submitting}
        htmlType="submit"
        style={{ marginRight: "10px" }}
      >
        Submit
      </Button>

      <Button disabled={pristine || submitting} onClick={reset}>
        Clear Values
      </Button>
    </FormItem>
  </Form>
</div>
    );
  };
}


const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }

  return errors;
}

const mapDispatchToProps = (dispatch) => ({
  fetchBeer: (beer) => {dispatch(fetchBeerIfNeeded(beer))}
})

// const mapStateToProps = (state) =>  ({
//   initialValues: state.selectedBeer,
// })

const mapStateToProps = (state) =>  ({
  initialValues : {
    abv : 10.4,
    brewer : "Boulevard",
    description : "sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie at elementum eu facilisis sed odio",
    image : "https://res.cloudinary.com/ratebeer/image/upload/w_250,c_limit/beer_412233.jpg",
    name : "Love Child",
    user : "0afe8b6a-4478-4256-9084-a4467edb4d50",
    _id : "c8ee2a1a-3c7b-4bdb-9999-42f003d65853"
  }

})

SimpleForm = connect(
     state => ({
         initialValues: state.selectedBeer
       }),
  mapDispatchToProps
)(SimpleForm);

export default reduxForm({
  form: "simple", // a unique identifier for this form
  validate,
  enableReinitialize : true
})(SimpleForm);
