import axios from 'axios';

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
  console.log("PUTING BEER", beer);
  dispatch(requestPutBeer())
  beer.abv = parseFloat(beer.abv);
  beer.rating = parseFloat(beer.rating);
  beer.image = null;
  return axios.put('http://127.0.0.1:5000/putBeer',beer)
    .then(res => { console.log("put", res);
       receivePutBeerAction(res.data);
    }
    ,err => console.log("Error Put:", err))
}
