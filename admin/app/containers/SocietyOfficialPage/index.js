/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/**
 *
 * SocietyOfficialPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import history from 'utils/history';

import { Row, Spin, Tabs } from 'antd';

import SocietyHeader from 'components/SocietyHeader';
import EventCard from 'components/EventCard';
import SocietyGallery from 'components/SocietyGallery';
import PrimaryButton from 'components/PrimaryButton';
import ContactsCard from 'components/ContactsCard';
import BillReimbursementDetails from 'components/BillReimbursementDetails';

import { makeSelectAuthData } from 'containers/App/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSocietyOfficialPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getSocietyStart, updateDescriptionStart } from './actions';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 15px;

  .ant-tabs-nav-list {
    width: 100% !important;
    justify-content: space-around !important;
  }
`;

const GridBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  grid-gap: 60px;
  margin-top: 20px;
`;

const { TabPane } = Tabs;

export function SocietyOfficialPage(props) {
  useInjectReducer({ key: 'societyOfficialPage', reducer });
  useInjectSaga({ key: 'societyOfficialPage', saga });

  useEffect(() => {
    props.getSociety(props.AuthData.credentials.roleMetadata.society);
  }, []);

  const { society } = props.societyOfficialPage;

  return (
    <div>
      <Helmet>
        <title>SocietyOfficialPage</title>
        <meta name="description" content="Description of SocietyOfficialPage" />
      </Helmet>
      {society._id ? (
        <Container>
          <SocietyHeader
            {...society}
            userRole={props.AuthData.credentials.role}
            updateDescription={props.updateDescription}
          />
          <Tabs style={{ marginTop: '40px', width: '100%' }}>
            <TabPane tab="Society Events" key="1">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '25px',
                }}
              >
                <PrimaryButton
                  type="primary"
                  width="300px"
                  height="35px"
                  onClick={() => history.push('/create-event')}
                >
                  Create new event
                </PrimaryButton>
                {society.events
                  ? society.events.map(event => (
                      <EventCard {...event} societyName={society.name} />
                    ))
                  : null}
              </div>
            </TabPane>
            <TabPane tab="Society Gallery" key="2">
              <Row style={{ width: '100%' }} justify="center">
                <PrimaryButton
                  type="primary"
                  width="300px"
                  height="35px"
                  onClick={() => history.push('/add-images')}
                >
                  Add more photos
                </PrimaryButton>
              </Row>
              <SocietyGallery gallery={society.gallery} />
            </TabPane>
            <TabPane tab="Society Officials" key="3">
              <Row style={{ width: '100%' }} justify="center">
                <PrimaryButton
                  type="primary"
                  width="300px"
                  height="35px"
                  onClick={() => history.push('/add-official')}
                >
                  Add Society Official
                </PrimaryButton>
              </Row>
              <GridBox>
                {society.contacts.map(obj => (
                  // eslint-disable-next-line no-underscore-dangle
                  <ContactsCard {...obj} key={obj._id} />
                ))}
              </GridBox>
            </TabPane>
            <TabPane tab="Bill Reimbursements" key="4">
              <Row style={{ width: '100%' }} justify="center">
                <PrimaryButton
                  type="primary"
                  width="350px"
                  height="35px"
                  marginbottom="20px"
                  onClick={() => history.push('/add-bill-reimbursement')}
                >
                  Add Bill Reimbursement Request
                </PrimaryButton>
              </Row>
              {society.billReimbursements.map(obj => (
                <BillReimbursementDetails {...obj} id={obj._id} />
              ))}
            </TabPane>
          </Tabs>
        </Container>
      ) : (
        <Row justify="center">
          <Spin size="large" />
        </Row>
      )}
    </div>
  );
}

SocietyOfficialPage.propTypes = {
  AuthData: PropTypes.object.isRequired,
  getSociety: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  societyOfficialPage: PropTypes.object.isRequired,
  updateDescription: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  societyOfficialPage: makeSelectSocietyOfficialPage(),
  AuthData: makeSelectAuthData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getSociety: id => dispatch(getSocietyStart(id)),
    updateDescription: description =>
      dispatch(updateDescriptionStart(description)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SocietyOfficialPage);
