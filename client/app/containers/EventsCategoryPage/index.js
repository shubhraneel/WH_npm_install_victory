/**
 *
 * EventsCategoryPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Row } from 'antd';

import EventCard from 'components/EventCard';
import H1 from 'components/H1';
import Spinner from 'components/Spinner';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectEventsCategoryPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getEventsStart } from './actions';

export function EventsCategoryPage(props) {
  useInjectReducer({ key: 'eventsCategoryPage', reducer });
  useInjectSaga({ key: 'eventsCategoryPage', saga });

  const categoryNameDict = {
    Technology: 'Technology',
    SocialAndCulture: 'Social and Cultural',
    SportsAndGames: 'Sports and Games',
    StudentWelfare: 'Student Welfare',
  };

  const { category } = props.match.params;
  const { events, isEventsLoading } = props.eventsCategoryPage;

  useEffect(() => {
    props.getEvents(category);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Events: {category}</title>
        <meta name="description" content="Description of EventsCategoryPage" />
      </Helmet>
      <H1 gradienttext margintop="50" marginbottom="50" textAlign="center">
        {categoryNameDict[category]} Events
      </H1>
      {isEventsLoading ? (
        <Row
          justify="center"
          style={{ width: '100%', paddingTop: '20vh', height: '100vh' }}
        >
          <Spinner size="26px" />
        </Row>
      ) : (
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
          {events.map(obj => (
            <EventCard {...obj} />
          ))}
        </div>
      )}
    </div>
  );
}

EventsCategoryPage.propTypes = {
  match: PropTypes.object.isRequired,
  getEvents: PropTypes.func.isRequired,
  eventsCategoryPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  eventsCategoryPage: makeSelectEventsCategoryPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEvents: category => dispatch(getEventsStart(category)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EventsCategoryPage);
