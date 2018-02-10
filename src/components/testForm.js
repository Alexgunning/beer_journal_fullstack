import React from "react";
import { Field, reduxForm } from "redux-form";
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

const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <div style={formStyle}>
      <Form onSubmit={handleSubmit}>
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

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }

  return errors;
}

export default reduxForm({
  form: "simple", // a unique identifier for this form
  validate,
})(SimpleForm);
