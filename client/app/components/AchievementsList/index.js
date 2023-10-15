/* eslint-disable no-nested-ternary */
/**
 *
 * AchievementsList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AchievementCard from 'components/AchievementCard';
import Spinner from 'components/Spinner';
import EmptyState from 'components/EmptyState';

const Container = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  border-radius: 24px;
  padding: 20px 60px;
`;

function AchievementsList(props) {
  return (
    <Container>
      {props.isLoading ? (
        <Spinner />
      ) : props.achievements.length ? (
        props.achievements.map(obj => <AchievementCard {...obj} />)
      ) : (
        <EmptyState />
      )}
    </Container>
  );
}

AchievementsList.propTypes = {
  achievements: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
};

export default memo(AchievementsList);
