/* eslint-disable indent */
/**
 *
 * CustomInput
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputContainer = styled.div`
  width: 100% !important;
  position: relative;
  margin-bottom: ${props => (props.$nomargin ? '0' : '20px')};

  .input {
    width: 100% !important;
    padding: ${props => (props.$forminput ? '5px' : '30px 15px 10px 20px')};
    border-radius: ${props => (props.$forminput ? '0' : '5px')};
    background-color: transparent;
    border: ${props => (props.$forminput ? 'none' : '1.5px solid #767373')};
    border-bottom: 1.5px solid #767373;
    outline: none;
    color: #333333;
    font-size: 16px;
    transition: all 0.4s;
  }

  .label {
    position: absolute;
    top: ${props => (props.$labeltop ? props.$labeltop : '12px')} !important;
    left: 20px;
    color: rgb(116 116 116);
    transition: all 0.4s;
  }

  .input:placeholder-shown {
    padding: 20px 15px 20px 30px;
  }

  .input:placeholder-shown + .label {
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
  }

  .input-icon {
    visibility: visible;
    position: absolute;
    left: 0px;
    top: 0;
    transform: translate(19px, 30px);
  }

  .input:placeholder-shown + .input-icon {
    visibility: hidden;
  }
`;

function CustomInput(props) {
  const handleChange = event => {
    event.preventDefault();
    if (props.onChangeWithEvent) {
      props.onChange(event);
    } else {
      props.onChange(event.target.value);
    }
  };
  return (
    <InputContainer
      $nomargin={props.nomargin}
      $labeltop={props.labeltop}
      $forminput={props.forminput}
    >
      <input
        disabled={props.disabled}
        placeholder={props.label}
        className="input"
        id={props.inputId}
        onChange={handleChange}
        type={props.type ? props.type : 'text'}
        value={props.value || ''}
        required={props.required}
        name={props.name}
      />
      <label className="label" htmlFor={props.inputId}>
        {props.label}
      </label>
    </InputContainer>
  );
}

CustomInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  type: PropTypes.string,
  nomargin: PropTypes.bool,
  labeltop: PropTypes.string,
  name: PropTypes.string,
  onChangeWithEvent: PropTypes.bool,
  inputId: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  forminput: PropTypes.bool,
};

export default memo(CustomInput);
