import React, { Component } from 'react'
import { connect } from 'react-redux'
import TestForm from './testForm.js'
import PropTypes from 'prop-types'

import { requestBeer, fetchBeerIfNeeded, newBeer } from '../actions/selectedBeer'

      // <p>{name}</p>
      // <p>{brewer}</p>
      // <p>{abv}</p>
      // <p>{description}</p>
class Beer extends Component {

  static propTypes = {
      // _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      brewer: PropTypes.string.isRequired,
      abv: PropTypes.number.isRequired,
    imgage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    beerId: PropTypes.string.isRequired
  }

componentDidMount() {
  const { fetchBeer, beerId } = this.props
  fetchBeer(beerId)
}

render() {
  return (
    <div>
      <TestForm beer={this.props.beer}/>
    </div>
  )}
}

const mapDispatchToProps = (dispatch) => ({
  fetchBeer: () => {dispatch(fetchBeerIfNeeded)}
})

const mapStateToProps = (state) =>  ({
  beer: state.selectedBeer
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Beer)
