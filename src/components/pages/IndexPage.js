import React, { Component, PropTypes } from 'react';
import LoginForm from '../forms/LoginForm'

class IndexPage extends Component {

  static PropTypes = {
    login: PropTypes.func.isRequired
  }

  render() {
    const { login }  = this.props
    return (
      <div className="page-index">
        <LoginForm login={login} />
      </div>

    );
  }
}

export default IndexPage;