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

let data = {
    _id: "alex",
    beer: 'Victory at Sea',
    brewer: 'Ballast Point',
    abv: '6.8',
    description : "sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morb", }

let data1 = {
    _id: "ball",
    beer: 'Sierra Nevada',
    brewer: 'Torpedo',
    abv: '7.6',
    description : "sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morb",
  }

let data2 = {
    _id: 'bfdalj',
    beer: 'Divided SKy',
    brewer: '4 Hands',
    abv: '9.6',
    description : "sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morb",
  }

function selectedBeer(state = data, action) {
  switch (action.type) {
    case REQUEST_SELECTED_BEER:
      return data1
    case NEW_BEER:
      //TODO figure out if we want to have the action set the id or the API
      return data2
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
