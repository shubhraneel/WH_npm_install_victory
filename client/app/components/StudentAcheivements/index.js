/**
 *
 * StudentAcheivements
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import H1 from 'components/H1';
import TitleCard from 'components/TitleCard';

import TechIllus from 'images/technology.png';
import SocultIllus from 'images/socult.png';
import SportsIllus from 'images/sports.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  margin-bottom: 40px;
`;

const CardsContainer = styled.div`
  padding: 50px 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function StudentAcheivements(props) {
  const cards = [
    {
      imageSrc: TechIllus,
      title: 'Technology',
      num: props.count.Technology,
      id: 'Technology',
    },
    {
      imageSrc: SocultIllus,
      title: 'Social and Culture',
      num: props.count.SocialAndCulture,
      id: 'SocialAndCulture',
    },
    {
      imageSrc: SportsIllus,
      title: 'Sports And Games',
      num: props.count.SportsAndGames,
      id: 'SportsAndGames',
    },
    {
      imageSrc: SocultIllus,
      title: 'Student Welfare',
      num: props.count.StudentWelfare,
      id: 'StudentWelfare',
    },
  ];
  return (
    <Container>
      <H1 gradienttext>Your Achievements</H1>
      <CardsContainer>
        {cards.map(card => (
          <Link to={`/achievements/${card.id}`}>
            <TitleCard
              imageSrc={card.imageSrc}
              title={card.title}
              num={card.num}
              id={card.id}
            />
          </Link>
        ))}
      </CardsContainer>
    </Container>
  );
}

StudentAcheivements.propTypes = {
  count: PropTypes.object.isRequired,
};

export default memo(StudentAcheivements);
