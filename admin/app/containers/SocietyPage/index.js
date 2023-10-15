/**
 *
 * SocietyPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import H1 from 'components/H1';
import SocietyCard from 'components/SocietyCard';
import AddSocietyModal from 'components/AddSocietyModal';
import PrimaryButton from 'components/PrimaryButton';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSocietyPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getSocititesStart, addSocietyAsync } from './actions';

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

export function SocietyPage(props) {
  useInjectReducer({ key: 'societyPage', reducer });
  useInjectSaga({ key: 'societyPage', saga });

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    props.getSocitites();
  }, []);

  const { societies, uploadProgress } = props.societyPage;

  return (
    <div
      style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}
    >
      <Helmet>
        <title>SocietyPage</title>
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
            Registered Societies
          </H1>
          <PrimaryButton
            type="primary"
            height="30px"
            width="150px"
            iconsize="14"
            onClick={() => setIsModalVisible(true)}
          >
            Add Society
          </PrimaryButton>
        </div>
        <div className="grid-box">
          {societies.map(obj => (
            <SocietyCard {...obj} />
          ))}
        </div>
        <AddSocietyModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          addSociety={props.addSociety}
          uploadProgress={uploadProgress}
        />
      </Container>
    </div>
  );
}

SocietyPage.propTypes = {
  getSocitites: PropTypes.func.isRequired,
  societyPage: PropTypes.object.isRequired,
  addSociety: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  societyPage: makeSelectSocietyPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getSocitites: () => dispatch(getSocititesStart()),
    addSociety: data => dispatch(addSocietyAsync(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SocietyPage);
