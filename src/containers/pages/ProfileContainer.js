import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import ProfileSelector from './ProfileSelector';

const ProfileContainer = (props) => {
  return (
    <div className="application-outer">
      <h1>This is a profile page!!!</h1>
    </div>
  );
};

ProfileContainer.PropTypes = {

};

function mapDispatchToProps(dispatch) {
  return {
  }
}


export default connect(
  ProfileSelector,
  mapDispatchToProps
)(ProfileContainer);