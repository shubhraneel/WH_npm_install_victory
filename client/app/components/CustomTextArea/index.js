/**
 * CustomTextArea
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Input } from 'antd';

const { TextArea } = Input;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 10px;
`;

const StyledTextArea = styled(TextArea)`
  width: 100%;
  padding: 30px 10px 10px 10px !important;
  border-radius: 5px;
  background-color: transparent;
  border: 1.5px solid #767373;
  outline: none;
  color: #333333;
  font-size: 16px;

  textarea {
    width: 100% !important;
    border: none !important;
    outline: none !important;
    background-color: transparent;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 10px;
  left: 20px;
  color: rgb(116 116 116);
`;

function CustomTextArea(props) {
  const handleChange = event => {
    props.onChange(event.target.value);
  };
  return (
    <InputContainer>
      <StyledTextArea
        autoSize={{ minRows: props.rows }}
        id={props.inputId}
        onChange={handleChange}
        type={props.type ? props.type : 'text'}
        value={props.value}
        maxLength={2000}
        showCount
      />
      <Label htmlFor={props.inputId}>{props.label}</Label>
    </InputContainer>
  );
}

CustomTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  rows: PropTypes.string,
  inputId: PropTypes.string,
  value: PropTypes.string,
};

export default memo(CustomTextArea);
