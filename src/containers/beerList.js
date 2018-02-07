import { connect } from 'react-redux'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Beer from '../components/beer'
import { fetchBeerListIfNeeded } from '../actions/fetchBeerList'
import { requestBeer, fetchBeerIfNeeded, newBeer } from '../actions/selectedBeer'
import { postBeer } from '../actions/postBeer'

// import Button from 'antd/lib/button';
// import '../App.css';

const tableStyle = {
  float: 'left',
  width: '350px'
};

class BeerList extends Component {

  static propTypes = {
    beers: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      brewer: PropTypes.string.isRequired,
      abv: PropTypes.number.isRequired
    }).isRequired).isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchBeerListIfNeeded())
  }

  render() {
    return (
      <div style={tableStyle}>
        <table>
          <tr>
            <th>name</th>
            <th>brewer</th>
            <th>abv</th>
          </tr>
          {this.props.beers.map(beer =>
            <Beer
              key={beer._id}
              {...beer}
              dispatch={this.props.dispatch}
              requestBeer={this.props.requestBeer}
            />
          )}
        </table>
        <button onClick={() => {this.props.dispatch(this.props.newBeer()) }}>
            Add New Beer
        </button>
        <button onClick={() => {this.props.dispatch(this.props.postBeer({name: "High Life", brewer: "Miller High Life", abv: "4.2"})) }}>
            Post New Beer
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
  requestBeer: fetchBeerIfNeeded,
  newBeer: newBeer,
  postBeer: postBeer
})

const mapStateToProps = (state) => ({
  beers: state.allBeers.beers
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeerList)
