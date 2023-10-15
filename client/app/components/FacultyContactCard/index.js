/**
 *
 * FacultyContactCard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import P1 from 'components/P1';

const Container = styled.div`
  width: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 4rem;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  border-radius: 16px;
  margin-bottom: 30px;
  background-color: #fff;
  grid-template-columns: minmax(15rem, 1fr) repeat(4, 1fr);
  grid-template-rows: repeat(4, 3rem) max-content;
  column-gap: 2rem;

  .image-container {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;

    img {
      width: 100%;
      object-fit: cover;
      max-height: 8rem;
    }
  }

  .name-designation {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 4;
    grid-row-end: 5;
    p {
      text-align: center;
    }
  }

  .research-area {
    grid-column-start: 2;
    grid-column-end: 6;
    grid-row-start: 1;
    grid-row-end: 4;
    justify-self: start;
  }

  .contact-details {
    grid-column-start: 2;
    grid-column-end: 6;
    grid-row-start: 4;
    grid-row-end: 6;
    justify-self: start;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  @media (max-width: 600px) {
    padding: 3rem 1rem;
    grid-template-columns: minmax(5rem, 1fr) repeat(4, 1fr);

    .image-container {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 4;
    }

    .name-designation {
      grid-column-start: 3;
      grid-column-end: 6;
      grid-row-start: 1;
      grid-row-end: 2;
      justify-self: start;
      align-self: end;
      p {
        text-align: left;
      }
    }
  
    .research-area {
      grid-column-start: 1;
      grid-column-end: 6;
      grid-row-start: 4;
      grid-row-end: 6;
      justify-self: start;
      padding-top: 1rem;
      p {
        text-align: left;
        font-size: 1.5rem !important;
        line-height: 2rem !important;
      }
    }
  
    .contact-details {
      grid-column-start: 3;
      grid-column-end: 6;
      grid-row-start: 2;
      grid-row-end: 4;
      justify-self: start;
      display: block;
      padding-top: 1.5rem;
    }
  }

`;

function FacultyContactCard(props) {
  return (
    <Container>
      <div className="image-container">
        <img src={props.contact.image.imageURL} alt="Profile" />
      </div>
      <div className="name-designation">
        <P1 size="1.3rem" color="black" margintop="20">
          {props.contact.name}
        </P1>
        <P1 size="1.2rem">
          {props.contact.designation}
        </P1>
      </div>
      <div className="research-area">
        <P1 size="1.2rem" marginbottom="10">Research Area</P1>
        {props.researchArea.map(e => (
          <P1 size="1rem" Lineheight="1.5rem">&#8226; {e}</P1>
        ))}
      </div>
      <div className="contact-details">
        {props.contact.phone ? (
          <P1 size="1rem" PadRight="40">&#9742; {props.contact.phone}</P1>
        ) : null}
        {props.contact.email ? (
          <P1 size="1rem">&#128140; {props.contact.email}</P1>
        ) : null}
      </div>
    </Container>
  );
}

FacultyContactCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired,
  reserachAreas: PropTypes.array.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default memo(FacultyContactCard);
