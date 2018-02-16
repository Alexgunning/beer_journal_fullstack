import axios from 'axios';

export const REQUEST_SELECTED_BEER = 'REQUEST_SELECTED_BEER'
export const RECEIVE_SELECTED_BEER = 'RECEIVE_SELECTED_BEER'
export const SELECT_BEER = 'SELECT_BEER'
export const INVALIDATE_BEER = 'INVALIDATE_BEER'
export const NEW_BEER = 'NEW_BEER'

export const selectBeer = beerId => ({ type: SELECT_BEER,
  beerId
})

export const invalidateBeer = () => ({
  type: INVALIDATE_BEER
})

export const newBeer = () => ({
  type: NEW_BEER
})

export const requestBeer = beerId => ({
  type: REQUEST_SELECTED_BEER,
  beerId
})

export const receiveBeer = (json) => ({
  type: RECEIVE_SELECTED_BEER,
  beer: json,
  receivedAt: Date.now()
})

var config = {
  headers: {'Authorization': '0066950e9d98ae90b8d8b4706e3d0dbc537f85496ad081f0227d2bd79cfeada6'}
};

const fetchBeer = beerId => dispatch => {
  dispatch(requestBeer(beerId))
  return axios.get(`http://127.0.0.1:5000/getBeerById/${beerId}`, config)
    .then(res => dispatch(receiveBeer(res.data)), err => console.log("ERR", err))
}

const shouldFetchBeer = (state, beer) => {
//   const beer = state.beerByBeer[beer]
//   if (!beer) {
//     return true
//   }
//   if (beer.isFetching) {
//     return false
//   }
//   return beer.didInvalidate
return true;
}

export const fetchBeerIfNeeded = beerId => (dispatch, getState) => {
  if (shouldFetchBeer(getState(), beerId)) {
    return dispatch(fetchBeer(beerId))
  }
}
