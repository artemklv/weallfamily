import React, { PropTypes } from 'react'
import {connect} from 'react-redux'
import ApplicationSelector from './ApplicationSelector'
import MenuModule from '../components/modules/MenuModule'
import ErrorModule from '../components/modules/ErrorModule'
import UserModule from '../components/modules/UserModule'
import { sagaUserLogout } from '../actions/sagaActions'

const ApplicationContainer = ({menu, error, isAuth, logout, children}) => {
  return (
    <div className="application-outer">
      <div className="header">
        <MenuModule menu={menu} />
        <UserModule isAuth={isAuth} logout={logout} />
      </div>
      <ErrorModule error={error} />
      <div className="content-outer">{children}</div>
    </div>
  );
};

ApplicationContainer.PropTypes = {
  menu: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(sagaUserLogout())
    }
  }
}

export default connect(
  ApplicationSelector,
  mapDispatchToProps
)(ApplicationContainer);