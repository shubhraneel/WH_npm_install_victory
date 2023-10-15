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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  border-radius: 16px;
  background: #fff;
  height: 200px;

  .image-container {
    width: 15rem;
    height: 100%;
    padding: 0 1.5rem 0 0;

    img {
      height: 100%;
      width: 100%;
      flex: 0.6;
      object-fit: cover;
      border-radius: 5px;
      margin-right: 20px;
    }
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
    justify-content: flex-end;
    gap: 10px;
    flex: 1;
  }

  .calendar-register {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  @media screen and (max-width: 600px) {
    p {
      font-size: 1.5rem !important;
    }

    button {
      padding: 1rem 2rem !important;
    }

    .image-container {
      width: 12rem;
    }
  }
`;

function EventCard(props) {
  const handleShare = async () => {
    const shareData = {
      title: `Shared an event`,
      text: 'Hey, I want you to check out this event!',
      url: `${window.location.protocol}//${window.location.host}/events/event/${
        props.slug
      }`,
    };

    await navigator.share(shareData);
  };

  return (
    <Container>
      <div className="image-container">
        <img className="image" src={props.eventImage} alt={props.eventName} />
      </div>
      <div className="text-container">
        <H1 size="18" gradienttext marginbottom="20">
          {props.eventName}
        </H1>
        <P1 margintop="10">
          Organized by: {props.isTSGEvent ? 'TSG' : props.organisedBy.name}
        </P1>
        <P1 margintop="10">Platform: {props.platform}</P1>
        <div className="calendar-register">
          <P1 margintop="10">
            <Icons
              src={CalendarIcon}
              alt="Calendar Icon"
              marginright="5px"
              size="18px"
            />
            {moment(props.eventDate).fromNow()}
          </P1>
          <div className="button-container">
            <PrimaryButton
              transparentbg
              dashed
              height="35px"
              width="100px"
              iconcolor="black"
              onClick={handleShare}
            >
              Share
            </PrimaryButton>
            <Link to={`/events/event/${props.slug}/`}>
              <PrimaryButton plainbg height="35px" width="100px">
                Register
              </PrimaryButton>
            </Link>
          </div>
        </div>
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
  organisedBy: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default memo(EventCard);
