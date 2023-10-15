/**
 *
 * PageDescriptionHomePageText
 *
 */

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import H2 from "components/H2";
import P1 from "components/P1";
import PrimaryButton from "components/PrimaryButton";
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  // width: 45%;

  div {
    margin-bottom: 1rem;
  }
`

function PageDescriptionHomePageText(props) {
  return <Container>
  <div><H2 size="1.5rem" lineheight="1.5rem" gradienttext>{props.pagetitle}</H2></div>
  <div>
    <P1 size="1rem" Lineheight="1.5rem">{props.description}</P1>
  </div>
  <div>
    <Link to={props.link}><PrimaryButton iconsize="1.3rem" width="none" padding="2rem 1.5rem" height="none">Open</PrimaryButton></Link>
  </div>
</Container>;
}

PageDescriptionHomePageText.propTypes = {};

export default memo(PageDescriptionHomePageText);
