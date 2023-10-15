/**
 *
 * BillReimbursementDetails
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import P1 from 'components/P1';
import { Divider } from 'antd';

const Container = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  border-radius: 16px;
  background-color: #fff;
  margin-bottom: 15px;

  .vertical {
    display: flex;
    height: 100%;
    overflow-y: auto;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

function BillReimbursementDetails(props) {
  return (
    <Container>
      <div style={{ flex: 1 }} className="vertical">
        <P1 FontWeight="500">Description:</P1>
        <P1>{props.description}</P1>
      </div>
      <Divider type="vertical" />
      <div style={{ flex: 0.4 }} className="vertical">
        <P1 FontWeight="500">Status:</P1>
        <P1>{props.status}</P1>
      </div>
      <Divider type="vertical" />
      <div style={{ flex: 1 }} className="vertical">
        <P1 FontWeight="500">Remarks:</P1>
        <P1>{props.remarks}</P1>
      </div>
    </Container>
  );
}

BillReimbursementDetails.propTypes = {
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  remarks: PropTypes.string.isRequired,
};

export default memo(BillReimbursementDetails);
