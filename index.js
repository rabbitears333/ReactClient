import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import Feature from './components/feature';
import RequireAuth from './components/require_auth';
import Welcome from './components/welcome';
import {AUTH_USER} from './actions/type';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
if (token) {
    store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
      <Router history ={browserHistory}>
        <Route path="/" component = {App}></Route>
          <IndexRoute component={Welcome} />
          <Route path="signin" component= {Signin} />
          <Route path="signout" component= {Signout} />
          <Route path="signup" component= {Signup} />
          <Route path="feature" component={RequireAuth(Feature)} />

      </Router>
  </Provider>
  , document.querySelector('.container'));
