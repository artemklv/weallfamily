import 'babel-polyfill'
import api from './services/api'
import initUsers from './services/initUsers'
import { render } from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import Route from './Route';
import { Router, browserHistory } from 'react-router';
import store from './store/createStore'

// add data to fake server
api.init(initUsers);

render(
    <Provider store={store}>
      <Router history={browserHistory} children={Route} />
    </Provider>
  , document.getElementById('app')
)
