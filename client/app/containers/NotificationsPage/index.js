/* eslint-disable indent */
/**
 *
 * NotificationsPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import H1 from 'components/H1';
import FundaeFinderRequestNotification from 'components/FundaeFinderRequestNotification';

import { makeSelectAuthData } from 'containers/App/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNotificationsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getNotificationsStart, resolveRequestStart } from './actions';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

export function NotificationsPage(props) {
  useInjectReducer({ key: 'notificationsPage', reducer });
  useInjectSaga({ key: 'notificationsPage', saga });

  useEffect(() => {
    if (props.AuthData.credentials) {
      props.getNotifications();
    }
  }, [props.AuthData.credentials]);

  const { notifications } = props.notificationsPage;

  return (
    <div>
      <Helmet>
        <title>NotificationsPage</title>
        <meta name="description" content="Description of NotificationsPage" />
      </Helmet>
      <Container>
        <H1 size="32" lineheight="30px" marginbottom="40" gradienttext>
          Notifications
        </H1>
        {notifications.fundaeFinderRequests &&
        notifications.fundaeFinderRequests.length ? (
          <FundaeFinderRequestNotification
            requests={notifications.fundaeFinderRequests}
            resolveRequest={props.resolveRequest}
          />
        ) : null}
      </Container>
    </div>
  );
}

NotificationsPage.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  AuthData: PropTypes.object.isRequired,
  notificationsPage: PropTypes.object.isRequired,
  resolveRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  notificationsPage: makeSelectNotificationsPage(),
  AuthData: makeSelectAuthData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getNotifications: () => dispatch(getNotificationsStart()),
    resolveRequest: (requestId, action) =>
      dispatch(resolveRequestStart(requestId, action)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NotificationsPage);
