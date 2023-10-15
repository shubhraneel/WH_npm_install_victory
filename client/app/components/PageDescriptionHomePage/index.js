/**
 *
 * PageDescriptionHomePage
 *
 */

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PageDescriptionHomePageText from 'components/PageDescriptionHomePageText';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 80%;
  margin: 7em auto;
  justify-content: center;
  flex-direction: ${props => props.reverse ? 'row' : 'row-reverse'};
  gap: 3rem;

  img {
    width: 30rem;
  }

  @media screen and (max-width:800px) {
    // flex-direction: row;
    // flex-wrap: wrap;
  }

  @media screen and (max-width:1000px) {
    img {
      width: 20rem;
    }
  }

  @media screen and (max-width:600px) {
    img {
      width: 15rem;
    }
  }

`;

function PageDescriptionHomePage(props) {
  return (
    <Container reverse={props.index % 2 == 0 ? true : false}>
      <div className="page-description-image">
        <img src={props.image} alt={props.pagetitle} />
      </div>
      <PageDescriptionHomePageText {...props} />
    </Container>
  );
}

PageDescriptionHomePage.propTypes = {};

export default memo(PageDescriptionHomePage);
