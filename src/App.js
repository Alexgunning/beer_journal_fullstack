import React, { Component } from 'react'
import thunk from 'redux-thunk'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'

//TODO DELETE
import TestForm from './components/testForm'


import Button from 'antd/lib/button';
import './App.css';

import reducer from './reducers'
import Main from './components/main'
import AddBeer from './containers/addBeer'
import InitializeForm from './components/initializeForm'

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <BrowserRouter>
            <div>
              <Route exact path="/" component={Main}/>
              <Route exact path="/new" component={InitializeForm}/>
              <Route exact path="/beer/:id" component={InitializeForm}/>
            </div>
          </BrowserRouter>
      </Provider>
    )
  }
}

export default App
