import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Input, Icon, Button } from 'antd';
import { Route } from 'react-router-dom'

import { fetchBeerListIfNeeded } from '../actions/fetchBeerList'
const Search = Input.Search;

const parent =  {
  display: "flex",
  justifyContent: "center",
}

function handleSearch (value, fetchBeer, history) {
  history.push({search: `?search=${value}`});
  value => fetchBeer(value)
}

class SearchBar extends Component {

  render() {

    const temp = true;

    return (
      <div>
        <Route render={({history}) => (
          <div style={parent}>
            <Search
              placeholder="Find Beers"
              onSearch={(value) => handleSearch(value, this.props.fetchBeer, history)}
              style={{ width: "600px", margin: "20px" }}
              size="large"
              enterButton
            />
            <div>
              { temp ? <Button style={{ margin: "20px" } } icon="close">search term</Button> : <div></div> }
            </div>
            <br /><br />
          </div>
        ) } />
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
