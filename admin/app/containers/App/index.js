/* eslint-disable indent */
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
import { Layout, message } from 'antd';
import styled from 'styled-components';

import Routes from 'Routes';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { AuthProvider } from 'contexts';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import axios from 'axios';

import SideMenu from 'components/SideMenu';
import Footer from 'components/Footer';
import Header from 'components/Header';
import SplashScreen from 'components/SplashScreen';

import GlobalStyle from '../../global-styles';
import 'antd/dist/antd.css';

import { makeSelectAuthData } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { logout, loginWithToken } from './actions';

const GlobalContainer = styled.div`
  position: relative;
`;

function App(props) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });

  axios.interceptors.response.use(
    undefined,
    async function axiosRetryInterceptor(err) {
      message.error(
        err.response.data.message
          ? err.response.data.message
          : 'Something went wrong!',
      );
      return Promise.reject(err);
    },
  );

  // eslint-disable-next-line no-underscore-dangle
  const authToken = localStorage._UFT_;
  useEffect(() => {
    if (authToken) {
      props.loginWithToken(authToken);
    }
  }, []);

  if (!props.AuthData.isLoggedIn && authToken) {
    return <SplashScreen />;
  }

  return (
    <AuthProvider value={props.AuthData.credentials}>
      <Layout className="layout" style={{ backgroundColor: '#FFFFFB' }}>
        <Helmet defaultTitle="Website Hackathon">
          <meta
            name="description"
            content="A React.js Boilerplate application"
          />
        </Helmet>
        <GlobalContainer>
          <Header logout={props.logout} AuthData={props.AuthData} />
          {props.AuthData.isLoggedIn &&
          ['admin', 'tsgOfficials'].includes(
            props.AuthData.credentials.role,
          ) ? (
            <SideMenu />
          ) : null}

          <div
            style={{
              width: '100%',
              paddingLeft:
                props.AuthData.isLoggedIn &&
                ['admin', 'tsgOfficials'].includes(
                  props.AuthData.credentials.role,
                )
                  ? '256px'
                  : '0px',
              paddingTop: '80px',
              background: '#e6e6e6',
            }}
          >
            <div style={{ padding: '20px' }}>
              <Routes AuthData={props.AuthData} />
            </div>
            <Footer />
          </div>
        </GlobalContainer>

        <GlobalStyle />
      </Layout>
    </AuthProvider>
  );
}

App.propTypes = {
  AuthData: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  loginWithToken: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  AuthData: makeSelectAuthData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    loginWithToken: token => dispatch(loginWithToken(token)),
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
