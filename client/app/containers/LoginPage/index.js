/**
 *
 * LoginPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row } from 'antd';

import history from 'utils/history';

import MasterHeaderBackground from 'components/MasterHeaderBackground';
import LoginCard from 'components/LoginCard';

import { makeSelectAuthData } from 'containers/App/selectors';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { loginStudentStart } from 'containers/App/actions';

import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { requestOtpStart } from './actions';

export function LoginPage(props) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const { isOtpSending, err } = props.loginPage;

  if (props.AuthData.isLoggedIn) {
    history.replace(
      props.AuthData.credentials.isRegistered ? '/' : '/register',
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', zIndex: '2' }}>
      <Helmet>
        <title>LoginPage</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <MasterHeaderBackground secondary />
      <Row justify="center" style={{ width: '100%' }}>
        <LoginCard
          requestOtp={props.requestOtp}
          isOtpSending={isOtpSending}
          otpError={err}
          loginStudent={props.loginStudent}
        />
      </Row>
    </div>
  );
}

LoginPage.propTypes = {
  loginPage: PropTypes.object.isRequired,
  requestOtp: PropTypes.func.isRequired,
  loginStudent: PropTypes.func.isRequired,
  AuthData: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
  AuthData: makeSelectAuthData(),
});

function mapDispatchToProps(dispatch) {
  return {
    requestOtp: email => dispatch(requestOtpStart(email)),
    loginStudent: (email, otp) => dispatch(loginStudentStart(email, otp)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
