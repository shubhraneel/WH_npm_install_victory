/**
 *
 * FileInput
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function FileInput(props) {
  return (
    <input
      multiple={props.multiple}
      type="file"
      accept={props.acceptedFileType}
      style={{ display: 'none' }}
      id={props.inputFieldId}
      onChange={event => props.handleChange(event)}
    />
  );
}

FileInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  acceptedFileType: PropTypes.string.isRequired,
  inputFieldId: PropTypes.string.isRequired,
};

export default memo(FileInput);
