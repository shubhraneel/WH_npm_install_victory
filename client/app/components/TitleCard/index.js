/**
 *
 * TitleCard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import P1 from 'components/P1';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${props =>
    props.background
      ? props.background
      : 'linear-gradient(185.25deg, rgba(253, 116, 155, 0.7) -43.12%, rgba(40, 26, 200, 0.7) 153.37%)'};
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  width: ${props => (props.width ? props.width : '180px')};
  height: ${props => (props.height ? props.height : '180px')};
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;

  img {
    height: 90px;
    width: 90px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  &:hover {
    box-shadow: 4px 4px 24px rgba(123, 115, 115, 0.7);
  }
`;

function TitleCard(props) {
  return (
    <Container
      width={props.width}
      height={props.height}
      background={props.background}
    >
      {props.imageSrc ? (
        <img src={props.imageSrc} alt="Title Illustration" />
      ) : null}
      <P1 textAlign="center" color="#fff">
        {props.title}
      </P1>
      {props.hideNum ? null : <P1 color="#fff">{props.num}</P1>}
    </Container>
  );
}

TitleCard.propTypes = {
  imageSrc: PropTypes.string,
  title: PropTypes.string.isRequired,
  num: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  background: PropTypes.string,
  hideNum: PropTypes.bool,
};

export default memo(TitleCard);
