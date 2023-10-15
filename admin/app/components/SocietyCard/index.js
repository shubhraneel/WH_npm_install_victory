/**
 *
 * SocietyCard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Tag } from 'antd';

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

function SocietyCard(props) {
  const TagColors = {
    Technology: 'red',
    SocialAndCulture: 'blue',
    StudentWelfare: 'green',
    SportsAndGames: 'yellow',
  };
  return (
    <Container>
      <img src={props.coverImage} alt="Profile Display" />
      <P1 margintop="20" size="20" FontWeight="500" marginbottom="20">
        {props.name}
      </P1>
      {props.category ? (
        <Tag color={TagColors[props.category]}>{props.category}</Tag>
      ) : null}
      {/* eslint-disable-next-line no-underscore-dangle */}
      <Link to={props.hall ? `/halls/${props._id}` : `/societies/${props._id}`}>
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

SocietyCard.propTypes = {
  coverImage: PropTypes.string,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  hall: PropTypes.bool,
};

export default memo(SocietyCard);
