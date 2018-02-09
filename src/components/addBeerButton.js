import React from 'react'
import { Route } from 'react-router-dom'
import { Button } from 'antd';

const buttonStyle = {
  width: "15%",
  margin: "auto",
  "text-align": "center"
}

// const Beer = ({  createNewBeer, dispatch }) => (
const AddBeerButton = () => (
  <div  style={buttonStyle}>
 <Route render={({ history}) => (
   <Button type='primary'
     onClick={() => { history.push('/new') }}
    >
      Add Beer
    </Button>
  )} />
  </div>
)

export default AddBeerButton
