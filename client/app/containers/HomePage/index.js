/**
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import MasterHeaderBackground from 'components/MasterHeaderBackground';
import HomePageWelcome from 'components/HomePageWelcome';
import PageDescriptionHomePageList from 'components/PageDescriptionHomePageList';

import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function HomePage() {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  return (
    <div style={{ position: 'relative', minHeight: '100vh', zIndex: '2' }}>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      <MasterHeaderBackground />
      <HomePageWelcome />
      <PageDescriptionHomePageList />
    </div>
  );
}

HomePage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
