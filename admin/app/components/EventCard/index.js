/**
 *
 * EventCard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

import H1 from 'components/H1';
import P1 from 'components/P1';
import PrimaryButton from 'components/PrimaryButton';

import Icons from 'components/IconBox';

import CalendarIcon from 'images/calendar-icon.svg';

const Container = styled.div`
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  border-radius: 16px;
  background: #fff;
  height: 200px;

  img {
    height: 100%;
    flex: 0.6;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 20px;
  }

  .text-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex: 4;
  }

  .button-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex: 1;
  }
`;

function EventCard(props) {
  return (
    <Container>
      <img className="image" src={props.eventImage} alt={props.eventName} />
      <div className="text-container">
        <H1 size="18">{props.eventName}</H1>
        <P1 margintop="10">
          Organized by: {props.isTSGEvent ? 'TSG' : props.societyName}
        </P1>
        <P1 margintop="10">Platform: {props.platform}</P1>
        <P1 margintop="10">
          <Icons
            src={CalendarIcon}
            alt="Calendar Icon"
            marginright="5px"
            size="18px"
          />
          {moment(props.eventDate).format('dddd, MMMM Do YYYY')}
        </P1>
      </div>
      <div className="button-container">
        <Link to={`/events/event/${props.slug}/`}>
          <PrimaryButton type="primary">View Details</PrimaryButton>
        </Link>
      </div>
    </Container>
  );
}

EventCard.propTypes = {
  eventImage: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  isTSGEvent: PropTypes.bool.isRequired,
  eventDate: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  societyName: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default memo(EventCard);
