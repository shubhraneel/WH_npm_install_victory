/**
 *
 * SingleAchievementPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import MasterHeaderBackground from 'components/MasterHeaderBackground';

import H1 from 'components/H1';
import AchievementsList from 'components/AchievementsList';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSingleAchievementPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getAchievementsStart } from './actions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

export function SingleAchievementPage(props) {
  useInjectReducer({ key: 'singleAchievementPage', reducer });
  useInjectSaga({ key: 'singleAchievementPage', saga });

  useEffect(() => {
    props.getAchievements(props.match.params.id);
  }, []);

  const TitleMap = {
    Technology: 'Technology Achievements',
    SocialAndCulture: 'Social and Cultural Achievements',
    SportsAndGames: 'Sports and Games Achievements',
    StudentWelfare: 'Welfare Achievements',
  };

  const { isLoading, achievements } = props.singleAchievementPage;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', zIndex: '2' }}>
      <Helmet>
        <title>SingleAchievementPage</title>
        <meta
          name="description"
          content="Description of SingleAchievementPage"
        />
      </Helmet>
      <MasterHeaderBackground secondary />
      <Container>
        <H1 color="#fff" marginbottom="60">
          {TitleMap[props.match.params.id]}
        </H1>
        <AchievementsList isLoading={isLoading} achievements={achievements} />
      </Container>
    </div>
  );
}

SingleAchievementPage.propTypes = {
  match: PropTypes.object.isRequired,
  getAchievements: PropTypes.func.isRequired,
  singleAchievementPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  singleAchievementPage: makeSelectSingleAchievementPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAchievements: category => dispatch(getAchievementsStart(category)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SingleAchievementPage);
