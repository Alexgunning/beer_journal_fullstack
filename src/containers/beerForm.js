import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { requestBeer, fetchBeerIfNeeded, newBeer } from '../actions/selectedBeer'
import { postBeer } from '../actions/postBeer'
import { putBeer } from '../actions/putBeer'
import BeerForm from '../components/beerForm'

const listStyle = {
  width: "20%",
  margin: "0 auto"
};

class BeerFormContainer extends Component {

  componentDidMount() {
    let { fetchBeer, newBeer} = this.props;
    console.log(this.props.match);
    if (this.props.match.path == "/new") {
      newBeer();
    }
    else {
      let beerId = this.props.match.params.id;
      fetchBeer(beerId)
    }
  }

  render() {
    const { selectedBeer, handlePostSubmit, handlePutSubmit, load, pristine, reset, submitting } = this.props
    if (selectedBeer.loading){
      return (
        <div>
          loading
        </div>
      )
    }
    else {
      //TODO set a variable and clean this up
      return(
        <BeerForm initialValues={selectedBeer.beer} handleSubmit={this.props.match.path == "/new" ? (beer) => handlePostSubmit(beer) : (beer) => handlePutSubmit(beer)} buttonName={this.props.match.path == "/new" ? "Add Beer": "Update Beer"} />
      )
    }
  }
}


// You have to connect() to any reducers that you wish to connect to yourself
BeerFormContainer = connect(
  state => ({
    selectedBeer: state.selectedBeer
  }),
  dispatch => ({
    fetchBeer: (beerId) =>  dispatch(fetchBeerIfNeeded(beerId)),
    newBeer: () => dispatch(newBeer()),
    handlePostSubmit: (beer) => dispatch(postBeer(beer)),
    handlePutSubmit: (beer) => dispatch(putBeer(beer)),

  }) // bind account loading action creator
)(BeerFormContainer)

export default BeerFormContainer
