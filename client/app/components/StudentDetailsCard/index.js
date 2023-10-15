/**
 *
 * StudentDetailsCard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import H1 from 'components/H1';
import P1 from 'components/P1';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  width: 40vw;
  border-radius: 20px;
  background-color: #fff;
  margin-right: 50px;
`;

const UserData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    height: 100px;
    width: 100px !important;
    object-fit: cover;
    border-radius: 500px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
`;

const AdditionalData = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;

  .left-side {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .right-side {
    display: flex;
    flex-direction: column;
    flex: 1.5;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

function StudentDetailsCard(props) {
  const studentData = {
    Department: props.userData.department
      ? props.userData.department.departmentName
      : '-',
    Hall: props.userData.hall ? props.userData.hall.name : '-',
    'Contact Info': props.userData.phone ? props.userData.phone : '-',
    'Email Id': props.userData.email,
  };

  return (
    <Container>
      <UserData>
        <img
          src={
            props.userData.profilePic
              ? props.userData.profilePic
              : 'https://joeschmoe.io/api/v1/random'
          }
          alt="avatar"
        />
        <H1 size="18" margintop="15" marginbottom="15">
          {props.userData.name}
        </H1>
        <P1>{props.userData.rollNo}</P1>
      </UserData>
      <AdditionalData>
        <div className="left-side">
          {Object.keys(studentData).map(key => (
            <P1 color="#484444" FontWeight="500" marginbottom="10px">
              {key} :
            </P1>
          ))}
        </div>
        <div className="right-side">
          {Object.values(studentData).map(value => (
            <P1 color="#484444" FontWeight="500" marginbottom="10px">
              {value}
            </P1>
          ))}
        </div>
      </AdditionalData>
    </Container>
  );
}

StudentDetailsCard.propTypes = {
  userData: PropTypes.object,
};

export default memo(StudentDetailsCard);
