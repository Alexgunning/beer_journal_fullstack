import React from 'react';
import { Field, reduxForm } from 'redux-form';

const BeerForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Beer</label>
        <div>
          <Field
            name="beer"
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
        <label>ABV</label>
        <div>
          <Field
            name="abv"
            component="input"
            type="number"
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

export default reduxForm({
  form: 'addBeer', // a unique identifier for this form
})(BeerForm);
