/**
 *
 * EmptyState
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Empty } from 'antd';

function EmptyState() {
  return <Empty />;
}

EmptyState.propTypes = {};

export default memo(EmptyState);
