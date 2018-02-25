import { UPDATE_SEARCH,DELETE_SEARCH } from "../actions/search";

export function search(state = {search : null }, action) {
  switch (action.type) {
    case UPDATE_SEARCH:
      return { search : action.search };
    case DELETE_SEARCH:
      return { search : null };
    default:
      return state
}
}
