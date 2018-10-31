import { REQUEST_SELECTED_BEER, RECEIVE_SELECTED_BEER, NEW_BEER } from "../actions/selectedBeer";

export function selectedBeer(state = {loading: false, beer: null}, action) {
  switch (action.type) {
    case REQUEST_DELETE_BEER:
      return { loading: true, beer: beer.action };
    case REQUEST_DELETE_BEER:
      return { loading : false, beer: null };
    case DELETE_BEER_FAILURE:
      return { loading : false, beer : null }
    default:
      return state
}
}
