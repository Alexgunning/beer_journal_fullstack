import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { RECEIVE_BEER_LIST, REQUEST_BEER_LIST } from "../actions/fetchBeerList";
import { REQUEST_SELECTED_BEER, RECEIVE_SELECTED_BEER, NEW_BEER } from "../actions/selectedBeer";
import beer from "../components/beer";
import beerList from "../containers/beerList";

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

function allBeers(state = { isFetching: false, beers: [] }, action) {
  switch (action.type) {
    case RECEIVE_BEER_LIST:
    case REQUEST_BEER_LIST:
      return beers(state, action)
    default:
      return state
  }
}

function selectedBeer(state = { _id: null, name: "", brewer: "", abv: "" }, action) {
  switch (action.type) {
    case REQUEST_SELECTED_BEER:
      return {
         _id: null, name: "", brewer: "", abv: ""
      }
    case NEW_BEER:
      console.log("NEW_BEER_REDUCER");
      //TODO figure out if we want to have the action set the id or the API
      return {
         _id: null, name: "", brewer: "", abv: ""
    }
    case RECEIVE_SELECTED_BEER:
      return action.beer
    default:
      return state
}
}

const reducer = combineReducers({
  allBeers,
  selectedBeer,
  form: formReducer

})

export default reducer;
