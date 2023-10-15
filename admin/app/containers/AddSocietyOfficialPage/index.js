/**
 *
 * AddSocietyOfficialPage
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Divider, Row } from 'antd';

import H1 from 'components/H1';
import PrimaryButton from 'components/PrimaryButton';
import SocietyOfficialSelector from 'components/SocietyOfficialSelector';
import StudentSearchCard from 'components/StudentSearchCard';

import { makeSelectAuthData } from 'containers/App/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAddSocietyOfficialPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { searchStudentStart, addOfficialsStart } from './actions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  min-height: 80vh;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  border-radius: 16px;
  background: #fff;
  padding: 25px;

  .top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .grid-box {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    grid-gap: 60px;
  }
`;

export function AddSocietyOfficialPage(props) {
  useInjectReducer({ key: 'addSocietyOfficialPage', reducer });
  useInjectSaga({ key: 'addSocietyOfficialPage', saga });

  const { searchResults, isSearching } = props.addSocietyOfficialPage;

  const [password, setPassword] = useState(undefined);
  const [role, setRole] = useState(undefined);

  const createNewOfficial = () => {
    const data = {
      name: searchResults.name,
      profilePic: searchResults.profilePic,
      password,
      confirmPassword: password,
      email: searchResults.email,
      role: 'societyOfficial',
      roleMetadata: {
        position: role,
        society: props.AuthData.credentials.roleMetadata.society,
      },
      phone: searchResults.phone,
      gender: searchResults.gender,
    };

    props.addOfficials(data);
  };

  return (
    <div>
      <Helmet>
        <title>AddSocietyOfficialPage</title>
        <meta
          name="description"
          content="Description of AddSocietyOfficialPage"
        />
      </Helmet>
      <Row style={{ width: '100%' }} justify="center">
        <Container>
          <div className="top">
            <H1 size="20">Add Society Official</H1>
            <PrimaryButton
              type="primary"
              width="150px"
              height="35px"
              onClick={createNewOfficial}
            >
              Save
            </PrimaryButton>
          </div>
          <Divider />
          <div className="grid-box">
            <SocietyOfficialSelector
              searchStudent={props.searchStudent}
              isSearching={isSearching}
              password={password}
              setPassword={setPassword}
              role={role}
              setRole={setRole}
            />
            {/* eslint-disable-next-line no-underscore-dangle */}
            {searchResults._id ? (
              <StudentSearchCard
                {...searchResults}
                designation={role}
                // eslint-disable-next-line no-underscore-dangle
                key={searchResults._id}
              />
            ) : null}
          </div>
        </Container>
      </Row>
    </div>
  );
}

AddSocietyOfficialPage.propTypes = {
  searchStudent: PropTypes.func.isRequired,
  addSocietyOfficialPage: PropTypes.object.isRequired,
  addOfficials: PropTypes.func.isRequired,
  AuthData: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addSocietyOfficialPage: makeSelectAddSocietyOfficialPage(),
  AuthData: makeSelectAuthData(),
});

function mapDispatchToProps(dispatch) {
  return {
    searchStudent: (rollNo, role) => dispatch(searchStudentStart(rollNo, role)),
    addOfficials: data => dispatch(addOfficialsStart(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddSocietyOfficialPage);
