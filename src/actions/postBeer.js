import axios from 'axios';

export const REQUEST_POST_BEER = 'POST_BEER'
export const RECEIVE_POST_BEER = 'RECEIVE_POST_BEER'

//TODO figure out if we want to keep this
export const receivePostBeerAction = json => ({
  type: RECEIVE_POST_BEER,
  beer: json,
  receivedAt: Date.now()
})

export const requestPostBeer = () => ({
  type: REQUEST_POST_BEER,
})

export const postBeer = beer => dispatch => {
  console.log("POSTING BEER", beer);
  dispatch(requestPostBeer())
  beer.abv = parseFloat(beer.abv);
  beer.rating = parseFloat(beer.rating);
  beer.image = null;
  return axios.post('http://127.0.0.1:5000/addBeer',beer)
    .then(res => { console.log("post", res);
       receivePostBeerAction(res.data);
    }
    ,err => console.log("Error Post:", err))
}
