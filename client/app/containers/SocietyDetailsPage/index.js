/* eslint-disable no-underscore-dangle */
/**
 *
 * SocietyDetailsPage
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
import { Row, Image } from 'antd';
import Spinner from 'components/Spinner';
import Carousel from 'components/Carousel';
import { config } from 'react-spring';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSocietyDetailsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getSocietiesStart, getSocietyDetailsStart } from './actions';

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

export function SocietyDetailsPage(props) {
  useInjectReducer({ key: 'societyDetailsPage', reducer });
  useInjectSaga({ key: 'societyDetailsPage', saga });

  const {
    societies,
    currentSociety,
    isSocietyDetailsLoading,
  } = props.societyDetailsPage;

  useEffect(() => {
    props.getSocieties();
  }, []);

  return (
    <div>
      <Helmet>
        <title>SocietyDetailsPage</title>
        <meta name="description" content="Description of SocietyDetailsPage" />
      </Helmet>
      <Container>
        <H1 size="32" lineheight="30px" marginbottom="60" gradienttext>
          Societies, Cells and Clubs
        </H1>
        <DropdownSelector
          options={societies}
          placeholder="Choose the Society, cell or club"
          onChange={props.getSocietyDetails}
        />
        {currentSociety && !isSocietyDetailsLoading ? (
          <>
            <H1 size="18" margintop="30" color="#767373">
              {currentSociety.name}
            </H1>
            <div className="left-align-box">
              <P1 size="16" FontWeight="500" margintop="30">
                About
              </P1>
            </div>
            <div className="left-align-box">
              <P1 margintop="5" letterspacing="0.4px">
                {currentSociety.description}
              </P1>
            </div>
            <div className="left-align-box">
              <P1 size="16" FontWeight="500" margintop="30" marginbottom="40">
                Gallery
              </P1>
            </div>
            <div style={{ width: '50%', height: '300px', margin: '0 auto' }}>
              <Carousel
                slides={currentSociety.gallery.map(e => ({
                  key: e._id,
                  content: (
                    <div>
                      <Image
                        width={400}
                        height={300}
                        src={e.imageURL}
                        alt={e._id}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ),
                }))}
                goToSlide={0}
                offsetRadius={2}
                showNavigation
                config={config.gentle}
              />
            </div>
            <div className="left-align-box">
              <P1 size="16" FontWeight="500" margintop="100">
                Contact Details
              </P1>
            </div>
            <div className="grid-box">
              {currentSociety.contacts.map(obj => (
                <ContactsCard {...obj} key={obj._id} />
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

SocietyDetailsPage.propTypes = {
  getSocieties: PropTypes.func.isRequired,
  getSocietyDetails: PropTypes.func.isRequired,
  societyDetailsPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  societyDetailsPage: makeSelectSocietyDetailsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getSocieties: () => dispatch(getSocietiesStart()),
    getSocietyDetails: data => dispatch(getSocietyDetailsStart(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SocietyDetailsPage);
