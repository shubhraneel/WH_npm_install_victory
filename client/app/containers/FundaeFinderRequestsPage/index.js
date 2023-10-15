/* eslint-disable no-underscore-dangle */
/**
 *
 * FundaeFinderRequestsPage
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
import FundaeFinderResultCard from 'components/FundaeFinderResultCard';

import { makeSelectAuthData } from 'containers/App/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFundaeFinderRequestsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getRequestsStart } from './actions';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;

  .grid-box {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    grid-column-gap: 60px;
    grid-row-gap: 60px;
    margin-top: 30px;
  }
`;

export function FundaeFinderRequestsPage(props) {
  useInjectReducer({ key: 'fundaeFinderRequestsPage', reducer });
  useInjectSaga({ key: 'fundaeFinderRequestsPage', saga });

  useEffect(() => {
    if (props.AuthData.credentials) {
      props.getRequests();
    }
  }, [props.AuthData.credentials]);

  const { requests } = props.fundaeFinderRequestsPage;
  const requestMap = {};
  requests.forEach(obj => {
    requestMap[
      typeof obj.requestedTo === 'string'
        ? obj.requestedTo
        : obj.requestedTo._id
    ] = {
      status: obj.status,
      data: obj.status === 'accepted' ? obj.requestedTo : undefined,
    };
  });

  return (
    <div>
      <Helmet>
        <title>FundaeFinderRequestsPage</title>
        <meta
          name="description"
          content="Description of FundaeFinderRequestsPage"
        />
      </Helmet>
      <Container>
        <H1 size="32" lineheight="30px" gradienttext>
          Your Fundae Finder Requests
        </H1>
        <div className="grid-box">
          {requests.map(request => (
            <FundaeFinderResultCard
              {...request.requestedTo}
              objectID={request.requestedTo._id}
              key={request._id}
              requestMap={requestMap}
              requests={requests}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

FundaeFinderRequestsPage.propTypes = {
  getRequests: PropTypes.func.isRequired,
  AuthData: PropTypes.object.isRequired,
  fundaeFinderRequestsPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fundaeFinderRequestsPage: makeSelectFundaeFinderRequestsPage(),
  AuthData: makeSelectAuthData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRequests: () => dispatch(getRequestsStart()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FundaeFinderRequestsPage);
