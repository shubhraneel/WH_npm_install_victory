/* eslint-disable no-nested-ternary */
/**
 *
 * StudentsPointPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import history from 'utils/history';

import MasterHeaderBackground from 'components/MasterHeaderBackground';
import CommonHeader from 'components/CommonHeader';
import TitleCard from 'components/TitleCard';
import StudentsPointAcademic from 'components/StudentsPointAcademic';
import StudentsPointCareer from 'components/StudentsPointCareer';

import StudentsPointIllustration from 'images/students-point-header.png';
import AcademicIcon from 'images/academicIcon.png';
import CareerIcon from 'images/careerIcon.png';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectStudentsPointPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getAcademicResourcesStart, getCareerResourcesStart } from './actions';

const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 50px 20vw;
  flex-wrap: wrap;
  gap: 2rem;
`;

export function StudentsPointPage(props) {
  useInjectReducer({ key: 'studentsPointPage', reducer });
  useInjectSaga({ key: 'studentsPointPage', saga });

  const { pathname } = history.location;
  const { academicResources, careerResorces } = props.studentsPointPage;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', zIndex: '2' }}>
      <Helmet>
        <title>StudentsPointPage</title>
        <meta name="description" content="Description of StudentsPointPage" />
      </Helmet>
      <MasterHeaderBackground secondary />
      <CommonHeader
        title="Students’ Point"
        description="Amet venenatis urna cursus eget. Sed euismod nisi porta lorem mollis
            aliquam ut porttitor. Neque laoreet suspendisse interdum consectetur
            libero. Tellus elementum sagittis vitae et leo duis ut. Vitae
            ultricies leo integer malesuada nunc vel risus commodo"
        imageSrc={StudentsPointIllustration}
      />
      {pathname === '/students-point' ? (
        <CardsContainer>
          <Link to="/students-point/academic">
            <TitleCard imageSrc={AcademicIcon} title="Academic Point" />
          </Link>
          <Link to="/students-point/career">
            <TitleCard imageSrc={CareerIcon} title="Career Point" />
          </Link>
        </CardsContainer>
      ) : pathname === '/students-point/academic' ? (
        <StudentsPointAcademic
          getAcademicResources={props.getAcademicResources}
          academicResources={academicResources}
        />
      ) : pathname === '/students-point/career' ? (
        <StudentsPointCareer
          getCareerResources={props.getCareerResources}
          careerResorces={careerResorces}
        />
      ) : null}
    </div>
  );
}

StudentsPointPage.propTypes = {
  getAcademicResources: PropTypes.func.isRequired,
  studentsPointPage: PropTypes.object.isRequired,
  getCareerResources: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentsPointPage: makeSelectStudentsPointPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAcademicResources: dept => dispatch(getAcademicResourcesStart(dept)),
    getCareerResources: () => dispatch(getCareerResourcesStart()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(StudentsPointPage);
