const uuidv4 = require('uuid/v4');

export const addBeerToList = (beer) => ({
  type: "ADD_BEER",
  id: uuidv4(),
  beer
})
