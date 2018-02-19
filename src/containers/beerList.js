import { connect } from 'react-redux'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { List, Avatar, Icon } from 'antd';

import { fetchBeerListIfNeeded } from '../actions/fetchBeerList'
import { requestBeer, fetchBeerIfNeeded, newBeer } from '../actions/selectedBeer'
import { postBeer } from '../actions/postBeer'
import { Route } from 'react-router-dom'

const listStyle = {
  width: "50%",
  margin: "0 auto",
  "padding-bottom": "30px"
};

const listItemStyle = {
  background: "#fafafa",
  border: "1px solid #d9d9d9",
  "border-radius": "6px",
  "padding": "12px",
  "margin": "6px"
};

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class BeerList extends Component {

  static propTypes = {
    beers: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      brewer: PropTypes.string.isRequired,
      abv: PropTypes.number.isRequired,
      imgage: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired).isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchBeerListIfNeeded())
  }

  render() {
    return (
      <div style={listStyle}>
       <Route render={({history}) => (
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.props.beers}
          renderItem={beer => (
            <List.Item
              key={beer._id}
              style={listItemStyle}
              actions={[]}
              onClick={()=> {history.push(`beer/${beer._id}`)}}
              extra={<img width={67} height={180} alt="logo" src={beer.image} />}
            >
              <List.Item.Meta
                title={beer.name}
                description={beer.brewer}
                bordered={true}
              />
              {beer.description}
            </List.Item>
          )}
        />
       )} />
      </div>
    );

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
