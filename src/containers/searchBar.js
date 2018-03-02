import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Input, Icon, Button } from 'antd';
import { Route } from 'react-router-dom'
import * as _ from 'lodash'

import { updateSearch, deleteSearch } from '../actions/search'
const Search = Input.Search;

const parent =  {
  display: "flex",
  justifyContent: "center",
}

function handleSearch (updateSearchString, history, value) {
  history.push(`?search=${value}`);
  updateSearchString(value);
}

function handleClearSearch (deleteSearchString, history, value) {
  history.push('');
  deleteSearchString();
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
    let { updateSearchString, location } = this.props;
    let queryParams = parseQuery(location.search)
    let currentSearch = queryParams.search;
    if (currentSearch) {
      this.setState({ value: currentSearch });
      updateSearchString(currentSearch);
    }
  }

  onChange = (e) => {
    let { value } = e.target;
    this.setState({ value });
  }

  render() {
    let { search, updateSearchString, deleteSearchString } = this.props;
    return (
      <div>
        <Route render={({history}) => (
          <div style={parent}>
            <Search
              placeholder="Find Beers"
              style={{ width: "600px", margin: "20px" }}
              size="large"
              onSearch={curriedHandleSearch(updateSearchString, history)}
              onChange={this.onChange}
              value={this.state.value}
              enterButton
            />
            <div>
              { search ? <Button style={{ margin: "20px" } }
                onClick={(value) => { this.setState({value: ""}); curriedClearSearch(deleteSearchString, history)(value) }}
                icon="close">
                {search}</Button>
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
  updateSearchString: (search) => dispatch(updateSearch(search)),
  deleteSearchString: () => dispatch(deleteSearch())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)
