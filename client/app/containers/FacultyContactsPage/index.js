/**
 *
 * FacultyContactsPage
 *
 */

import React, { memo, useEffect } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import H1 from 'components/H1';
import DropdownSelector from 'components/DropdownSelector';
import FacultyContactCard from 'components/FacultyContactCard';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFacultyContactsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getContactsStart, getDepartmentsStart } from './actions';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

export function FacultyContactsPage(props) {
  useInjectReducer({ key: 'facultyContactsPage', reducer });
  useInjectSaga({ key: 'facultyContactsPage', saga });

  const {
    departments,
    isDepartmentsLoading,
    contacts,
    isContactsLoading,
  } = props.facultyContactsPage;

  useEffect(() => {
    props.getDepartments();
  }, []);

  return (
    <div>
      <Helmet>
        <title>FacultyContactsPage</title>
        <meta name="description" content="Description of FacultyContactsPage" />
      </Helmet>
      <Container>
        <H1 size="32" lineheight="30px" marginbottom="60" gradienttext>
          Faculty Contacts
        </H1>
        <DropdownSelector
          options={departments.map(e => {
            return { _id: e._id, name: e.departmentName };
          })}
          placeholder="Choose your hall"
          onChange={props.getContacts}
        />
        {contacts
          ? contacts.faculty.map(obj => <FacultyContactCard {...obj} />)
          : null}
      </Container>
    </div>
  );
}

FacultyContactsPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  facultyContactsPage: makeSelectFacultyContactsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDepartments: () => dispatch(getDepartmentsStart()),
    getContacts: getCont => dispatch(getContactsStart(getCont)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FacultyContactsPage);
