/**
 *
 * SplashScreen
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Spin } from 'antd';

import H1 from 'components/H1';

function SplashScreen() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <H1 marginbottom="30">Loading...</H1>
      <Spin size="large" />
    </div>
  );
}

SplashScreen.propTypes = {};

export default memo(SplashScreen);
