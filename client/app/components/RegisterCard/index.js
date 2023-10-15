/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/**
 *
 * RegisterCard
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import H1 from 'components/H1';
import PrimaryButton from 'components/PrimaryButton';
import CustomInput from 'components/CustomInput';
import { EditOutlined } from '@ant-design/icons';
import SelectBox from './SelectBox';

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  margin-bottom: 100px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 60px;
  background-color: #fff;
  width: 90%;
  height: fit-content;
  border-radius: 25px;
  box-shadow: 0px 2px 10px #ddd;
  max-width: 50rem;
`;

const ImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #74b9ff;
  position: relative;
  margin-bottom: 20px;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

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
`;

function RegisterCard(props) {
  const [coverImage, setCoverImage] = useState(undefined);
  const [coverImageChanged, setCoverImageChanged] = useState(false);
  const [tags, setTags] = useState([]);

  const tagsArr = [
    'Finance',
    'Software',
    'Consulting',
    'Data',
    'Quant',
    'Designing',
    'Research',
  ];

  return (
    <CardContainer>
      <Card>
        <H1 size="32" lineheight="30px" marginbottom="40" gradienttext>
          Your Profile
        </H1>
        <ImageWrapper>
          {props.AuthData.credentials.profilePic || coverImage ? (
            <img
              src={
                coverImageChanged
                  ? URL.createObjectURL(coverImage)
                  : props.AuthData.credentials.profilePic
                  ? props.AuthData.credentials.profilePic
                  : null
              }
              alt="Profile Display"
            />
          ) : null}
          <div
            aria-hidden="true"
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
              onChange={e => {
                setCoverImage(e.target.files[0]);
                setCoverImageChanged(true);
              }}
            />
          </div>
        </ImageWrapper>
        <CustomInput
          label="Name"
          value={props.AuthData.credentials.name}
          disabled
        />
        <CustomInput
          label="Roll Number"
          value={props.AuthData.credentials.rollNo}
          disabled
        />
        <CustomInput
          label="Email"
          value={props.AuthData.credentials.email}
          disabled
          type="email"
        />
        <CustomInput
          label="Department"
          value={props.AuthData.credentials.department.departmentName}
          disabled
        />
        <CustomInput label="Course" value={props.AuthData.credentials.course} />
        <CustomInput
          label="Hall Of Residence"
          value={props.AuthData.credentials.hall.name}
        />
        {/* <CustomInput label="Tags" value={tags} onChange={setTags} /> */}
        <SelectBox tags={tagsArr} selected={tags} setSelected={setTags} />
        <PrimaryButton
          width="auto"
          margintop="40px"
          onClick={() =>
            props.registerStudent(
              {
                tags,
                coverImage,
              },
              coverImageChanged,
            )
          }
          padding="0.8rem 1.5rem"
          height="auto"
          iconsize="1.5rem"
        >
          Update Profile
        </PrimaryButton>
      </Card>
    </CardContainer>
  );
}

RegisterCard.propTypes = {
  registerStudent: PropTypes.func.isRequired,
  AuthData: PropTypes.object.isRequired,
};

export default memo(RegisterCard);
