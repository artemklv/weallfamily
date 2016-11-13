import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'

/* PAGE COMPONENTS */
import ApplicationContainer from './containers/ApplicationContainer'
import IndexPageContainer from './containers/pages/IndexPageContainer'
import RegisterContainer from './containers/pages/RegisterContainer'
import ProfileContainer from './containers/pages/ProfileContainer'

export default (
  <Route path="/" component={ApplicationContainer} >
    <IndexRoute component={IndexPageContainer} />
    <Route path="/register" component={RegisterContainer} />
    <Route path="/profile" component={ProfileContainer} />
  </Route>
);