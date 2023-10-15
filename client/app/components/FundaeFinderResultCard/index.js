/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/**
 *
 * FundaeFinderResultCard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Row, Tag } from 'antd';

import H1 from 'components/H1';
import P1 from 'components/P1';
import PrimaryButton from 'components/PrimaryButton';

const Container = styled.div`
  width: 80%;
  height: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  border-radius: 16px;
  background-color: #fff;

  img {
    width: 40%;
    height: 40%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

function FundaeFinderResultCard(props) {
  const tagColors = [
    'magenta',
    'red',
    'blue',
    'green',
    'gold',
    'lime',
    'geekblue',
    'purple',
  ];

  const buttonColors = {
    pending: 'rgba(178, 71, 167, 0.5)',
    accepted: 'rgb(0, 102, 0)',
    rejected: 'rgb(255,148,148)',
  };

  return (
    <Container>
      <img
        src={props.imageSrc || 'https://joeschmoe.io/api/v1/random'}
        alt="Profile"
      />
      <H1 size="18" margintop="20">
        {props.name}
      </H1>
      <P1 margintop="5">{props.rollNo}</P1>
      <Row
        style={{
          width: '100%',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        {props.tags
          ? props.tags.map(tag => (
              <Tag
                color={tagColors[Math.floor(Math.random() * tagColors.length)]}
              >
                {tag}
              </Tag>
            ))
          : null}
      </Row>
      {props.requestMap[props.objectID] &&
      props.requestMap[props.objectID].status === 'accepted' ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '15px',
          }}
        >
          <P1>Phone: {props.requestMap[props.objectID].data.phone}</P1>
          <P1>Email: {props.requestMap[props.objectID].data.email}</P1>
        </div>
      ) : null}
      <PrimaryButton
        width="70%"
        height="40px"
        colorbg={
          props.requestMap[props.objectID]
            ? buttonColors[props.requestMap[props.objectID].status]
            : '#B247A7'
        }
        margintop="20px"
        onClick={() => {
          if (!props.requestMap[props.objectID])
            props.createRequest(props.objectID);
        }}
      >
        {props.requestMap[props.objectID]
          ? props.requestMap[props.objectID].status === 'accepted'
            ? 'Contact Shared'
            : props.requestMap[props.objectID].status
          : 'Request Contact'}
      </PrimaryButton>
    </Container>
  );
}

FundaeFinderResultCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rollNo: PropTypes.string.isRequired,
  tags: PropTypes.array,
  createRequest: PropTypes.func.isRequired,
  objectID: PropTypes.string.isRequired,
  requestMap: PropTypes.array,
};

export default memo(FundaeFinderResultCard);
