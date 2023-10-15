/**
 *
 * RegisterPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import MasterHeaderBackground from 'components/MasterHeaderBackground';
import RegisterCard from 'components/RegisterCard';

import { makeSelectAuthData } from 'containers/App/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRegisterPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { uploadAchievementAsync } from './actions';

export function RegisterPage(props) {
  useInjectReducer({ key: 'registerPage', reducer });
  useInjectSaga({ key: 'registerPage', saga });

  return (
    <div style={{ position: 'relative', minHeight: '100vh', zIndex: '2' }}>
      <Helmet>
        <title>RegisterPage</title>
        <meta name="description" content="Description of RegisterPage" />
      </Helmet>
      <MasterHeaderBackground secondary />
      {props.AuthData.credentials ? (
        <RegisterCard
          registerStudent={props.registerStudent}
          AuthData={props.AuthData}
        />
      ) : null}
    </div>
  );
}

RegisterPage.propTypes = {
  AuthData: PropTypes.object.isRequired,
  registerStudent: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  registerPage: makeSelectRegisterPage(),
  AuthData: makeSelectAuthData(),
});

function mapDispatchToProps(dispatch) {
  return {
    registerStudent: (data, coverImageChanged) =>
      dispatch(uploadAchievementAsync(data, coverImageChanged)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RegisterPage);
