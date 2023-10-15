/**
 *
 * SocietyOfficialSelector
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import P1 from 'components/P1';

const Container = styled.div`
  width: 80%;
  border-radius: 10px;
  border: 2px dotted grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

function SocietyOfficialSelector(props) {
  const [rollNo, setRollNo] = useState(undefined);

  return (
    <Container>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SearchOutlined
          onClick={() => props.searchStudent(rollNo, props.role)}
          style={{
            fontSize: '30px',
            color: '#1890ff',
            marginTop: '15px',
            cursor: 'pointer',
            border: '3px solid #1890ff',
            borderRadius: '50%',
            padding: '10px',
          }}
        />
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flexStart',
            justifyContent: 'center',
            padding: '10px',
            marginTop: '20px',
          }}
        >
          <P1 Color="rgb(196 206 227)">Student Roll No.</P1>
          <Input
            size="small"
            placeholder="Roll Number"
            style={{ height: '35px' }}
            value={rollNo}
            onChange={e => setRollNo(e.target.value)}
          />
          <P1 Color="rgb(196 206 227)" margintop="15">
            Student Role in Society
          </P1>
          <Input
            size="small"
            placeholder="Role"
            style={{ height: '35px' }}
            value={props.role}
            onChange={e => props.setRole(e.target.value)}
          />
          <P1 Color="rgb(196 206 227)" margintop="15">
            Login Password
          </P1>
          <Input.Password
            size="small"
            placeholder="Login Password"
            style={{ height: '35px' }}
            value={props.password}
            onChange={e => props.setPassword(e.target.value)}
          />
        </div>
      </div>
    </Container>
  );
}

SocietyOfficialSelector.propTypes = {
  searchStudent: PropTypes.func.isRequired,
  password: PropTypes.string,
  setPassword: PropTypes.func.isRequired,
  role: PropTypes.string,
  setRole: PropTypes.func.isRequired,
};

export default memo(SocietyOfficialSelector);
