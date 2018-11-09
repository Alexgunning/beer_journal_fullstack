import axios from 'axios';

import { API_URL } from '../constants';

export const REQUEST_DELETE_BEER = 'REQUEST_DELETE_BEER'
export const RECEIVE_DELETE_BEER = 'RECEIVE_DELETE_BEER'
export const DELETE_BEER_FAILURE = 'DELETE_BEER_FAILURE'

export const receiveDeleteBeerAction = (beer) => ({
  type: RECEIVE_DELETE_BEER,
  beer: beer
})

export const requestDeleteBeer = (beer) => ({
  type: REQUEST_DELETE_BEER,
  beer: beer
})

export const failureDeleteBeerAction = (beer) => ({
  type: DELETE_BEER_FAILURE,
  beer: beer
})

// export const deleteBeer = beer => dispatch => {
//   dispatch(requestDeleteBeer(beer))
//   return axios.delete(`${API_URL}/beer/${beer._id}`)
//     .then(() => {
//        receiveDeleteBeerAction(beer);
//     }
//     ,err => { failureDeleteBeerAction(beer) }j
// }

export const deleteBeer = beer => dispatch => {
  dispatch(requestDeleteBeer(beer))
  let headers = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` };
  return axios.delete(`${API_URL}/beer/${beer}`, {headers})
    .then(res => {
       receiveDeleteBeerAction(res.data);
    }
    ,err => console.log("Error Delete:", err))
}
