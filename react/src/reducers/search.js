import { UPDATE_SEARCH,DELETE_SEARCH } from "../actions/search";

export function search(state = {query : null }, action) {
  switch (action.type) {
    case UPDATE_SEARCH:
      return { query : action.search };
    case DELETE_SEARCH:
      return { query : null };
    default:
      return state
}
}
