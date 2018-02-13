import React from 'react'
import BeerForm from './beerForm'

const headerStyle = {
  width: '30%',
  margin: '0 auto',
  'font-size': '4vw',
  'text-align': 'center'

}

const formStyle = {
  width: '10%',
  margin: '0 auto',
}
const Header = () => (
  <div>
    <div style={headerStyle}>
      Beer Journal
    </div>
  </div>
)
export default Header
