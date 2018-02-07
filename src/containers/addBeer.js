import React, { Component } from 'react'
import { connect } from 'react-redux'

import { postBeer } from '../actions/postBeer'
import BeerForm from '../components/beerForm'

// <BeerForm handleSubmit={this.props.dispatch(this.props.postBeer)}/>

  function alex (event) {
    console.log("HANDLEING SUBMIT", event);
  }

// <BeerForm handleSubmit={this.props.dispatch(this.props.handleSubmit)}/>
class AddBeer extends Component {

  render() {
    console.log("PROPS", this.props);
    return (
      <div>
        <BeerForm onSubmit={this.props.handleSubmit}/>
      </div>
    )
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch: (action) => {
//       /* do your thing here */
//       return dispatch(action);
//     }
//   }

// const mapDispatchToProps = (dispatch) => ({
//   dispatch: dispatch,
//   // handleSubmit: dispatch(postBeer)
//   handleSubmit: postBeer
// })

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (beer) => {
      dispatch(postBeer(beer))
    }
  }
}

const AddBeerContainer = connect(null, mapDispatchToProps)(AddBeer)

export default AddBeerContainer
