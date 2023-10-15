/**
 *
 * EventIndividual
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import H1 from 'components/H1';
import P1 from 'components/P1';
import PrimaryButton from 'components/PrimaryButton';
import EventTimeline from 'components/EventTimeline';

const Container = styled.div`
  width: 80%;
  margin: 2rem auto;
  border-radius: 2rem;
  box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.2);
  padding: 2rem;

  > p {
    line-height: 1.5rem;
  }

  .register {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
  }
`;

function EventIndividual(props) {
  return (
    <Container>
      <H1 gradienttext textAlign="center" marginbottom="30" size="24">
        {props.eventName}
      </H1>
      <P1 FontWeight="bold" margintop="20" size="18">
        Introduction
      </P1>
      <P1 margintop="5">{props.introduction}</P1>
      <P1 FontWeight="bold" margintop="20" size="18">
        Procedure
      </P1>
      <P1 margintop="5">{props.procedure}</P1>
      <P1 FontWeight="bold" margintop="20" size="18">
        Judging Criteria
      </P1>
      <P1 margintop="5">{props.judgingCriteria}</P1>
      {props.timeline && props.timeline.length ? (
        <P1
          textAlign="center"
          FontWeight="bold"
          margintop="40"
          marginbottom="40"
          size="18"
        >
          Timeline
        </P1>
      ) : null}
      {props.timeline && props.timeline.length ? (
        <EventTimeline timeline={props.timeline} />
      ) : null}
      <div className="register">
        <div>
          <P1 FontWeight="bold" marginbottom="10">
            Platform
          </P1>
          <P1>MS Teams</P1>
        </div>
        <a href={props.registrationLink}>
          <PrimaryButton plainbg borderradius="10" width="auto" height="auto" iconsize="1rem" padding="1rem 2rem">
            Register Now
          </PrimaryButton>
        </a>
      </div>
    </Container>
  );
}

EventIndividual.propTypes = {
  eventName: PropTypes.string.isRequired,
  introduction: PropTypes.string.isRequired,
  procedure: PropTypes.string.isRequired,
  judgingCriteria: PropTypes.string.isRequired,
  timeline: PropTypes.string.isRequired,
  registrationLink: PropTypes.string.isRequired,
};

export default memo(EventIndividual);
