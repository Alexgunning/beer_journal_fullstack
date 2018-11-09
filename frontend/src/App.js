import React, { Component } from 'react'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'

import reducer from './reducers'
import Main from './components/main'
import BeerFormContainer from './containers/beerForm'
import LoginForm from './containers/loginForm'
import {requireAuthentication} from './components/authenticatedComponent.js'
import {requireNoAuthentication} from './components/notAuthenticatedComponent.js'

//TODO: MOVE TO BETTER PLACE
import Auth from './auth/auth';
import Callback from './components/callback';
const auth = new Auth();

const handleAuthentication = (props) => {
  let { location, history } = props;
  console.log('here be da props');
  console.log(props);
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication(history);
  }
}

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
              <Route exact path="/login" component={requireNoAuthentication(LoginForm)}/>
              <Route exact path="/" component={requireAuthentication(Main)}/>
              <Route exact path="/new" component={requireAuthentication(BeerFormContainer)}/>
              <Route exact path="/beer/:id" component={requireAuthentication(BeerFormContainer)}/>
              <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} />
              }}/>
            <Route path="/balls" render={() => { return (<div>balls</div>)}} />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
