/**
 *
 * FeedbackPage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import MasterHeaderBackground from 'components/MasterHeaderBackground';
import FeedbackForm from 'components/FeedbackForm';
import CommonHeader from 'components/CommonHeader';

import FeedbackIllustration from 'images/feedback-page-header.png';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFeedbackPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function FeedbackPage() {
  useInjectReducer({ key: 'feedbackPage', reducer });
  useInjectSaga({ key: 'feedbackPage', saga });

  return (
    <div style={{ position: 'relative', minHeight: '100vh', zIndex: '2' }}>
      <Helmet>
        <title>FeedbackPage</title>
        <meta name="description" content="Description of FeedbackPage" />
      </Helmet>
      <MasterHeaderBackground secondary />
      <CommonHeader
        title="Feedback Page"
        description="Amet venenatis urna cursus eget. Sed euismod nisi porta lorem mollis
            aliquam ut porttitor. Neque laoreet suspendisse interdum consectetur
            libero. Tellus elementum sagittis vitae et leo duis ut. Vitae
            ultricies leo integer malesuada nunc vel risus commodo"
        imageSrc={FeedbackIllustration}
      />
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <FeedbackForm />
      </div>
    </div>
  );
}

FeedbackPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  feedbackPage: makeSelectFeedbackPage(),
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
)(FeedbackPage);
