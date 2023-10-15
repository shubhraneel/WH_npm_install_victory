/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Layout } from 'antd';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Header from 'components/Header';
import Footer from 'components/Footer';
import SplashScreen from 'components/SplashScreen';

import Routes from 'Routes';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import { makeSelectAuthData } from './selectors';
import { loginStudentWithToken, logoutStudent } from './actions';

import GlobalStyle from '../../global-styles';
import 'antd/dist/antd.css';

export function App(props) {
  // initiate reducer and saga
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });

  // eslint-disable-next-line no-underscore-dangle
  const authToken = localStorage._UFT_;
  useEffect(() => {
    if (authToken) {
      props.loginStudentWithToken(authToken);
    }
  }, []);

  if (!props.AuthData.isLoggedIn && authToken) {
    return <SplashScreen />;
  }

  return (
    <Layout className="layout" style={{ backgroundColor: '#FFFFFB' }}>
      <Helmet defaultTitle="Website Hackathon">
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header AuthData={props.AuthData} logoutStudent={props.logoutStudent} />
      <Routes AuthData={props.AuthData} />
      <Footer />
      <GlobalStyle />
    </Layout>
  );
}

App.propTypes = {
  AuthData: PropTypes.object.isRequired,
  loginStudentWithToken: PropTypes.func.isRequired,
  logoutStudent: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  AuthData: makeSelectAuthData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loginStudentWithToken: token => dispatch(loginStudentWithToken(token)),
    logoutStudent: () => dispatch(logoutStudent()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
