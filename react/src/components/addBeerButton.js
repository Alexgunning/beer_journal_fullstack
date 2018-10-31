import React from 'react'
import { Route } from 'react-router-dom'
import { Button } from 'antd';

const buttonStyle = {
  width: "15%",
  margin: "6px",
  textAlign: "center"
}

// const Beer = ({  createNewBeer, dispatch }) => (
const AddBeerButton = () => (
  <div  style={buttonStyle}>
 <Route render={({history}) => (
   <Button style={{background: "#40A9FF", color: "#FFFFFF"}} size="large" onClick={() => { history.push('/new') }}>
    Add Beer
   </Button>
  )} />
  </div>
)

export default AddBeerButton
