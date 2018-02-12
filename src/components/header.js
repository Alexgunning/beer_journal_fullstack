import React from 'react'
import TestForm from './testForm'
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
    // <TestForm beerId={"c8ee2a1a-3c7b-4bdb-9999-42f003d65853"}/>
const Header = () => (
  <div>
    <div>
      <div style={headerStyle}>
        Beer Journal
      </div>
      <div style={formStyle}>
      </div>
    </div>
  </div>
)
        // <TestForm beerId={"80695522-93aa-4729-97f7-b115a80f0998"} />
      // <div style={formStyle}>
      //   <BeerForm beerId={"c8ee2a1a-3c7b-4bdb-9999-42f003d65853"} />
      // </div>
      // <div style={formStyle}>
      //   <TestForm beerId={"c8ee2a1a-3c7b-4bdb-9999-42f003d65853"} />
      // </div>

export default Header
