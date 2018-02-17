import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { allBeers } from "./beerList";
import { selectedBeer } from "./selectedBeer";
import auth from "./auth"

const reducer = combineReducers({
  auth,
  allBeers,
  selectedBeer,
  form: formReducer
})

export default reducer;
