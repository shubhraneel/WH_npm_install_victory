/**
 *
 * GalleryImageSelector
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PlusCircleOutlined } from '@ant-design/icons';
import P1 from 'components/P1';

const Container = styled.div`
  width: 80%;
  height: 80%;
  border-radius: 10px;
  border: 2px dotted grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

function GalleryImageSelector(props) {
  const handleImageClick = () => {
    if (document.getElementById('upload-gallery-image')) {
      document.getElementById('upload-gallery-image').click();
    }
  };

  return (
    <Container onClick={handleImageClick}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PlusCircleOutlined
          style={{ fontSize: '36px', color: 'rgb(196 206 227)' }}
        />
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-gallery-image"
          onChange={event => {
            props.selectImage(event);
          }}
          multiple
        />
        <P1 size="16" Color="rgb(196 206 227)" margintop="10">
          Add images
        </P1>
      </div>
    </Container>
  );
}

GalleryImageSelector.propTypes = {
  selectImage: PropTypes.func.isRequired,
};

export default memo(GalleryImageSelector);
