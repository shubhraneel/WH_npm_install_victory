/* eslint-disable indent */
/**
 *
 * HallDetailsPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Tabs } from 'antd';

import SocietyHeader from 'components/SocietyHeader';
import EventCard from 'components/EventCard';
import SocietyGallery from 'components/SocietyGallery';
import ContactsCard from 'components/ContactsCard';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHallDetailsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getHallStart } from './actions';

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
  grid-gap: 30px;
  margin-top: 30px;
`;

const { TabPane } = Tabs;

export function HallDetailsPage(props) {
  useInjectReducer({ key: 'hallDetailsPage', reducer });
  useInjectSaga({ key: 'hallDetailsPage', saga });

  useEffect(() => {
    props.getHall(props.match.params.id);
  }, []);

  const { hall } = props.hallDetailsPage;

  return (
    <div
      style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}
    >
      <Helmet>
        <title>HallDetailsPage</title>
        <meta name="description" content="Description of HallDetailsPage" />
      </Helmet>
      <Container>
        <SocietyHeader {...hall} />
        <Tabs style={{ marginTop: '40px', width: '100%' }}>
          <TabPane tab="Hall Events" key="1">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '25px',
              }}
            >
              {hall.events
                ? hall.events.map(event => (
                    <EventCard {...event} societyName={hall.name} />
                  ))
                : null}
            </div>
          </TabPane>
          <TabPane tab="Hall Gallery" key="2">
            <SocietyGallery gallery={hall.gallery} />
          </TabPane>
          <TabPane tab="Hall Officials" key="3">
            <GridBox>
              {hall.contact
                ? hall.contacts.map(contact => <ContactsCard {...contact} />)
                : null}
            </GridBox>
          </TabPane>
        </Tabs>
      </Container>
    </div>
  );
}

HallDetailsPage.propTypes = {
  getHall: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  hallDetailsPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  hallDetailsPage: makeSelectHallDetailsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getHall: id => dispatch(getHallStart(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HallDetailsPage);
