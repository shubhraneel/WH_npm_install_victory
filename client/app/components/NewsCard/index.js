/**
 *
 * NewsCard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import H1 from 'components/H1';
import P1 from 'components/P1';
import PrimaryButton from 'components/PrimaryButton';
import Icons from 'components/IconBox';

import CalendarIcon from 'images/calendar-icon.svg';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  border-radius: 16px;
  background: #fff;
  height: 200px;

  img {
    height: 100%;
    flex: 0.6;
    object-fit: cover;
    border-radius: 15px;
    margin-right: 20px;
  }

  .text-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex: 4;
  }

  .button-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex: 1;
  }
`;

function NewsCard(props) {
  return (
    <Container>
      <img src={props.imageLink} alt="Poster" />
      <div className="text-container">
        <H1 size="18" gradienttext>
          {props.title}
        </H1>
        <P1 margintop="10">
          <Icons
            src={CalendarIcon}
            alt="Calendar Icon"
            marginright="5px"
            size="18px"
          />
          {moment(props.date).format('dddd, MMMM Do YYYY')}
        </P1>
        <P1 margintop="10">Published By: {props.publishedBy}</P1>
        <P1 margintop="10">Category: {props.category}</P1>
      </div>
      <div className="button-container">
        <a href={props.link} target="_blank">
          <PrimaryButton plainbg>Read More</PrimaryButton>
        </a>
      </div>
    </Container>
  );
}

NewsCard.propTypes = {
  imageLink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  publishedBy: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default memo(NewsCard);
