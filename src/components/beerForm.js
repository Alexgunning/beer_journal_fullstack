import React from 'react';
import { Field, reduxForm } from 'redux-form';

// <form onSubmit={console.log("SUMBIT")}>
  // const { handleSubmit, pristine, reset, submitting } = props;
let BeerForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Beer</label>
        <div>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>
      <div>
        <label>Brewer</label>
        <div>
          <Field
            name="brewer"
            component="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>
      <div>
        <label>abv</label>
        <div>
          <Field
            name="abv"
            component="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

BeerForm = reduxForm({
  form: 'addBeer' // a unique identifier for this form
})(BeerForm);

export default BeerForm
