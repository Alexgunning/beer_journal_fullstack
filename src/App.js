import React, { Component } from 'react'
import thunk from 'redux-thunk'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'

import Button from 'antd/lib/button';
import './App.css';

import reducer from './reducers'
import Main from './components/main'
import BeerFormContainer from './containers/beerForm'
import LoginForm from './components/loginForm'

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
              <Route exact path="/login" component={LoginForm}/>
              <Route exact path="/new" component={BeerFormContainer}/>
              <Route exact path="/beer/:id" component={BeerFormContainer}/>
            </div>
          </BrowserRouter>
      </Provider>
    )
  }
}

export default App
