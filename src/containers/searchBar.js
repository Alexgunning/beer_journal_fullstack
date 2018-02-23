import { connect } from 'react-redux'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchBeerListIfNeeded } from '../actions/fetchBeerList'
import { Route } from 'react-router-dom'
import { Input } from 'antd';
const Search = Input.Search;

const parent =  {
  display: "flex",
  justifyContent: "center",
}

class SearchBar extends Component {

  render() {
    return (
      <div style={parent}>
        <Search
          placeholder="Find Beers"
          onSearch={value => this.props.fetchBeer(value)}
          style={{ width: "600px", margin: "20px" }}
          enterButton="Search"
          size="large"
        />
        <br /><br />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
    fetchBeer: (search) => dispatch(fetchBeerListIfNeeded(search))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)
