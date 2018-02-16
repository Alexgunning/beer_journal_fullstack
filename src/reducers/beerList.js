import { RECEIVE_BEER_LIST, REQUEST_BEER_LIST } from "../actions/fetchBeerList";

const beers = (state = {
  isFetching: false,
  beers: []
}, action) => {
  switch (action.type) {
    case REQUEST_BEER_LIST:
      return {
        beers: [],
        isFetching: true,
      }
    case RECEIVE_BEER_LIST:
      return {
        isFetching: false,
        beers: action.beers,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export function allBeers(state = { isFetching: false, beers: [] }, action) {
  switch (action.type) {
    case RECEIVE_BEER_LIST:
    case REQUEST_BEER_LIST:
      return beers(state, action)
    default:
      return state
  }
}
