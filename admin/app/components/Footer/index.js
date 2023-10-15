/**
 *
 * Footer
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import P1 from 'components/P1';

const Container = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  box-shadow: 4px 4px 40px 0 rgb(0 0 0 / 5%);
`;
function Footer() {
  return (
    <Container>
      <P1>Admin Panel, Indian Institute of Technology, Kharagpur</P1>
    </Container>
  );
}

Footer.propTypes = {};

export default memo(Footer);
