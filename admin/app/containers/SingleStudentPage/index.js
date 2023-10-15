/**
 *
 * SingleStudentPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSingleStudentPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getStudentDataStart } from './actions';

export function SingleStudentPage(props) {
  useInjectReducer({ key: 'singleStudentPage', reducer });
  useInjectSaga({ key: 'singleStudentPage', saga });

  useEffect(() => {
    props.getStudentData(props.match.params.id);
  }, []);

  return (
    <div>
      <Helmet>
        <title>SingleStudentPage</title>
        <meta name="description" content="Description of SingleStudentPage" />
      </Helmet>
    </div>
  );
}

SingleStudentPage.propTypes = {
  getStudentData: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  singleStudentPage: makeSelectSingleStudentPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getStudentData: id => dispatch(getStudentDataStart(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SingleStudentPage);
