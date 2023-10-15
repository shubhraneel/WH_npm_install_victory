/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Spring, animated } from 'react-spring';

const SlideContainer = styled(animated.div)`
  position: absolute;
  height: 100%;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;
  img {
    object-fit: scale-down;
    display: block;
    max-height: 100%;
  }
`;

export default function Slide({
  content,
  offsetRadius,
  index,
  animationConfig,
  onClick,
}) {
  const offsetFromCenter = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  const distanceFactor = 1 - Math.abs(offsetFromCenter / (offsetRadius + 1));

  const translateXoffset =
    50 * (Math.abs(offsetFromCenter) / (offsetRadius + 1));
  let translateX = -50;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateX = 0;
    } else if (index === totalPresentables - 1) {
      translateX = -100;
    }
  }

  if (offsetFromCenter > 0) {
    translateX += translateXoffset;
  } else if (offsetFromCenter < 0) {
    translateX -= translateXoffset;
  }

  return (
    <Spring
      to={{
        transform: `translateY(-50%) translateX(${translateX}%) scale(${distanceFactor})`,
        left: `${
          offsetRadius === 0 ? 50 : 50 + (offsetFromCenter * 50) / offsetRadius
        }%`,
        opacity: distanceFactor * distanceFactor,
      }}
      config={animationConfig}
    >
      {styles => (
        <SlideContainer
          style={{
            ...styles,
            zIndex: Math.abs(Math.abs(offsetFromCenter) - 2),
          }}
          onClick={onClick}
        >
          {content}
        </SlideContainer>
      )}
    </Spring>
  );
}
