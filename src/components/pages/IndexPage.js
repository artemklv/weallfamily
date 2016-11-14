import React, { Component, PropTypes } from 'react';
import LoginForm from '../forms/LoginForm'

class IndexPage extends Component {

  static PropTypes = {
    login: PropTypes.func.isRequired
  }

  render() {
    let content
    const { login, fullName, isAuth }  = this.props
    if (isAuth) {
      content = <h1>{`Здравствуйте ${fullName}`}</h1>
    } else {
      content = <LoginForm login={login} />
    }
    return (
      <div className="page-index">
        {content}
      </div>

    );
  }
}

export default IndexPage;