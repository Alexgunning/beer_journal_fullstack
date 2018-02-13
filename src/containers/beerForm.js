import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { requestBeer, fetchBeerIfNeeded, newBeer } from '../actions/selectedBeer'
import { postBeer } from '../actions/postBeer'
import { putBeer } from '../actions/putBeer'
import Form from '../components/beerForm'

const listStyle = {
  width: "20%",
  margin: "0 auto"
};

class BeerForm extends Component {

  componentDidMount() {
    let { fetchBeer, newBeer} = this.props;
    console.log(this.props.match);
    if (this.props.match.path == "/new") {
      console.log("NEW COMPONENT DID MOUNT");
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
      return(
        <Form initialValues={selectedBeer.beer} handleSubmit={this.props.match.path == "/new" ? (beer) => handlePostSubmit(beer) : (beer) => handlePutSubmit(beer)} buttonName={this.props.match.path == "/new" ? "Add Beer": "Update Beer"} />
      )
    }
  }
}


// You have to connect() to any reducers that you wish to connect to yourself
BeerForm = connect(
  state => ({
    selectedBeer: state.selectedBeer
  }),
  dispatch => ({
    fetchBeer: (beerId) =>  dispatch(fetchBeerIfNeeded(beerId)),
    newBeer: () => dispatch(newBeer()),
    handlePostSubmit: (beer) => dispatch(postBeer(beer)),
    handlePutSubmit: (beer) => dispatch(putBeer(beer)),

  }) // bind account loading action creator
)(BeerForm)

export default BeerForm
