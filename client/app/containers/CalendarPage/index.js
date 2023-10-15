/**
 *
 * CalendarPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import history from 'utils/history';

import Calendar from 'react-awesome-calendar';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCalendarPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getEventsStart } from './actions';

export function CalendarPage(props) {
  useInjectReducer({ key: 'calendarPage', reducer });
  useInjectSaga({ key: 'calendarPage', saga });

  useEffect(() => {
    props.getEvents();
  }, []);

  const { events } = props.calendarPage;

  const colors = ['#fd3153', '#1ccb9e', '#3694DF'];

  const formattedEvents = events.map(obj => ({
    title: obj.eventName,
    // eslint-disable-next-line no-underscore-dangle
    id: obj.slug,
    from: obj.timeline[0].time,
    to: obj.timeline[obj.timeline.length - 1].time,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  return (
    <div style={{ padding: '30px' }}>
      <Helmet>
        <title>CalendarPage</title>
        <meta name="description" content="Description of CalendarPage" />
      </Helmet>
      <Calendar
        events={formattedEvents}
        onClickEvent={e => history.push(`/events/event/${e}`)}
      />
    </div>
  );
}

CalendarPage.propTypes = {
  getEvents: PropTypes.func.isRequired,
  calendarPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  calendarPage: makeSelectCalendarPage(),
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
)(CalendarPage);
