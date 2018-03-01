import axios from 'axios';

import { API_URL } from '../constants';

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

const fetchBeers = (search) => dispatch => {
  let params = {}
  if (search)
    params.search = search
  dispatch(requestBeerList())
  return axios.get(`${API_URL}/getBeers`, { params })
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

export const fetchBeerListIfNeeded = (search) => (dispatch, getState) => {
  if (shouldFetchBeers(getState())) {
    return dispatch(fetchBeers(search))
  }
}
