/**
 *
 * DepartmentsPage
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
import DepartmentCard from 'components/DepartmentCard';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDepartmentsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getDeptsStart } from './actions';

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

export function DepartmentsPage(props) {
  useInjectReducer({ key: 'departmentsPage', reducer });
  useInjectSaga({ key: 'departmentsPage', saga });

  useEffect(() => {
    props.getDepts();
  }, []);

  const { depts } = props.departmentsPage;

  return (
    <div>
      <Helmet>
        <title>DepartmentsPage</title>
        <meta name="description" content="Description of DepartmentsPage" />
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
            Registered Departments
          </H1>
        </div>
        <div className="grid-box">
          {depts.map(obj => (
            <DepartmentCard {...obj} />
          ))}
        </div>
      </Container>
    </div>
  );
}

DepartmentsPage.propTypes = {
  getDepts: PropTypes.func.isRequired,
  departmentsPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  departmentsPage: makeSelectDepartmentsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDepts: () => dispatch(getDeptsStart()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DepartmentsPage);
