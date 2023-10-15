/* eslint-disable no-underscore-dangle */
/**
 *
 * BillReimbursementAdminData
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import P1 from 'components/P1';
import { Divider, Image, Input } from 'antd';
import PrimaryButton from 'components/PrimaryButton';

const { TextArea } = Input;

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

function BillReimbursementAdminData(props) {
  const [remarks, setRemarks] = useState(undefined);

  return (
    <Container>
      <div style={{ flex: 1 }} className="vertical">
        <P1 FontWeight="500">Description:</P1>
        <P1>{props.description}</P1>
      </div>
      <div style={{ flex: 0.8 }} className="vertical">
        <P1 FontWeight="500">Bill Document:</P1>
        <Image
          src={props.document}
          height={180}
          width="100%"
          style={{ objectFit: 'cover', borderRadius: '5px' }}
        />
      </div>
      <Divider type="vertical" />
      <div style={{ flex: 0.4 }} className="vertical">
        <P1 FontWeight="500">Status:</P1>
        {props.status === 'In Process' ? (
          <div>
            <PrimaryButton
              type="primary"
              height="30px"
              width="100px"
              colorbg="#28a745"
              marginbottom="8px"
              onClick={() =>
                props.updateBillStart(props._id, {
                  status: 'Successfully Verified',
                })
              }
            >
              Accept
            </PrimaryButton>
            <PrimaryButton
              type="primary"
              height="30px"
              width="100px"
              colorbg="#dc3545"
              onClick={() =>
                props.updateBillStart(props._id, {
                  status: 'Declined',
                })
              }
            >
              Decline
            </PrimaryButton>
          </div>
        ) : (
          <P1>{props.status}</P1>
        )}
      </div>
      <Divider type="vertical" />
      <div style={{ flex: 1 }} className="vertical">
        <P1 FontWeight="500">Remarks:</P1>
        {props.remarks ? (
          <P1>{props.remarks}</P1>
        ) : (
          <div style={{ width: '100%' }}>
            <TextArea
              showCount
              maxLength={2000}
              onChange={e => setRemarks(e.target.value)}
              value={remarks}
              rows={6}
              autoSize={{ maxRows: 6, minRows: 6 }}
              placeholder="Remarks"
              style={{ width: '100%' }}
            />
            <PrimaryButton
              type="primary"
              height="30px"
              width="180px"
              margintop="10px"
              onClick={() =>
                props.updateBillStart(props._id, {
                  remarks,
                })
              }
            >
              Add Remarks
            </PrimaryButton>
          </div>
        )}
      </div>
    </Container>
  );
}

BillReimbursementAdminData.propTypes = {
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  remarks: PropTypes.string.isRequired,
  document: PropTypes.string.isRequired,
  updateBillStart: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
};

export default memo(BillReimbursementAdminData);
