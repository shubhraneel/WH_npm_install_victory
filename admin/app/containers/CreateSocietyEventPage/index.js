/**
 *
 * CreateSocietyEventPage
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Input, Row, DatePicker, Spin } from 'antd';
import { NotificationTwoTone, EditOutlined } from '@ant-design/icons';

import P1 from 'components/P1';
import PrimaryButton from 'components/PrimaryButton';
import EventTimeline from 'components/EventTimeline';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCreateSocietyEventPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { createEventAsync } from './actions';

const { TextArea } = Input;

const Container = styled.div`
  width: 80%;
  margin: 2rem auto;
  border-radius: 2rem;
  box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  background: #fff;

  .register {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
  }
`;

const PosterBox = styled.div`
  width: 400px;
  height: 400px;
  background: #74b9ff;
  position: relative;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .edit-icon {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background: #fff;
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .anticon {
      font-size: 24px !important;
    }
  }
`;

export function CreateSocietyEventPage(props) {
  useInjectReducer({ key: 'createSocietyEventPage', reducer });
  useInjectSaga({ key: 'createSocietyEventPage', saga });

  const [coverImage, setCoverImage] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [intro, setIntro] = useState(undefined);
  const [procedure, setProcedure] = useState(undefined);
  const [judgingCriteria, setJudgingCriteria] = useState(undefined);
  const [eventDate, setEventDate] = useState(undefined);
  const [timeline, setTimeline] = useState([]);
  const [platform, setPlatform] = useState(undefined);
  const [registrationLink, setRegistrationLink] = useState(undefined);

  const handleSubmit = () => {
    props.createEventAsync({
      eventDate,
      coverImage,
      registrationLink,
      platform,
      eventName: name,
      isTSGEvent: false,
      timeline,
      judgingCriteria,
      procedure,
      introduction: intro,
    });
  };

  const { isCreating } = props.createSocietyEventPage;

  return (
    <div>
      <Helmet>
        <title>CreateSocietyEventPage</title>
        <meta
          name="description"
          content="Description of CreateSocietyEventPage"
        />
      </Helmet>
      <Container>
        <Row style={{ width: '100%' }} justify="center">
          <P1
            FontWeight="bold"
            margintop="20"
            size="18"
            marginbottom="15"
            color="#1890ff"
          >
            Event Name
          </P1>
        </Row>
        <Row style={{ width: '100%' }} justify="center">
          <Input
            size="large"
            placeholder="Set Event Name"
            prefix={<NotificationTwoTone />}
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: 400 }}
          />
        </Row>
        <Row style={{ width: '100%' }} justify="center">
          <P1
            FontWeight="bold"
            margintop="30"
            size="18"
            marginbottom="15"
            color="#1890ff"
          >
            Event Poster
          </P1>
        </Row>
        <Row style={{ width: '100%' }} justify="center">
          <PosterBox>
            {coverImage ? (
              <img
                src={URL.createObjectURL(coverImage)}
                alt="Profile Display"
              />
            ) : null}
            <div
              aria-hidden="true"
              className="edit-icon"
              onClick={() => document.getElementById('event-poster').click()}
            >
              <EditOutlined />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="event-poster"
                onChange={e => setCoverImage(e.target.files[0])}
              />
            </div>
          </PosterBox>
        </Row>
        <P1
          FontWeight="bold"
          margintop="40"
          marginbottom="15"
          size="18"
          color="#1890ff"
        >
          Introduction
        </P1>
        <TextArea
          showCount
          maxLength={2000}
          onChange={e => setIntro(e.target.value)}
          value={intro}
          rows={8}
          autoSize={{ maxRows: 8, minRows: 8 }}
          placeholder="Introduction"
        />
        <P1
          FontWeight="bold"
          margintop="20"
          size="18"
          marginbottom="15"
          color="#1890ff"
        >
          Procedure
        </P1>
        <TextArea
          showCount
          maxLength={2000}
          onChange={e => setProcedure(e.target.value)}
          value={procedure}
          rows={8}
          autoSize={{ maxRows: 8, minRows: 8 }}
          placeholder="Procedure"
        />
        <P1
          FontWeight="bold"
          margintop="20"
          size="18"
          marginbottom="15"
          color="#1890ff"
        >
          Judging Criteria
        </P1>
        <TextArea
          showCount
          maxLength={2000}
          onChange={e => setJudgingCriteria(e.target.value)}
          value={judgingCriteria}
          rows={8}
          autoSize={{ maxRows: 8, minRows: 8 }}
          placeholder="Judgin Criteria"
        />
        <P1
          FontWeight="bold"
          margintop="20"
          size="18"
          marginbottom="15"
          color="#1890ff"
        >
          Event Start Date
        </P1>
        <DatePicker
          style={{ width: 500 }}
          onChange={date => {
            setEventDate(date);
            setTimeline([
              ...timeline,
              {
                time: date,
                description: 'Event Start',
              },
            ]);
          }}
          value={eventDate}
          size="large"
        />
        <Row style={{ width: '100%' }} justify="center">
          <PrimaryButton
            type="primary"
            width="300px"
            height="40px"
            margintop="50px"
            marginbottom="40px"
          >
            Event Timeline
          </PrimaryButton>
        </Row>
        {timeline.length ? (
          <EventTimeline timeline={timeline} setTimeline={setTimeline} />
        ) : null}
        <div className="register">
          <div>
            <P1 FontWeight="bold" marginbottom="10" color="#1890ff">
              Platform
            </P1>
            <Input
              placeholder="Enter Platform"
              value={platform}
              onChange={e => setPlatform(e.target.value)}
            />
            <P1
              FontWeight="bold"
              marginbottom="10"
              margintop="20"
              color="#1890ff"
            >
              Registration Link
            </P1>
            <Input
              placeholder="Registration Link"
              value={registrationLink}
              onChange={e => setRegistrationLink(e.target.value)}
            />
          </div>
          <PrimaryButton
            type="primary"
            borderradius="10"
            width="auto"
            onClick={handleSubmit}
          >
            {isCreating ? <Spin /> : 'Create Event'}
          </PrimaryButton>
        </div>
      </Container>
    </div>
  );
}

CreateSocietyEventPage.propTypes = {
  createEventAsync: PropTypes.func.isRequired,
  createSocietyEventPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  createSocietyEventPage: makeSelectCreateSocietyEventPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    createEventAsync: data => dispatch(createEventAsync(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CreateSocietyEventPage);
