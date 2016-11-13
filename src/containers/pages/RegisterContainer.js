import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import RegisterSelector from './RegisterSelector';

const RegisterContainer = (props) => {
  return (
    <div className="application-outer">
      <div className="content-outer">{props.children}</div>
    </div>
  );
};

RegisterContainer.PropTypes = {

};

function mapDispatchToProps(dispatch) {
  return {
  }
}


export default connect(
  RegisterSelector,
  mapDispatchToProps
)(RegisterContainer);