/**
 *
 * SocietyGallery
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Image } from 'antd';

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;
  grid-gap: 20px;
  padding: 30px;

  img {
    object-fit: cover;
  }
`;

function SocietyGallery(props) {
  return (
    <Container>
      <Image.PreviewGroup>
        {props.gallery.map(obj => (
          <Image src={obj.imageURL} height={250} width="100%" />
        ))}
      </Image.PreviewGroup>
    </Container>
  );
}

SocietyGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
};

export default memo(SocietyGallery);
