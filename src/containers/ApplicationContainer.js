import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import ApplicationSelector from './ApplicationSelector';
import MenuModule from '../components/modules/MenuModule'
import ErrorModule from '../components/modules/ErrorModule'

const ApplicationContainer = (props) => {
  return (
    <div className="application-outer">
      <div className="header">
        <MenuModule menu={props.menu} />
      </div>
      <ErrorModule error={props.error} />
      <div className="content-outer">{props.children}</div>
    </div>
  );
};

ApplicationContainer.PropTypes = {
  menu: PropTypes.array.isRequired
};

export default connect(
  ApplicationSelector
)(ApplicationContainer);