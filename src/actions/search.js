export const UPDATE_SEARCH = 'UPDATE_SEARCH'
export const DELETE_SEARCH = 'DELETE_SEARCH'

//TODO figure out if we want to keep this
export const updateSearch = search => ({
  type: UPDATE_SEARCH,
  search: search
})

export const deleteSearch = () => ({
  type: DELETE_SEARCH,
})

