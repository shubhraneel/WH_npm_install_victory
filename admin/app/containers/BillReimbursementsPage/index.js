/**
 *
 * BillReimbursementsPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import BillReimbursementAdminData from 'components/BillReimbursementAdminData';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBillReimbursementsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getBillsStart, updateBillStart } from './actions';

export function BillReimbursementsPage(props) {
  useInjectReducer({ key: 'billReimbursementsPage', reducer });
  useInjectSaga({ key: 'billReimbursementsPage', saga });

  useEffect(() => {
    props.getBills();
  }, []);

  const { bills } = props.billReimbursementsPage;

  return (
    <div>
      <Helmet>
        <title>BillReimbursementsPage</title>
        <meta
          name="description"
          content="Description of BillReimbursementsPage"
        />
      </Helmet>
      {bills.map(bill => (
        <BillReimbursementAdminData
          {...bill}
          updateBillStart={props.updateBillStart}
        />
      ))}
    </div>
  );
}

BillReimbursementsPage.propTypes = {
  getBills: PropTypes.func.isRequired,
  billReimbursementsPage: PropTypes.array.isRequired,
  updateBillStart: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  billReimbursementsPage: makeSelectBillReimbursementsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getBills: () => dispatch(getBillsStart()),
    updateBillStart: (id, data) => dispatch(updateBillStart(id, data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BillReimbursementsPage);
