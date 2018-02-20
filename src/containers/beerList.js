import { connect } from 'react-redux'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { List, Avatar, Icon } from 'antd';

import { fetchBeerListIfNeeded } from '../actions/fetchBeerList'
import { requestBeer, fetchBeerIfNeeded, newBeer } from '../actions/selectedBeer'
import { postBeer } from '../actions/postBeer'
import { Route } from 'react-router-dom'
import AddBeerButton from '../components/addBeerButton'

const listStyle = {
  maxWidth: "60%",
  paddingBottom: "30px"
};

const outside = {
  // maxWidth: "50%",
  // margin: "0 auto",
}

const listItemStyle = {
  background: "#fafafa",
  border: "1px solid #d9d9d9",
  borderRadius: "6px", "padding": "12px",
  margin: "6px"
};

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);


const parent =  {
  display: "flex",
  justifyContent: "center",
}
const beerIcon = {
  width: "58px",
}
const title = {
  flex: 1,
  fontSize: "3vw",
}
class BeerList extends Component {

  static propTypes = {
    beers: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      brewer: PropTypes.string.isRequired,
      abv: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
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

      <div style={outside}>
        <div style={parent}>
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
                  />
                  {beer.description}
                  </List.Item>
                )}
              />
            )} />
        </div>
      <div>
        <AddBeerButton/>
      </div>
      </div>
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
