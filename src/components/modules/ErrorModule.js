import React, { PropTypes } from 'react';

const ErrorModule = (props) => {
  if (!props.error) {
    return <div></div>;
  }
  return (
    <div className="error-message">{props.error}</div>
  )
}

ErrorModule.PropTypes = {
  error: PropTypes.string.isRequired
}

export default ErrorModule