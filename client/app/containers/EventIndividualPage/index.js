/**
 *
 * EventIndividualPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Row } from 'antd';
import Spinner from 'components/Spinner';
import EventIndividual from 'components/EventIndividual';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectEventIndividualPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getEventStart } from './actions';

export function EventIndividualPage(props) {
  useInjectReducer({ key: 'eventIndividualPage', reducer });
  useInjectSaga({ key: 'eventIndividualPage', saga });

  const { slug } = props.match.params;

  const { event, isEventLoading } = props.eventIndividualPage;

  useEffect(() => {
    props.getEvent(slug);
  }, []);

  return (
    <div>
      <Helmet>
        <title>EventIndividualPage</title>
        <meta name="description" content="Description of EventIndividualPage" />
      </Helmet>
      {isEventLoading ? (
        <Row
          justify="center"
          style={{ width: '100%', height: '50vh', paddingTop: '10vh' }}
        >
          <Spinner />
        </Row>
      ) : (
        <EventIndividual {...event} />
      )}
    </div>
  );
}

EventIndividualPage.propTypes = {
  getEvent: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  eventIndividualPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  eventIndividualPage: makeSelectEventIndividualPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEvent: slug => dispatch(getEventStart(slug)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EventIndividualPage);
