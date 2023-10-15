/**
 *
 * DepartmentCard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import P1 from 'components/P1';
import PrimaryButton from 'components/PrimaryButton';

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
  padding-bottom: 20px;

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

function DepartmentCard(props) {
  return (
    <Container>
      <img
        src={`https://ui-avatars.com/api/?background=random&name=${
          props.departmentName
        }`}
        alt="Profile Display"
      />
      <P1 margintop="20" size="20" FontWeight="500" marginbottom="20">
        {props.departmentName}
      </P1>
      <P1>Number of Faculty: {props.faculty.length}</P1>
      {/* eslint-disable-next-line no-underscore-dangle */}
      <Link to={`/departments/${props._id}`}>
        <PrimaryButton
          height="30px"
          width="150px"
          type="primary"
          margintop="20px"
        >
          View Details
        </PrimaryButton>
      </Link>
    </Container>
  );
}

DepartmentCard.propTypes = {
  departmentName: PropTypes.string.isRequired,
  faculty: PropTypes.array.isRequired,
  _id: PropTypes.string.isRequired,
};

export default memo(DepartmentCard);
