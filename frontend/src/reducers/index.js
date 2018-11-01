import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { allBeers } from "./beerList";
import { selectedBeer } from "./selectedBeer";
import { search } from "./search";
import auth from "./auth"

const reducer = combineReducers({
  auth,
  allBeers,
  selectedBeer,
  search,
  form: formReducer
})

export default reducer;
