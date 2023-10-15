/* eslint-disable no-underscore-dangle */
/**
 *
 * FundaeFinderRequestNotification
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import P1 from 'components/P1';
import H1 from 'components/H1';
import PrimaryButton from 'components/PrimaryButton';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 30px;

  .grid-box {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    align-items: center;
    grid-column-gap: 60px;
    grid-row-gap: 60px;
    margin-top: 20px;
  }
`;

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  border-radius: 16px;
  background-color: #fff;

  .anticon {
    margin-left: 6px !important;
  }

  img {
    width: 40%;
    height: 40%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

function FundaeFinderRequestNotification(props) {
  return (
    <Container>
      <P1 size="20" FontWeight="500">
        Fundae Finder Pending Requests:
      </P1>
      <div className="grid-box">
        {props.requests.map(obj => (
          <Card key={obj._id}>
            <P1 size="16" FontWeight="500" marginbottom="15">
              Contact Requested By:
            </P1>
            <img
              src={
                obj.requestedBy.imageSrc || 'https://joeschmoe.io/api/v1/random'
              }
              alt="Profile"
            />
            <H1 size="18" margintop="20">
              {obj.requestedBy.name}
            </H1>
            <P1 margintop="5">{obj.requestedBy.rollNo}</P1>
            <PrimaryButton
              width="70%"
              height="40px"
              colorbg="#0652DD"
              margintop="20px"
              onClick={() => props.resolveRequest(obj._id, 'accept')}
            >
              Accept <CheckOutlined />
            </PrimaryButton>
            <PrimaryButton
              width="70%"
              height="40px"
              colorbg="#d63031"
              margintop="10px"
              onClick={() => props.resolveRequest(obj._id, 'reject')}
            >
              Reject <CloseOutlined />
            </PrimaryButton>
          </Card>
        ))}
      </div>
    </Container>
  );
}

FundaeFinderRequestNotification.propTypes = {
  requests: PropTypes.array.isRequired,
  resolveRequest: PropTypes.func.isRequired,
};

export default memo(FundaeFinderRequestNotification);
