import axios from 'axios';

export const REQUEST_BEER_LIST = 'REQUEST_BEER_LIST'
export const RECEIVE_BEER_LIST = 'RECEIVE_BEER_LIST'
export const SELECT_BEER = 'SELECT_BEER'


export const requestBeerList = () => ({
  type: REQUEST_BEER_LIST
})

export const receiveBeerList = json => ({
  type: RECEIVE_BEER_LIST,
  beers: json,
  receivedAt: Date.now()
})


var config = {
  headers: {'Authorization': '0066950e9d98ae90b8d8b4706e3d0dbc537f85496ad081f0227d2bd79cfeada6'}
};

const fetchBeers = () => dispatch => {
  dispatch(requestBeerList())
  return axios.get('http://127.0.0.1:5000/getBeers', config)
    .then(res => dispatch(receiveBeerList(res.data)))
}

const shouldFetchBeers = (state) => {
  const beers = state.beers
  if (!beers) {
    return true
  }
  if (beers.isFetching) {
    return false
  }
  return true;
}

export const fetchBeerListIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchBeers(getState())) {
    return dispatch(fetchBeers())
  }
}
