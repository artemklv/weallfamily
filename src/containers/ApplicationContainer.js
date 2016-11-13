import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import ApplicationSelector from './ApplicationSelector';
import MenuModule from '../components/modules/MenuModule'

const ApplicationContainer = (props) => {
  return (
    <div className="application-outer">
      <div className="header">
        <MenuModule menu={props.menu} />
      </div>
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