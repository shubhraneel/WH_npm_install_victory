/**
 *
 * CustomModal
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Modal } from 'antd';
const CustomModalComponent = styled(Modal)`
  .ant-modal-content {
    border-radius: 15px;
    margin: 0 auto !important;

    .ant-modal-body {
      padding: 22px 0;
    }

    .ant-modal-close {
      margin-top: 8px;
      margin-right: 6px;
    }
  }
`;

function CustomModal(props) {
  return (
    <CustomModalComponent {...props}>{props.children}</CustomModalComponent>
  );
}

CustomModal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default memo(CustomModal);
