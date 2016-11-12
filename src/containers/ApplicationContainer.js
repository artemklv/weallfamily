import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import ApplicationSelector from './ApplicationSelector';

const ApplicationContainer = (props) => {
  return (
    <div className="application-outer">
      <h1>This is a test page</h1>
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