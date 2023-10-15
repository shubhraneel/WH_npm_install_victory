/**
 *
 * AddBillReimbursementPage
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Divider, Image, Input, Row } from 'antd';

import { PlusCircleOutlined } from '@ant-design/icons';
import P1 from 'components/P1';
import H1 from 'components/H1';
import PrimaryButton from 'components/PrimaryButton';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAddBillReimbursementPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { addRequestAsync } from './actions';

const { TextArea } = Input;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
  padding: 20px;

  .add-action-box {
    width: 250px;
    height: 250px;
    border-radius: 10px;
    border: 2px dotted grey;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .input-container {
    width: 100%;
    flex: 3;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-left: 50px;
  }
`;

export function AddBillReimbursementPage(props) {
  useInjectReducer({ key: 'addBillReimbursementPage', reducer });
  useInjectSaga({ key: 'addBillReimbursementPage', saga });

  const [image, setImage] = useState(undefined);
  const [description, setDescription] = useState(undefined);

  return (
    <div>
      <Helmet>
        <title>AddBillReimbursementPage</title>
        <meta
          name="description"
          content="Description of AddBillReimbursementPage"
        />
      </Helmet>
      <Container>
        <Row style={{ width: '100%' }} justify="space-between">
          <H1 size="20">Add Bill Reimbursement Request</H1>
          <PrimaryButton
            type="primary"
            width="150px"
            height="35px"
            onClick={() => props.addRequest({ image, description })}
          >
            Save
          </PrimaryButton>
        </Row>
        <Divider />
        <Row style={{ width: '100%' }} justify="space-between">
          {!image ? (
            <div
              aria-hidden="true"
              className="add-action-box"
              onClick={() => document.getElementById('add-bill').click()}
            >
              <PlusCircleOutlined
                style={{ fontSize: '50px', color: 'rgb(196 206 227)' }}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="add-bill"
                onChange={event => {
                  setImage(event.target.files[0]);
                }}
              />
              <P1 size="16" Color="rgb(196 206 227)" margintop="10">
                Add Bill Image
              </P1>
            </div>
          ) : (
            <Image
              height={250}
              width={250}
              style={{
                objectFit: 'cover',
                borderRadius: '10px',
              }}
              src={URL.createObjectURL(image)}
            />
          )}
          <div className="input-container">
            <P1 marginbottom="15">Add Description</P1>
            <TextArea
              showCount
              maxLength={2000}
              onChange={e => setDescription(e.target.value)}
              value={description}
              rows={8}
              autoSize={{ maxRows: 8, minRows: 8 }}
              placeholder="Description"
              style={{ width: '90%' }}
            />
          </div>
        </Row>
      </Container>
    </div>
  );
}

AddBillReimbursementPage.propTypes = {
  addRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addBillReimbursementPage: makeSelectAddBillReimbursementPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    addRequest: data => dispatch(addRequestAsync(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddBillReimbursementPage);
