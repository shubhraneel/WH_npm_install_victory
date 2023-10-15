/**
 *
 * ImagePreviewDisplay
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Image } from 'antd';

const PreviewDisplay = styled(Image)`
  height: ${props => props.height}!important;
  width: ${props => props.width} !important;
  border-radius: 6px !important;
  object-fit: cover !important;
`;

function ImagePreviewDisplay(props) {
  return (
    <PreviewDisplay
      src={props.url.url}
      height={props.height}
      width={props.width}
      preview
    />
  );
}

ImagePreviewDisplay.propTypes = {
  url: PropTypes.object.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default memo(ImagePreviewDisplay);
