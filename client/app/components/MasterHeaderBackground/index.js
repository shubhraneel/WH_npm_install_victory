/**
 *
 * MasterHeaderBackground
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MasterHeaderPrimaryBg from 'images/master-header-primary.svg';
import MasterHeaderSecondayBg from 'images/master-header-secondary.svg';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 90vh;
  background: linear-gradient(174.48deg, #fd749b -12.41%, #281ac8 88.56%);
  margin-bottom: 100vh;
  z-index: -1;

  .master-bg {
    width: 100%;
    position: absolute;
    bottom: -60px;
    left: 0;
    right: 0;
  }

  @media screen and (max-width: 1200px) {
    height: 70vh;
  }

  @media screen and (max-width:768px) {
    display: none;
  }
`;

function MasterHeaderBackground(props) {
  return (
    <Container>
      <img
        className="master-bg"
        src={props.secondary ? MasterHeaderSecondayBg : MasterHeaderPrimaryBg}
        alt="Master Header"
      />
    </Container>
  );
}

MasterHeaderBackground.propTypes = {
  secondary: PropTypes.bool,
};

export default memo(MasterHeaderBackground);
