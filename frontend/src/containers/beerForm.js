import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid';

import { fetchBeerIfNeeded, newBeer } from '../actions/selectedBeer'
import { postBeer } from '../actions/postBeer'
import { putBeer } from '../actions/putBeer'
import { deleteBeer } from '../actions/deleteBeer'
import BeerForm from '../components/beerForm'

class BeerFormContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let { fetchBeer, newBeer} = this.props;
    if (this.props.match.path === "/new") {
      newBeer();
      this.setState({newBeer : true})
    }
    else {
      let beerId = this.props.match.params.id;
      fetchBeer(beerId)
      this.setState({newBeer : false})
    }
  }

  render() {
    const { selectedBeer, handlePostSubmit, handlePutSubmit, handleDelete} = this.props
    let isNew = this.props.match.path === "/new";
    let _id = uuid.v4();
    if (selectedBeer.loading){
      return (
        <div>
          loading
        </div>
      )
    }
    else {
      return(
        <BeerForm initialValues={isNew ? { _id } : selectedBeer.beer} isNew={isNew} handleSubmit={ isNew ? (beer) => handlePostSubmit(beer) : (beer) => handlePutSubmit(beer)} buttonName={ isNew ? "Add Beer": "Update Beer"} handleDelete={handleDelete} />
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
    handleDelete: (beer) => dispatch(deleteBeer(beer))
  }) // bind account loading action creator
)(BeerFormContainer)

export default BeerFormContainer
