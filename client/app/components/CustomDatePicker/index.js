/**
 *
 * CustomDatePicker
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DatePicker } from 'antd';

const MyDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 5px !important;
  background-color: transparent !important;
  /* border-radius: 5px !important; */
  border: none !important;
  border-bottom: 1.5px solid #767373 !important;
  height: 67px !important;
  outline: none;
  box-shadow: none !important;

  .ant-picker-input {
    input {
      color: #333333 !important;
      font-size: 16px !important;
      outline: none;
    }
    input::placeholder {
      color: rgb(159 159 159) !important;
    }
  }
`;

function CustomDatePicker(props) {
  return (
    <MyDatePicker
      format="DD/MM/YYYY"
      // eslint-disable-next-line no-underscore-dangle
      onChange={date => props.onChange(new Date(date._d))}
      placeholder={props.placeholder}
    />
  );
}

CustomDatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.any,
};

export default memo(CustomDatePicker);
