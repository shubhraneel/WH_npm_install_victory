/**
 *
 * HomePageWelcome
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import H1 from "components/H1";

import tsgbuilding from "images/tsgBuilding 1.png"

const Container = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  padding: 5em 0;
  justify-content: space-between;

  img {
    width: 28rem;
  }

  @media screen and (max-width:768px) {
    display: none;
  }

  // @media screen and (max-width:1024px) {
  //   img {
  //     width: 20rem;
  //   }
  // }
`

const LeftContainer = styled.div`
  color: white;
  width: 50%;

  div {
    margin-bottom: 1em;
  }

  .welcome-tsg {
    font-size: 20px;
  }

  .paragraph {
    font-size: 1rem;
  }
`

function HomePageWelcome() {
  return <Container>
    <LeftContainer>
      <div className="welcome-tsg">
        Welcome
      </div>
      <div>
      <H1 color="white" size="34px">
        Technology Students' Gymkhana
      </H1>
      </div>
      <div>
      <H1 color="white" size="34px">
        IIT Kharagpur
      </H1>
      </div>
      <div className="paragraph">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nullam convallis tellus quis pulvinar ultrices. Mauris ac justo dui. 
        Proin pretium, orci non placerat bibendum, diam risus consectetur sem, 
        finibus rhoncus libero arcu nec nibh. Nulla dui nunc, porttitor vel risus et, 
        vehicula dignissim quam. Maecenas congue pellentesque sapien, eu volutpat dolor ultricies id.
      </div>
    </LeftContainer>
    <div>
      <img src={tsgbuilding} alt="TSG Building" />
    </div>
  </Container>
}

HomePageWelcome.propTypes = {};

export default memo(HomePageWelcome);
