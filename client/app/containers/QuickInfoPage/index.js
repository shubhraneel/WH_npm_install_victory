/**
 *
 * QuickInfoPage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import MasterHeaderBackground from 'components/MasterHeaderBackground';
import H1 from 'components/H1';
import P1 from 'components/P1';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import QuickInfoContent from 'components/QuickInfoContent';

import makeSelectQuickInfoPage from './selectors';
import reducer from './reducer';
import saga from './saga';

const QuickInfoPageHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 50vw;
  padding: 30px;
  margin-bottom: 85px;
  height: 75vh;
`;

export function QuickInfoPage() {
  useInjectReducer({ key: 'quickInfoPage', reducer });
  useInjectSaga({ key: 'quickInfoPage', saga });

  return (
    <div style={{ position: 'relative', minHeight: '100vh', zIndex: '2' }}>
      <Helmet>
        <title>QuickInfoPage</title>
        <meta name="description" content="Description of QuickInfoPage" />
      </Helmet>
      <MasterHeaderBackground secondary />
      <QuickInfoPageHeader>
        <H1 color="#fff" marginbottom="50px" size="40">
          Quick Info
        </H1>
        <P1 color="#fff">
          Amet venenatis urna cursus eget. Sed euismod nisi porta lorem mollis
          aliquam ut porttitor. Neque laoreet suspendisse interdum consectetur
          libero. Tellus elementum sagittis vitae et leo duis ut. Vitae
          ultricies leo integer malesuada nunc vel risus commodo.{' '}
        </P1>
      </QuickInfoPageHeader>
      <QuickInfoContent />
    </div>
  );
}

QuickInfoPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  quickInfoPage: makeSelectQuickInfoPage(),
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
)(QuickInfoPage);
