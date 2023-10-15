/**
 *
 * UploadMediaDisplay
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ImagePreviewDisplay from 'components/ImagePreviewDisplay';

const Container = styled.div`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  .icon {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  height: 22px;
  width: 22px;
  border-radius: 50%;
  background-color: rgb(68 98 255);
  color: #fff;
  font-size: 11px;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const FreePreviewTag = styled.div`
  position: absolute;
  top: 5px;
  left: 10px;
  padding: 2px 10px;
  background-color: rgb(255 128 201);
  border-radius: 8px;
  color: white;
`;

function UploadMediaDisplay(props) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        margin: 'auto 5px',
        flex: 'none',
        overflow: 'hidden',
        borderRadius: '8px',
        background: 'var(--darkIcons)',
        border: '1px solid var(--borderColor)',
      }}
      onClick={props.onClick}
    >
      <Container>
        <ImagePreviewDisplay
          url={props.url}
          height={props.height}
          width={props.width}
        />
      </Container>
      <CloseButton onClick={() => props.removeSelectedFile(props.index)}>
        X
      </CloseButton>
      {props.freePreview ? <FreePreviewTag>Free</FreePreviewTag> : null}
    </div>
  );
}

UploadMediaDisplay.propTypes = {
  url: PropTypes.any.isRequired,
  index: PropTypes.number,
  removeSelectedFile: PropTypes.func.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  freePreview: PropTypes.bool,
  onClick: PropTypes.func,
};

export default memo(UploadMediaDisplay);
