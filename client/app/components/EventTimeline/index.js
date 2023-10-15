/**
 *
 * EventTimeline
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Timeline } from 'antd';
import moment from 'moment';

import P1 from 'components/P1';

const Container = styled.div`
  max-width: 50rem;
  margin: auto;
`;

const CustomTimeline = styled(Timeline)`
  .ant-timeline-item-tail {
    width: 5px;
    background: #b247a7;
    border-width: 0;
    transform: translateX(-50%);
  }

  .ant-timeline-item-head {
    width: 15px;
    height: 12px;
    border-radius: 50%;
    transform: translateX(-50%);
    border-width: 0;
    background: #ef5da8;
    margin-left: 0 !important;
  }

  p {
    margin: 0 0.5rem 1rem;
  }
`;

function EventTimeline(props) {
  return (
    <div>
      <Container>
        <CustomTimeline mode="alternate">
          <Timeline.Item>
            <P1 color="#EF5DA8" textAlign="inherit" FontWeight="bold" size="1.2rem">
              {moment(props.timeline[0].startTime).format('MMM Do, YYYY')}
            </P1>
            <P1 textAlign="inherit" FontWeight="600" size="1rem">
              Start
            </P1>
          </Timeline.Item>
          {props.timeline.map(e => (
            <Timeline.Item>
              <P1
                color="#EF5DA8"
                textAlign="inherit"
                FontWeight="bold"
                size="1.2rem"
              >
                {moment(e.startTime).format('MMM Do, YYYY')} -{' '}
                {moment(e.endTime).format('MMM Do, YYYY')}
              </P1>
              <P1 textAlign="inherit" size="1rem">{e.description}</P1>
            </Timeline.Item>
          ))}
          <Timeline.Item>
            <P1 color="#EF5DA8" textAlign="inherit" FontWeight="bold" size="1.2rem">
              {moment(
                props.timeline[props.timeline.length - 1].startTime,
              ).format('MMM Do, YYYY')}
            </P1>
            <P1 textAlign="inherit" FontWeight="600" size="1rem">
              End
            </P1>
          </Timeline.Item>
        </CustomTimeline>
      </Container>
    </div>
  );
}

EventTimeline.propTypes = {
  timeline: PropTypes.array.isRequired,
};

export default memo(EventTimeline);
