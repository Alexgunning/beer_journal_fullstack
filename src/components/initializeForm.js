import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { requestBeer, fetchBeerIfNeeded, newBeer } from '../actions/selectedBeer'
const data = {
  // used to populate "account" reducer when "Load" is clicked
  _id: "alex",
  beer: 'Sculpin',
  brewer: 'Ballast Point',
  abv: '6.8',
  description : "sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morb",
}

let InitializeFromStateForm = props => {
  const { initialValues, handleSubmit, load, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
      </div>
      <div>
        <label>Beer</label>
        <div>
          <Field
            name="beer"
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
        <label>ABV</label>
        <div>
          <Field
            name="abv"
            component="input"
            type="text"
          />
        </div>
        <Field label="Description" name="description" component="input" />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Undo Changes
        </button>
      </div>
    </form>
  )
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
  form: 'initializeFromState', // a unique identifier for this formo
  enableReinitialize : true
})(InitializeFromStateForm)

// // You have to connect() to any reducers that you wish to connect to yourself
// InitializeFromStateForm = connect(
//   state => ({
//     initialValues: state.account.data // pull initial values from account reducer
//   }),
//   { load: loadAccount } // bind account loading action creator
// )(InitializeFromStateForm)


// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
  state => ({
    initialValues: state.selectedBeer
  }),
  dispatch => ({
    fetchBeer: () => {dispatch(fetchBeerIfNeeded)}
  }) // bind account loading action creator
)(InitializeFromStateForm)

export default InitializeFromStateForm
