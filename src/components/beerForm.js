import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';

// <form onSubmit={console.log("SUMBIT")}>
// const { handleSubmit, pristine, reset, submitting } = props;

let BeerForm = props => {
  const { initialValues, handleSubmit, pristine, reset, submitting } = props;
  console.log("BEER FORM INITIAL VALUES:", initialValues)
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Beer</label>
        <div>
          <Field
            name="name"
            component="input"
            type="text"
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
}

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

BeerForm = connect(
  mapStateToProps,
  { load: () => {} } // bind account loading action creator
)(BeerForm);

BeerForm = reduxForm({
  form: 'addBeer', // a unique identifier for this form
  enableReinitialize : true
})(BeerForm);

export default BeerForm
