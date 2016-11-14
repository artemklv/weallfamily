import React, { PropTypes } from 'react';

const UserModule = ({isAuth, logout}) => {
  if (!isAuth) {
    return <div></div>;
  }
  return (
    <div className="module-logout">{isAuth ? <button onClick={logout}>Выйти</button> : ''}</div>
  )
}

UserModule.PropTypes = {
  logout: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
}

export default UserModule