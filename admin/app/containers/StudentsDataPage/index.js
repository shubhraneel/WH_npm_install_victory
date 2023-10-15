/**
 *
 * StudentsDataPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import XLSX from 'xlsx';
import { Link } from 'react-router-dom';

import { Space } from 'antd';

import H1 from 'components/H1';
import CustomTable from 'components/CustomTable';
import PrimaryButton from 'components/PrimaryButton';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectStudentsDataPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getStudentsDataStart, addStudentsStart } from './actions';

export function StudentsDataPage(props) {
  useInjectReducer({ key: 'studentsDataPage', reducer });
  useInjectSaga({ key: 'studentsDataPage', saga });

  useEffect(() => {
    props.getStudentsData();
  }, []);

  const { studentsData } = props.studentsDataPage;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      searchable: true,
    },
    {
      title: 'Roll Number',
      dataIndex: 'rollNo',
      key: 'rollNo',
      width: '20%',
      searchable: true,
      sorter: (a, b) => a.rollNo > b.rollNo,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      searchable: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: '15%',
    },
    {
      title: 'Action',
      key: 'action',
      render: obj => (
        <Space size="middle">
          {/* eslint-disable-next-line no-underscore-dangle */}
          <Link to={`/students-data/${obj._id}`}>View Profile</Link>
        </Space>
      ),
    },
  ];

  const handleAddStudentsClick = () => {
    document.getElementById('add-students').click();
  };

  const parseExcelSheet = file => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      const bstr = e.target.result;
      const workbook = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      // eslint-disable-next-line camelcase
      const sheet_name_list = workbook.SheetNames[0];
      const jsonFromExcel = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list],
        {
          raw: false,
          dateNF: 'MM-DD-YYYY',
          header: 1,
          defval: '',
        },
      );

      const studentsDataArray = [];
      const keyArray = jsonFromExcel[0];
      for (let i = 1; i < jsonFromExcel.length; i += 1) {
        const currentArray = jsonFromExcel[i];
        const obj = {};
        currentArray.forEach((ele, idx) => {
          obj[keyArray[idx]] = ele;
        });

        studentsDataArray.push(obj);
      }

      props.addStudents(studentsDataArray);
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  return (
    <div
      style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}
    >
      <Helmet>
        <title>StudentsDataPage</title>
        <meta name="description" content="Description of StudentsDataPage" />
      </Helmet>
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
          Registered Students Data
        </H1>
        <PrimaryButton
          type="primary"
          height="30px"
          width="150px"
          iconsize="14"
          onClick={handleAddStudentsClick}
        >
          Add Students
        </PrimaryButton>
        <input
          type="file"
          style={{ display: 'none' }}
          id="add-students"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={e => parseExcelSheet(e.target.files[0])}
        />
      </div>
      <CustomTable columns={columns} dataSource={studentsData} />
    </div>
  );
}

StudentsDataPage.propTypes = {
  getStudentsData: PropTypes.func.isRequired,
  studentsDataPage: PropTypes.object.isRequired,
  addStudents: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentsDataPage: makeSelectStudentsDataPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getStudentsData: () => dispatch(getStudentsDataStart()),
    addStudents: data => dispatch(addStudentsStart(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(StudentsDataPage);
