import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { requestBeer, fetchBeerIfNeeded, newBeer } from '../actions/selectedBeer'

class InitializeFromStateForm extends Component {

  componentDidMount() {
    let { fetchBeer } = this.props
    let beerId = this.props.match.params.id;
    fetchBeer(beerId)
  }
  render() {
    const { initialValues, handleSubmit, load, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
        </div>
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
    fetchBeer: (beerId) =>  dispatch(fetchBeerIfNeeded(beerId))
  }) // bind account loading action creator
)(InitializeFromStateForm)

export default InitializeFromStateForm
