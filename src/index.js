import 'babel-polyfill'
import { render } from 'react-dom'
import React from 'react'
import configureStore from './store/configureStore'
import rootSaga from './sagas'
import { Provider } from 'react-redux'
import ApplicationContainer from './containers/ApplicationContainer'

const store = configureStore({})
store.runSaga(rootSaga)

render(
    <Provider store={store}>
        <ApplicationContainer />
    </Provider>
  , document.getElementById('app')
)
