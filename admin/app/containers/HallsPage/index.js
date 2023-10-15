/**
 *
 * HallsPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import H1 from 'components/H1';
import SocietyCard from 'components/SocietyCard';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHallsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getHallsStart } from './actions';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;

  .grid-box {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    grid-column-gap: 60px;
    grid-row-gap: 60px;
    margin-top: 30px;
  }
`;

export function HallsPage(props) {
  useInjectReducer({ key: 'hallsPage', reducer });
  useInjectSaga({ key: 'hallsPage', saga });

  useEffect(() => {
    props.getHalls();
  }, []);

  const { halls } = props.hallsPage;

  return (
    <div
      style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}
    >
      <Helmet>
        <title>HallsPage</title>
        <meta name="description" content="Description of SocietyPage" />
      </Helmet>
      <Container>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '25px',
          }}
        >
          <H1 size="18" fontweight="600">
            Registered Halls
          </H1>
        </div>
        <div className="grid-box">
          {halls.map(obj => (
            <SocietyCard {...obj} hall />
          ))}
        </div>
      </Container>
    </div>
  );
}

HallsPage.propTypes = {
  getHalls: PropTypes.func.isRequired,
  hallsPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  hallsPage: makeSelectHallsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getHalls: () => dispatch(getHallsStart()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HallsPage);
