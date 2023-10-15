/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * AddSocietyModal
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Row, Input, Tag, Progress } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import CustomModal from 'components/CustomModal';
import PrimaryButton from 'components/PrimaryButton';
import P1 from 'components/P1';

const Container = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
  padding-bottom: 20px;

  .image {
    width: 100%;
    height: 300px;
    background: #74b9ff;
    position: relative;
    margin-bottom: 20px;

    .edit-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #fff;
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .anticon anticon-edit {
        font-size: 24px !important;
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const { CheckableTag } = Tag;

function AddSocietyModal(props) {
  const [coverImage, setCoverImage] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [category, setCategory] = useState(undefined);

  useEffect(() => {
    if (props.uploadProgress === 101) props.setIsModalVisible(false);
  }, [props.uploadProgress]);

  const availableCategories = [
    'Technology',
    'SocialAndCultural',
    'SportsAndGames',
    'StudentWelfare',
  ];

  return (
    <CustomModal
      visible={props.isModalVisible}
      centered
      onCancel={() => props.setIsModalVisible(false)}
      footer={[
        <div
          key="1"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PrimaryButton
            plainbg
            key="1"
            margintop="10px"
            onClick={() => {
              props.addSociety({ coverImage, name, category });
            }}
            type="primary"
            disabled={props.uploadProgress && props.uploadProgress < 101}
          >
            Create Society
          </PrimaryButton>
          <PrimaryButton
            key="2"
            onClick={() => props.setIsModalVisible(false)}
            iconcolor="rgb(35 43 43)"
            margintop="15px"
            marginbottom="15px"
            type="dashed"
          >
            Cancel
          </PrimaryButton>
        </div>,
      ]}
      mask="false"
      style={{ borderradius: '5px' }}
      contentStyle={{ borderradius: '5px', overflow: 'hidden' }}
    >
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <Container>
          {props.uploadProgress && props.uploadProgress < 101 ? (
            <Progress percent={props.uploadProgress} showInfo={false} />
          ) : null}
          <div className="image">
            {coverImage ? (
              <img
                src={URL.createObjectURL(coverImage)}
                alt="Profile Display"
              />
            ) : null}
            <div
              className="edit-icon"
              onClick={() =>
                document.getElementById('society-cover-image').click()
              }
            >
              <EditOutlined />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="society-cover-image"
                onChange={e => setCoverImage(e.target.files[0])}
              />
            </div>
          </div>
          <div
            style={{
              padding: '20px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Input
              placeholder="Enter Society Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <P1 margintop="20">Select Society Category</P1>
            {availableCategories.map(tag => (
              <CheckableTag
                key={tag}
                checked={category === tag}
                onChange={() => setCategory(tag)}
              >
                {tag}
              </CheckableTag>
            ))}
          </div>
        </Container>
      </Row>
    </CustomModal>
  );
}

AddSocietyModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  addSociety: PropTypes.func.isRequired,
  uploadProgress: PropTypes.number,
};

export default memo(AddSocietyModal);
