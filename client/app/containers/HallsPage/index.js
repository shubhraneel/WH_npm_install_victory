/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/first */
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
import P1 from 'components/P1';
import DropdownSelector from 'components/DropdownSelector';
import ContactsCard from 'components/ContactsCard';
import { Row } from 'antd';
import Spinner from 'components/Spinner';
import Carousel from 'components/Carousel';
import { config } from 'react-spring';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHallsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getHallsStart, changeHallStart } from './actions';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;

  .left-align-box {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .grid-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    margin-top: 50px;
    flex-wrap: wrap;

    div {
      width: 25%;
      min-width: 20rem;
    }
  }
`;

export function HallsPage(props) {
  useInjectReducer({ key: 'hallsPage', reducer });
  useInjectSaga({ key: 'hallsPage', saga });

  const { halls, currentHall, isChangeHallLoading } = props.hallsPage;

  useEffect(() => {
    props.getHalls();
  }, []);

  return (
    <div>
      <Helmet>
        <title>HallsPage</title>
        <meta name="description" content="Description of HallsPage" />
      </Helmet>
      <Container>
        <H1 size="32" lineheight="30px" marginbottom="60" gradienttext>
          Hall of Residence
        </H1>
        <DropdownSelector
          options={halls.halls ? halls.halls : []}
          placeholder="Choose your hall"
          onChange={props.changeHall}
        />
        {currentHall && !isChangeHallLoading ? (
          <>
            <H1 size="18" margintop="30" color="#767373">
              {currentHall.name}
            </H1>
            <div className="left-align-box">
              <P1 size="16" FontWeight="500" margintop="30">
                About
              </P1>
            </div>
            <div className="left-align-box">
              <P1 margintop="5" letterspacing="0.4px">
                {currentHall.description}
              </P1>
            </div>
            <div className="left-align-box">
              <P1 size="16" FontWeight="500" margintop="30">
                Gallery
              </P1>
            </div>
            <div style={{ width: '50%', height: '300px', margin: '0 auto' }}>
              <Carousel
                slides={currentHall.gallery.map(e => {
                  return {
                    key: e._id,
                    content: (
                      <div>
                        <img src={e.imageURL} alt={e._id} />
                      </div>
                    ),
                  };
                })}
                goToSlide={0}
                offsetRadius={2}
                showNavigation
                config={config.gentle}
              />
            </div>
            <div className="left-align-box">
              <P1 size="16" FontWeight="500" margintop="200">
                Contact Details
              </P1>
            </div>
            <div className="grid-box">
              {currentHall.contacts.map(obj => (
                <ContactsCard {...obj} />
              ))}
            </div>
          </>
        ) : (
          <Row justify="center">
            <Spinner />
          </Row>
        )}
      </Container>
    </div>
  );
}

HallsPage.propTypes = {
  getHalls: PropTypes.func.isRequired,
  changeHall: PropTypes.func.isRequired,
  hallsPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  hallsPage: makeSelectHallsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getHalls: () => dispatch(getHallsStart()),
    changeHall: value => dispatch(changeHallStart(value)),
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
