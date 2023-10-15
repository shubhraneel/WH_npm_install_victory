/**
 *
 * SocietyPointPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Row } from 'antd';

import MasterHeaderBackground from 'components/MasterHeaderBackground';
import CommonHeader from 'components/CommonHeader';
import H1 from 'components/H1';
import EventCard from 'components/EventCard';
import Spinner from 'components/Spinner';

import SocietyPointIllustration from 'images/society-point-header.png';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSocietyPointPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getEventsStart } from './actions';

export function SocietyPointPage(props) {
  useInjectReducer({ key: 'societyPointPage', reducer });
  useInjectSaga({ key: 'societyPointPage', saga });

  const { events, isEventsLoading } = props.societyPointPage;

  useEffect(() => {
    props.getEvents();
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', zIndex: '2' }}>
      <Helmet>
        <title>SocietyPointPage</title>
        <meta name="description" content="Description of SocietyPointPage" />
      </Helmet>
      <MasterHeaderBackground secondary />
      <CommonHeader
        title="Society Events at IIT Kharagpur"
        description="Amet venenatis urna cursus eget. Sed euismod nisi porta lorem mollis
            aliquam ut porttitor. Neque laoreet suspendisse interdum consectetur
            libero. Tellus elementum sagittis vitae et leo duis ut. Vitae
            ultricies leo integer malesuada nunc vel risus commodo"
        imageSrc={SocietyPointIllustration}
      />
      <Row style={{ width: '100%', justifyContent: 'center' }}>
        <H1
          size="32"
          lineheight="30px"
          marginbottom="40"
          margintop="30"
          gradienttext
        >
          Events and Tournaments happening across KGP
        </H1>
      </Row>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: '30px',
          gap: '30px',
        }}
      >
        {isEventsLoading ? (
          <Spinner />
        ) : (
          events.map(obj => <EventCard {...obj} />)
        )}
      </div>
    </div>
  );
}

SocietyPointPage.propTypes = {
  getEvents: PropTypes.func.isRequired,
  societyPointPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  societyPointPage: makeSelectSocietyPointPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEvents: () => dispatch(getEventsStart()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SocietyPointPage);
