import axios from 'axios';

export const POST_BEER = 'POST_BEER'
export const RECEIVE_POST_BEER = 'RECEIVE_POST_BEER'


export const postBeerAction = () => ({
  type: POST_BEER
})

//TODO figure out if we want to keep this
export const receivePostBeerAction = json => ({
  type: RECEIVE_POST_BEER,
  beer: json,
  receivedAt: Date.now()
})

export const postBeer = beer => dispatch => {
  console.log("POSTING BEER", beer);
  dispatch(postBeerAction())
  beer.abv = parseFloat(beer.abv);
  beer.img = null;
  return axios.post('http://127.0.0.1:5000/addBeer',beer)
    .then(res => console.log("post", res))
}
