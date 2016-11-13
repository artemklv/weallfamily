import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import IndexPageSelector from './IndexPageSelector';

const IndexPageContainer = (props) => {
  return (
    <div className="application-outer">
      <h1>It's a Index Page!!!</h1>
    </div>
  );
};

IndexPageContainer.PropTypes = {

};

function mapDispatchToProps(dispatch) {
  return {
  }
}


export default connect(
  IndexPageSelector,
  mapDispatchToProps
)(IndexPageContainer);