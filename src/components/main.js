import React from 'react'
import BeerListContainer from '../containers/beerList'
import AddBeer from '../containers/addBeer'
import Header from '../components/header'
import AddBeerButton from '../components/addBeerButton.js'
// import AddBeerContainer from '../containers/addBeer'

 // <BeerListContainer/>
 // <AddBeer/>
   // <Test/>
const Main = () => (
  <main>
   <Header/>
   <AddBeerButton/>
   <BeerListContainer/>
  </main>
)

export default Main

