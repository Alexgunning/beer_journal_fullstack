import { REQUEST_SELECTED_BEER, RECEIVE_SELECTED_BEER, NEW_BEER } from "../actions/selectedBeer";

export function selectedBeer(state = {loading : false, beer : {}}, action) {
  switch (action.type) {
    case REQUEST_SELECTED_BEER:
      return {loading : true, beer : {}};
    case NEW_BEER:
      return {loading : false, beer : {}};
    case RECEIVE_SELECTED_BEER:
      return {
        loading : false,
        beer : action.beer
      }
    default:
      return state
}
}
