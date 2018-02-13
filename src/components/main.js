import React from 'react'
import BeerListContainer from '../containers/beerList'
import Header from '../components/header'
import AddBeerButton from '../components/addBeerButton.js'

const Main = () => (
  <main>
   <Header/>
   <AddBeerButton/>
   <BeerListContainer/>
  </main>
)

export default Main

