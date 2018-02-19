import React from 'react'
import { Route } from 'react-router-dom'
import { Button } from 'antd';

const buttonStyle = {
  width: "15%",
  margin: "6px",
  "text-align": "center",
}

// const Beer = ({  createNewBeer, dispatch }) => (
const AddBeerButton = () => (
  <div  style={buttonStyle}>
 <Route render={({history}) => (
   <Button style={{background: "#40A9FF"}} icon="plus"  onClick={() => { history.push('/new') }}/>
  )} />
  </div>
)

export default AddBeerButton
