/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unescaped-entities */
/**
 *
 * FundaeFinderPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Link } from 'react-router-dom';

import algoliaClient from 'config/algolia';

import H1 from 'components/H1';
import P1 from 'components/P1';
import SearchBox from 'components/SearchBox';
import PrimaryButton from 'components/PrimaryButton';
import FundaeFinderResultCard from 'components/FundaeFinderResultCard';

import { makeSelectAuthData } from 'containers/App/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFundaeFinderPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { createRequestStart, getRequestsStart } from './actions';

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
    margin-top: 50px;
  }
`;

export function FundaeFinderPage(props) {
  useInjectReducer({ key: 'fundaeFinderPage', reducer });
  useInjectSaga({ key: 'fundaeFinderPage', saga });

  const [algoliaIndex, setAlgoliaIndex] = useState(undefined);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (props.AuthData.credentials) {
      props.getRequests();
    }
  }, [props.AuthData.credentials]);

  useEffect(() => {
    const algolia = algoliaClient.initIndex('students');
    setAlgoliaIndex(algolia);
  }, []);

  useEffect(() => {
    if (query.length >= 2 && algoliaIndex) {
      algoliaIndex.search(query).then(({ hits }) => {
        setResults(hits);
      });
    }
  }, [query, algoliaIndex]);

  const { requests } = props.fundaeFinderPage;
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
        <title>FundaeFinderPage</title>
        <meta name="description" content="Description of FundaeFinderPage" />
      </Helmet>
      <Container>
        <H1 size="32" lineheight="30px" marginbottom="60" gradienttext>
          Fundae Finder
        </H1>
        <P1 size="16" textAlign="center" color="#281AC8">
          Your one stop solution to finding all the fundae you will need in your
          college life. We don't provide the fundae (we are not MetaKGP (wink!
          wink!)), but we sure can help you connect with seniors or professors
          who would be ready to help you out. Just search anything you need to
          know about, your field of interest or the name of the senior you would
          like to talk to, and then request the contacts of any person you wish
          from the results.
        </P1>
        <P1 margintop="10" size="16" textAlign="center" color="#281AC8">
          Request the person for his/her contact details, wait till he/she
          accepts the request, and then feel free to contact the person.
        </P1>
        <P1 margintop="15">
          ***This feature is seriously not for requesting contact details from
          your crush. Be serious, look only for fundaes!!!***.
        </P1>
        <Link to="/fundae-finder/requests">
          <PrimaryButton plainbg width="200px" height="35px" margintop="20px">
            View All Requests
          </PrimaryButton>
        </Link>
        <div style={{ width: '70%', marginTop: '25px' }}>
          <SearchBox query={query} setQuery={setQuery} />
        </div>
        <div className="grid-box">
          {results.map(result => (
            <FundaeFinderResultCard
              {...result}
              key={result.objectID}
              createRequest={props.createRequest}
              requestMap={requestMap}
              requests={requests}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

FundaeFinderPage.propTypes = {
  createRequest: PropTypes.func.isRequired,
  getRequests: PropTypes.func.isRequired,
  AuthData: PropTypes.object.isRequired,
  fundaeFinderPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fundaeFinderPage: makeSelectFundaeFinderPage(),
  AuthData: makeSelectAuthData(),
});

function mapDispatchToProps(dispatch) {
  return {
    createRequest: requestedTo => dispatch(createRequestStart(requestedTo)),
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
)(FundaeFinderPage);
