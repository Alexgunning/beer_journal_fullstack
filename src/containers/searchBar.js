import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Input, Icon, Button } from 'antd';
import { Route } from 'react-router-dom'
import * as _ from 'lodash'

import { fetchBeerListIfNeeded } from '../actions/fetchBeerList'
import { updateSearch, deleteSearch } from '../actions/search'
const Search = Input.Search;

const parent =  {
  display: "flex",
  justifyContent: "center",
}

function handleSearch (fetchBeer, updateSearchString, history, value) {
  history.push(`?search=${value}`);
  updateSearchString(value);
  fetchBeer(value);
}

function handleClearSearch (fetchEmptyBeer, deleteSearchString, history, value) {
  history.push('');
  deleteSearchString();
  fetchEmptyBeer();
}
//TODO figure out if we want to move some of this functionality to local state
//also some of the actions the way we update where search is happeing and how it
//interacts with the query string parameters feels repetetive

let curriedHandleSearch = _.curry(handleSearch)
let curriedClearSearch = _.curry(handleClearSearch)

function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentDidMount() {
    let { fetchBeer, updateSearchString, location } = this.props;
    let queryParams = parseQuery(location.search)
    let currentSearch = queryParams.search;
    if (currentSearch) {
      this.setState({ value: currentSearch });
      updateSearchString(currentSearch);
      fetchBeer(currentSearch);
    }
  }

  onChange = (e) => {
    let { value } = e.target;
    console.log(value);
    this.setState({ value });
  }

  // defaultValue={this.props.search}
  render() {
    let { search, fetchBeer, updateSearchString, deleteSearchString } = this.props;
    const temp = true;
    return (
      <div>
        <Route render={({history}) => (
          <div style={parent}>
            <Search
              placeholder="Find Beers"
              style={{ width: "600px", margin: "20px" }}
              size="large"
              onSearch={curriedHandleSearch(fetchBeer, updateSearchString, history)}
              onChange={this.onChange}
              value={this.state.value}
              enterButton
            />
            <div>
              { this.props.search ? <Button style={{ margin: "20px" } }
                onClick={(value) => { this.setState({value: ""}); curriedClearSearch(fetchBeer, deleteSearchString, history)(value) }}
                icon="close">
                {this.props.search}</Button>
                  : <div></div> }
                </div>
                <br /><br />
              </div>
        ) } />
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  search: state.search.query
})

const mapDispatchToProps = (dispatch) => ({
  fetchBeer: (search) => dispatch(fetchBeerListIfNeeded(search)),
  updateSearchString: (search) => dispatch(updateSearch(search)),
  deleteSearchString: (search) => dispatch(deleteSearch(search))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)
