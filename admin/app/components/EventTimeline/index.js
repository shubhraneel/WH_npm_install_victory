/**
 *
 * EventTimeline
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Timeline, DatePicker, Input } from 'antd';
import moment from 'moment';

import P1 from 'components/P1';
import PrimaryButton from 'components/PrimaryButton';

const { TextArea } = Input;

const Container = styled.div`
  max-width: 50rem;
  margin: auto;
`;

const CustomTimeline = styled(Timeline)`
  .ant-timeline-item-tail {
    width: 5px;
    background: #a0d1ff;
    border-width: 0;
    transform: translateX(-50%);
  }

  .ant-timeline-item-head {
    width: 15px;
    height: 12px;
    border-radius: 50%;
    transform: translateX(-50%);
    border-width: 0;
    background: #1890ff;
    margin-left: 0 !important;
  }

  p {
    margin: 0 0.5rem 1rem;
  }
`;

function EventTimeline(props) {
  const [newDate, setNewDate] = useState(undefined);
  const [newDescription, setNewDescription] = useState(undefined);

  return (
    <div>
      <Container>
        <CustomTimeline mode="alternate">
          <Timeline.Item>
            <P1 color="#1890ff" textAlign="inherit" FontWeight="bold" size="20">
              {moment(props.timeline[0].time).format('MMM Do, YYYY')}
            </P1>
            <P1 textAlign="inherit" FontWeight="600" size="18">
              Start
            </P1>
          </Timeline.Item>
          {props.timeline.map(e => (
            <Timeline.Item>
              <P1
                color="#1890ff"
                textAlign="inherit"
                FontWeight="bold"
                size="20"
              >
                {moment(e.time).format('MMM Do, YYYY')}
              </P1>
              <P1 textAlign="inherit">{e.description}</P1>
            </Timeline.Item>
          ))}
          <Timeline.Item>
            <DatePicker value={newDate} onChange={date => setNewDate(date)} />
            <TextArea
              showCount
              maxLength={500}
              onChange={e => setNewDescription(e.target.value)}
              value={newDescription}
              rows={2}
              autoSize={{ maxRows: 3, minRows: 2 }}
              placeholder="Add Description"
              style={{ marginTop: '15px' }}
            />
            <PrimaryButton
              type="primary"
              width="200px"
              height="30px"
              margintop="20px"
              onClick={() => {
                props.setTimeline([
                  ...props.timeline,
                  { time: newDate, description: newDescription },
                ]);
                setNewDescription(undefined);
                setNewDate(undefined);
              }}
            >
              Add Timeline
            </PrimaryButton>
          </Timeline.Item>
          <Timeline.Item>
            <P1 color="#1890ff" textAlign="inherit" FontWeight="bold" size="20">
              {moment(props.timeline[props.timeline.length - 1].time).format(
                'MMM Do, YYYY',
              )}
            </P1>
            <P1 textAlign="inherit" FontWeight="600" size="18">
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
  setTimeline: PropTypes.func.isRequired,
};

export default memo(EventTimeline);
