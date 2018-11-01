import React from 'react'
import BeerListContainer from '../containers/beerList'
import SearchBar from '../containers/searchBar'

const Main = (props) => (
  <main>
   <SearchBar {...props}/>
   <BeerListContainer {...props}/>
  </main>
)

export default Main

