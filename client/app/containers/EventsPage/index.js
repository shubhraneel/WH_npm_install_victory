/**
 *
 * EventsPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import H1 from 'components/H1';
import TitleCard from 'components/TitleCard';

import TechIllus from 'images/technology.png';
import SocultIllus from 'images/socult.png';
import SportsIllus from 'images/sports.png';
import InterIitResultIllus from 'images/interiit-result.png';
import GCResultsIllus from 'images/gc-result.png';
import EventsResultsIllu from 'images/events-result.png';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectEventsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justifycontent: center;
  padding: 30px;
`;

const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 50px 20px;
  flex-wrap: wrap;
  gap: 3rem;

  @media (max-width: 1000px) {
    width: 70%;
  }
`;

export function EventsPage() {
  useInjectReducer({ key: 'eventsPage', reducer });
  useInjectSaga({ key: 'eventsPage', saga });

  const cards = [
    { imageSrc: TechIllus, title: 'Technology', num: 0, id: 'Technology' },
    {
      imageSrc: SocultIllus,
      title: 'Social and Culture',
      num: 0,
      id: 'SocialAndCulture',
    },
    {
      imageSrc: SportsIllus,
      title: 'Sports And Games',
      num: 0,
      id: 'SportsAndGames',
    },
    {
      imageSrc: SocultIllus,
      title: 'Student Welfare',
      num: 0,
      id: 'StudentWelfare',
    },
  ];

  const resultsCard = [
    {
      imageSrc: InterIitResultIllus,
      title: 'Inter IIT',
      num: 0,
      id: 'InterIIT',
    },
    {
      imageSrc: GCResultsIllus,
      title: 'General Championship',
      num: 0,
      id: 'GC',
    },
    {
      imageSrc: EventsResultsIllu,
      title: 'Events',
      num: 0,
      id: 'Events',
    },
  ];

  return (
    <div>
      <Helmet>
        <title>EventsPage</title>
        <meta name="description" content="Description of EventsPage" />
      </Helmet>
      <Container>
        <H1
          size="32"
          lineheight="30px"
          // marginbottom="20"
          margintop="30"
          gradienttext
        >
          Upcoming Events
        </H1>
        <CardsContainer>
          {cards.map(card => (
            <Link to={`/events-page/${card.id}`}>
              <TitleCard
                imageSrc={card.imageSrc}
                title={card.title}
                num={card.num}
                id={card.id}
                hideNum
              />
            </Link>
          ))}
        </CardsContainer>
        <H1 size="32" lineheight="30px" margintop="80" gradienttext>
          Results
        </H1>
        <CardsContainer>
          {resultsCard.map(card => (
            <Link to={`/results/${card.id}`}>
              <TitleCard
                imageSrc={card.imageSrc}
                title={card.title}
                num={card.num}
                id={card.id}
                hideNum
              />
            </Link>
          ))}
        </CardsContainer>
      </Container>
    </div>
  );
}

EventsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  eventsPage: makeSelectEventsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EventsPage);
