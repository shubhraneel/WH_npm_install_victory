/**
 *
 * CommonHeader
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import H1 from 'components/H1';
import P1 from 'components/P1';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem;
  margin-bottom: 1rem;
  height: 75vh;
  position: relative;

  .text-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    flex: 1;
    padding: 0 2rem;
  }

  img {
    flex: 0.7;
    height: 80%;
    object-fit: contain;
  }

  @media screen and (max-width:768px) {
    height: 60vh;

    p {
      color: #777;
    }

    h1 {
      position: absolute;
      color: purple;
      font-size: 3rem;
      top: 2rem;
      left: 50%;
      transform: translateX(-50%)
    }

    img {
      width: 20rem;
    }
  }

  @media screen and (max-width: 500px) {
    height: 40vh;

    img {
      width: 15rem;
    }
  }
`;

function CommonHeader(props) {
  return (
    <Container>
      <div className="text-box">
        <H1 color="#fff" marginbottom="50px" size="2.5rem">
          {props.title}
        </H1>
        <P1 size="1.2rem" Lineheight="1.6rem" color="#fff">{props.description}</P1>
      </div>
      <img src={props.imageSrc} alt="Illustration" />
    </Container>
  );
}

CommonHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
};

export default memo(CommonHeader);
