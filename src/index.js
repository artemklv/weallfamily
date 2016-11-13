import 'babel-polyfill'
import api from './services/api'
import initUsers from './services/initUsers'
import { render } from 'react-dom'
import React from 'react'
import configureStore from './store/configureStore'
import rootSaga from './sagas'
import { Provider } from 'react-redux'
import Route from './Route';
import { Router, browserHistory } from 'react-router';

// add data to fake server
api.init(initUsers);

const store = configureStore({})
store.runSaga(rootSaga)

render(
    <Provider store={store}>
      <Router history={browserHistory} children={Route} />
    </Provider>
  , document.getElementById('app')
)
