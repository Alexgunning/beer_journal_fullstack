import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Input, Icon, Button } from 'antd';
import { Route } from 'react-router-dom'
import * as _ from 'lodash'

import { fetchBeerListIfNeeded } from '../actions/fetchBeerList'
// var _ = require('lodash');
const Search = Input.Search;

const parent =  {
  display: "flex",
  justifyContent: "center",
}

function handleSearch (fetchBeer, history, value) {
  history.push(`?search=${value}`);
  fetchBeer(value)
}

let curriedHandleSearch = _.curry(handleSearch)

class SearchBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const temp = true;
    return (
      <div>
        <Route render={({history}) => (
          <div style={parent}>
            <Search
              placeholder="Find Beers"
              style={{ width: "600px", margin: "20px" }}
              onSearch={curriedHandleSearch(this.props.fetchBeer, history)}
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
