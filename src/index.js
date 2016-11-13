import 'babel-polyfill'
import api from './services/api'
import initUsers from './services/initUsers'
import { render } from 'react-dom'
import React from 'react'
import configureStore from './store/configureStore'
import rootSaga from './sagas'
import { Provider } from 'react-redux'
import ApplicationContainer from './containers/ApplicationContainer'

// add data to fake server
api.init(initUsers);

const store = configureStore({})
store.runSaga(rootSaga)

render(
    <Provider store={store}>
        <ApplicationContainer />
    </Provider>
  , document.getElementById('app')
)
