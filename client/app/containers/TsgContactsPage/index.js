/**
 *
 * TsgContactsPage
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
import ContactsCard from 'components/ContactsCard';
import { Row } from 'antd';
import Spinner from 'components/Spinner';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTsgContactsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getContactsStart } from './actions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 50px;
  flex-wrap: wrap;

  .grid-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rem;
    // grid-column-gap: 60px;
    // grid-row-gap: 60px;
    margin-top: 50px;
    flex-wrap: wrap;

    div {
      width: 25%;
      min-width: 20rem;
    }
  }
`;

export function TsgContactsPage(props) {
  useInjectReducer({ key: 'tsgContactsPage', reducer });
  useInjectSaga({ key: 'tsgContactsPage', saga });

  const { contacts, isContactsLoading } = props.tsgContactsPage;

  useEffect(() => {
    props.getContacts();
  }, []);

  return (
    <div>
      <Helmet>
        <title>TsgContactsPage</title>
        <meta name="description" content="Description of TsgContactsPage" />
      </Helmet>
      <Container>
        <H1 size="32" lineheight="30px" marginbottom="60" gradienttext>
          TSG Office Bearers
        </H1>
        {isContactsLoading ? (
          <Row justify="center">
            <Spinner />
          </Row>
        ) : (
          <div className="grid-box">
            {contacts.map(obj => (
              <ContactsCard {...obj} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

TsgContactsPage.propTypes = {
  getContacts: PropTypes.func.isRequired,
  tsgContactsPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tsgContactsPage: makeSelectTsgContactsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getContacts: () => dispatch(getContactsStart()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TsgContactsPage);
