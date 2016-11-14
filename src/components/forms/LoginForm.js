import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form'

class LoginForm extends Component {

  _handleFormSubmit(values) {
    this.props.login(values)
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this._handleFormSubmit.bind(this))}>
        <div className="form-line">
          <label className="form-label">Email:</label>
          <Field name="email" component="input" type="text"/>
        </div>
        <div className="form-line">
          <label className="form-label">Пароль:</label>
          <Field name="password" component="input" type="password"/>
        </div>
        <div className="form-line">
          <button type="submit">Войти</button>
          <button type="button">Зарегистрироваться</button>
        </div>
      </form>
    )
  }
}

LoginForm.PropTypes = {
  login: PropTypes.func.isRequired
}

export default  reduxForm({
  form: 'login',
})(LoginForm);