import { connect } from 'react-redux'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, Card, Rate } from 'antd';

import { fetchBeerListIfNeeded } from '../actions/fetchBeerList'
import { fetchBeerIfNeeded, newBeer } from '../actions/selectedBeer'
import { postBeer } from '../actions/postBeer'
import { Route } from 'react-router-dom'
import AddBeerButton from '../components/addBeerButton'

const { Meta } = Card;


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

const parent =  {
  display: "flex",
  justifyContent: "center",
}

const parentCard =  {
  display: "flex",
  justifyContent: "center",
  alignContent: "flex-start",
  flexFlow: "row wrap",

}

const cardContainerStyle = {
  minWidth: "800px",
  maxWidth: "1800px",
  margin: "0 auto"
};

const parentTitle = {
  display: "flex",
}

const middleTitle = {
  flex: 1,
}

const Title = ({ beer, rating }) => (
  <div style={parentTitle}>
    <div>
      {beer}
    </div>
    <div style={middleTitle}>
    </div>
    <div>
      <Rate allowHalf disabled defaultValue={rating} />
    </div>
  </div>
)


class BeerList extends Component {

  static propTypes = {
    beers: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      brewer: PropTypes.string.isRequired,
      abv: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired).isRequired
  }

  componentDidMount() {
    let { fetchBeer, query } = this.props;
    fetchBeer(query)
  }

  componentWillReceiveProps(nextProps) {
    let { fetchBeer, query } = this.props;
    if (query != nextProps.query)
      fetchBeer(nextProps.query)
  }

  // extra={<div>rating {beer.rating}*</div>}

  render() {
    let { beers, query } = this.props;
    if (false)
      return (
        <div style={parent}>
          <div style={cardContainerStyle}>
            <Route render={({history}) => (
              <div style={parentCard}>
                {beers.map(beer => (
                  <div style={{width: "300px", margin: "20px" }}>
                    <Card
                      style={{ width: "320px" }}
                      key={beer._id}
                      actions={[]}
                      onClick={()=> {history.push(`beer/${beer._id}`)}}
                      cover={<div style={parent}><img width={80} height={216} alt="example" src={beer.image}/></div>}
                    >
                      <Meta
                        title={<Title beer={beer.name} rating={beer.rating}/>}
                        description={beer.brewer}
                      />
                    </Card>
                  </div>
                ))
                }
              </div>
            )

            }/>
        </div>
      </div>
      );
    else
      return (
        <div style={outside}>
          <div style={parent}>
            <div style={listStyle}>
              <Route render={({history}) => (
                <List
                  itemLayout="vertical"
                  size="large"
                  dataSource={beers}
                  renderItem={beer => (
                    <List.Item
                      key={beer._id}
                      style={listItemStyle}
                      actions={[]}
                      onClick={()=> {history.push(`beer/${beer._id}`)}}
                      extra={<img width={67} height={180} alt="logo" src={beer.image} />}
                    >
                      <List.Item.Meta
                        title={<Title beer={beer.name} rating={beer.rating}/>}
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
  fetchBeer: (search) => dispatch(fetchBeerListIfNeeded(search))
})

const mapStateToProps = (state) => ({
  beers: state.allBeers.beers,
  query: state.search.query
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeerList)
