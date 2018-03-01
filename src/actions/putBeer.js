import axios from 'axios';

import { API_URL } from '../constants';

export const REQUEST_PUT_BEER = 'REQUEST_PUT_BEER'
export const RECEIVE_PUT_BEER = 'RECEIVE_PUT_BEER'

//TODO figure out if we want to keep this
export const receivePutBeerAction = json => ({
  type: RECEIVE_PUT_BEER,
  beer: json,
  receivedAt: Date.now()
})

export const requestPutBeer = () => ({
  type: REQUEST_PUT_BEER,
})

export const putBeer = beer => dispatch => {
  dispatch(requestPutBeer())
  beer.abv = parseFloat(beer.abv);
  beer.rating = parseFloat(beer.rating);
  return axios.put(`${API_URL}/beer`,beer)
    .then(res => { console.log("put", res);
       receivePutBeerAction(res.data);
    }
    ,err => console.log("Error Put:", err))
}
