import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import IndexPage from '../../components/pages/IndexPage'
import IndexPageSelector from './IndexPageSelector';
import { sagaUserLogin } from '../../actions/sagaActions'

const IndexPageContainer = (props) => {
  return (
    <div className="application-outer">
      <IndexPage
        login={props.login}
      />
    </div>
  );
};

IndexPageContainer.PropTypes = {

};

function mapDispatchToProps(dispatch) {
  return {
    login: ({email, password}) => {
      dispatch(sagaUserLogin(email, password))
    }
  }
}


export default connect(
  IndexPageSelector,
  mapDispatchToProps
)(IndexPageContainer);