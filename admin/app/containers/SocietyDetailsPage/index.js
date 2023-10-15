/* eslint-disable indent */
/**
 *
 * SocietyDetailsPage
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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSocietyDetailsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getSocietyStart } from './actions';

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

const { TabPane } = Tabs;

export function SocietyDetailsPage(props) {
  useInjectReducer({ key: 'societyDetailsPage', reducer });
  useInjectSaga({ key: 'societyDetailsPage', saga });

  useEffect(() => {
    props.getSociety(props.match.params.id);
  }, []);

  const { society } = props.societyDetailsPage;

  return (
    <div
      style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}
    >
      <Helmet>
        <title>SocietyDetailsPage</title>
        <meta name="description" content="Description of SocietyDetailsPage" />
      </Helmet>
      <Container>
        <SocietyHeader {...society} />
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
              {society.events
                ? society.events.map(event => (
                    <EventCard {...event} societyName={society.name} />
                  ))
                : null}
            </div>
          </TabPane>
          <TabPane tab="Society Gallery" key="2">
            <SocietyGallery gallery={society.gallery} />
          </TabPane>
          <TabPane tab="Society Officials" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Container>
    </div>
  );
}

SocietyDetailsPage.propTypes = {
  getSociety: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  societyDetailsPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  societyDetailsPage: makeSelectSocietyDetailsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getSociety: id => dispatch(getSocietyStart(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SocietyDetailsPage);
