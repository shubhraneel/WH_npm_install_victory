/* eslint-disable indent */
/* eslint-disable react/prop-types */
/**
 *
 * ProfilePage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import EditIcon from 'images/edit-icon.svg';

import { Row, Divider } from 'antd';

import MasterHeaderBackground from 'components/MasterHeaderBackground';
import H1 from 'components/H1';
import P1 from 'components/P1';

import { makeSelectAuthData } from 'containers/App/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  getProfileStart,
  editProfileStart,
  editProfileEnd,
  changeProfileDetails,
} from './actions';

const Card = styled.div`
  width: 60%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: #ffffff;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  border-radius: 24px;

  .section-1 {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 40px;
    position: relative;
    width: 100%;

    img.profile-image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 40px;
    }

    .text-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }

    .edit-icon {
      position: absolute;
      right: 10px;
      top: 10px;

      &:hover {
        color: #aaa;
      }
    }
  }

  .entry-row {
    display: flex;
    color: #777;
    font-family: Poppins;
    width: 100%;
    padding-left: 3rem;
    font-size: 1.05rem;
    margin-bottom: 0.5rem;

    .entry-name {
      width: 20%;
    }
  }

  input[type='submit'] {
    background-color: #b247a7;
    color: white;
    border-style: solid;
    border-width: 0;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1.05rem;
    margin-top: 1rem;
    margin-left: 3rem;
  }
`;

export function ProfilePage(props) {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });

  useEffect(() => {
    if (props.AuthData.credentials) {
      props.getProfile();
    }
  }, [props.AuthData.credentials]);

  const { profile, editProfile, submitProfile } = props.profilePage;

  const handleSubmit = event => {
    event.preventDefault();
    props.editProfileEnd(submitProfile);
  };
  return (
    <div style={{ position: 'relative', minHeight: '100vh', zIndex: '2' }}>
      <Helmet>
        <title>ProfilePage</title>
        <meta name="description" content="Description of ProfilePage" />
      </Helmet>
      <MasterHeaderBackground secondary />
      <Row style={{ width: '100%', justifyContent: 'center', padding: '40px' }}>
        <H1 color="#fff" size="32" lineheight="30px">
          Profile Page
        </H1>
      </Row>
      {profile !== {} ? (
        <form onSubmit={handleSubmit}>
          <Row style={{ width: '100%', justifyContent: 'center' }}>
            <Card>
              <div className="section-1">
                <img
                  className="profile-image"
                  src={profile.imageSrc || 'https://i.pravatar.cc'}
                  alt="Profile"
                />
                <div className="text-container">
                  <H1 size="28">{profile.name}</H1>
                  <P1 margintop="20" size="20">
                    {profile.rollNo}
                  </P1>
                </div>
                <div
                  aria-hidden="true"
                  className="edit-icon"
                  onClick={props.editProfileStart}
                >
                  <img src={EditIcon} alt="Edit Profile" />
                </div>
              </div>
              <Divider orientation="left">
                <P1 color="#000000" size="20" FontWeight="500">
                  Personal Details
                </P1>
              </Divider>
              <div className="entry-row">
                <div className="entry-name">Gender:</div>
                <div className="entry-value">{profile.gender || '-'}</div>
              </div>
              <div className="entry-row">
                <div className="entry-name">Date of Birth:</div>
                <div className="entry-value">
                  {profile.dob
                    ? new Date(profile.dob).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : '-'}
                </div>
              </div>
              {profile.phone || profile.email ? (
                <Divider orientation="left">
                  <P1 color="#000000" size="20" FontWeight="500">
                    Contact Details
                  </P1>
                </Divider>
              ) : null}
              {profile.phone ? (
                <div className="entry-row">
                  <div className="entry-name">Phone:</div>
                  {editProfile ? (
                    <input
                      name="phone"
                      type="text"
                      className="form-text-field"
                      value={submitProfile.phone}
                      onChange={props.changeProfileDetails}
                    />
                  ) : (
                    <div className="entry-value">{profile.phone}</div>
                  )}
                </div>
              ) : null}
              {profile.email ? (
                <div className="entry-row">
                  <div className="entry-name">Email:</div>
                  {editProfile ? (
                    <input
                      name="email"
                      type="email"
                      className="form-text-field"
                      value={submitProfile.email}
                      onChange={props.changeProfileDetails}
                    />
                  ) : (
                    <div className="entry-value">
                      <a href={`mailto:${profile.email}`}>{profile.email}</a>
                    </div>
                  )}
                </div>
              ) : null}
              {profile.department ||
              profile.hall ||
              profile.society ||
              profile.course ? (
                <Divider orientation="left">
                  <P1 color="#000000" size="20" FontWeight="500">
                    Other Details
                  </P1>
                </Divider>
              ) : null}
              {profile.department ? (
                <div className="entry-row">
                  <div className="entry-name">Department:</div>
                  <div className="entry-value">
                    {profile.department.departmentName}
                  </div>
                </div>
              ) : null}
              {profile.course ? (
                <div className="entry-row">
                  <div className="entry-name">Course:</div>
                  {editProfile ? (
                    <input
                      name="course"
                      type="text"
                      className="form-text-field"
                      value={submitProfile.course}
                      onChange={props.changeProfileDetails}
                    />
                  ) : (
                    <div className="entry-value">{profile.course}</div>
                  )}
                </div>
              ) : null}
              {profile.hall ? (
                <div className="entry-row">
                  <div className="entry-name">Hall:</div>
                  <div className="entry-value">{profile.hall.name}</div>
                </div>
              ) : null}
              {/* {profile.department ? (
              <div className="entry-row">
                <div className="entry-name">Societies:</div>
                <div className="entry-value">{profile.society}</div>
              </div>
            ) : null} */}
              {editProfile ? <input type="submit" /> : null}
            </Card>
          </Row>
        </form>
      ) : null}
    </div>
  );
}

ProfilePage.propTypes = {
  getProfile: PropTypes.func.isRequired,
  AuthData: PropTypes.object.isRequired,
  profilePage: PropTypes.object.isRequired,
  editProfileEnd: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePage(),
  AuthData: makeSelectAuthData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getProfile: () => dispatch(getProfileStart()),
    editProfileStart: () => dispatch(editProfileStart()),
    editProfileEnd: data => dispatch(editProfileEnd(data)),
    changeProfileDetails: data => dispatch(changeProfileDetails(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProfilePage);
