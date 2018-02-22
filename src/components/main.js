import React from 'react'
import BeerListContainer from '../containers/beerList'
import SearchBar from '../containers/searchBar'
import AddBeerButton from '../components/addBeerButton.js'

const Main = () => (
  <main>
   <SearchBar/>
   <BeerListContainer/>
  </main>
)

export default Main

