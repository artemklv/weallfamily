import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import ApplicationSelector from './ApplicationSelector';

const ApplicationContainer = (props) => {
  return (
    <div className="application-outer">
      <div className="content-outer">{props.children}</div>
    </div>
  );
};

ApplicationContainer.PropTypes = {

};

function mapDispatchToProps(dispatch) {
  return {
  }
}


export default connect(
  ApplicationSelector,
  mapDispatchToProps
)(ApplicationContainer);