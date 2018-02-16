import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { allBeers } from "./beerList";
import { selectedBeer } from "./selectedBeer";

const reducer = combineReducers({
  allBeers,
  selectedBeer,
  form: formReducer
})

export default reducer;
