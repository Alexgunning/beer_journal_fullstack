import React from 'react'
import BeerListContainer from '../containers/beerList'
import AddBeerButton from '../components/addBeerButton.js'

const Main = () => (
  <main>
   <AddBeerButton/>
   <BeerListContainer/>
  </main>
)

export default Main

