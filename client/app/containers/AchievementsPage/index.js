/**
 *
 * AchievementsPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import history from 'utils/history';

import MasterHeaderBackground from 'components/MasterHeaderBackground';
import StudentDetailsCard from 'components/StudentDetailsCard';
import StudentAcheivements from 'components/StudentAcheivements';
import CustomUploadForm from 'components/CustomUploadForm';
import HeaderIllustration from 'images/acheievements-page-head.png';
import Spinner from 'components/Spinner';

import { makeSelectAuthData } from 'containers/App/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Row } from 'antd';
import makeSelectAchievementsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  uploadAchievementAsync,
  uploadGrievanceAsync,
  getCountStart,
} from './actions';

const StudentDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px;
  margin-bottom: 85px;

  img {
    width: 40vw;
  }
`;

export function AchievementsPage(props) {
  useInjectReducer({ key: 'achievementsPage', reducer });
  useInjectSaga({ key: 'achievementsPage', saga });

  const {
    isAchievementUploading,
    isGrievanceUploading,
    count,
    userData,
  } = props.achievementsPage;

  if (!props.AuthData.credentials) history.goBack();

  useEffect(() => {
    props.getCount();
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', zIndex: '2' }}>
      <Helmet>
        <title>AchievementsPage</title>
        <meta name="description" content="Description of AchievementsPage" />
      </Helmet>
      <MasterHeaderBackground secondary />
      {userData ? (
        <StudentDetailsContainer>
          <StudentDetailsCard userData={userData} />
          <img src={HeaderIllustration} alt="HeaderIllustration" />
        </StudentDetailsContainer>
      ) : (
        <Row
          justify="center"
          style={{ width: '100%', paddingTop: '30vh', height: '100vh' }}
        >
          <Spinner size="30px" />
        </Row>
      )}

      <StudentAcheivements count={count} />
      <CustomUploadForm
        title="Achievement Upload Form"
        handleSubmit={props.uploadAchievement}
        isUploading={isAchievementUploading}
      />
      <CustomUploadForm
        title="Students Grievance Form"
        handleSubmit={props.uploadGrievance}
        isUploading={isGrievanceUploading}
      />
    </div>
  );
}

AchievementsPage.propTypes = {
  AuthData: PropTypes.object.isRequired,
  uploadAchievement: PropTypes.func.isRequired,
  uploadGrievance: PropTypes.func.isRequired,
  achievementsPage: PropTypes.object.isRequired,
  getCount: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  achievementsPage: makeSelectAchievementsPage(),
  AuthData: makeSelectAuthData(),
});

function mapDispatchToProps(dispatch) {
  return {
    uploadAchievement: data => dispatch(uploadAchievementAsync(data)),
    uploadGrievance: data => dispatch(uploadGrievanceAsync(data)),
    getCount: () => dispatch(getCountStart()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AchievementsPage);
