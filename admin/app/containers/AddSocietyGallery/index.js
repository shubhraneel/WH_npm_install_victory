/**
 *
 * AddSocietyGallery
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Divider, Row, Image, Spin } from 'antd';

import H1 from 'components/H1';
import PrimaryButton from 'components/PrimaryButton';
import GalleryImageSelector from 'components/GalleryImageSelector';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAddSocietyGallery from './selectors';
import reducer from './reducer';
import saga from './saga';

import { uploadAsync } from './actions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  min-height: 80vh;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  border-radius: 16px;
  background: #fff;
  padding: 25px;

  .top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .grid-box {
    width: 100%;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
    justify-items: center;
    align-items: center;

    div {
      width: 100%;
      height: 200px;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 10px !important;
      }
    }
  }
`;

export function AddSocietyGallery(props) {
  useInjectReducer({ key: 'addSocietyGallery', reducer });
  useInjectSaga({ key: 'addSocietyGallery', saga });

  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);

  const { progress } = props.addSocietyGallery;

  const selectImage = event => {
    const { files: eventFiles } = event.target;

    const fileArr = [];
    Object.keys(eventFiles).map(key => fileArr.push(eventFiles[key]));
    setFiles([...files, ...fileArr]);

    setUrls([...urls, ...fileArr.map(e => URL.createObjectURL(e))]);
  };

  return (
    <div>
      <Helmet>
        <title>AddSocietyGallery</title>
        <meta name="description" content="Description of AddSocietyGallery" />
      </Helmet>
      <Row style={{ width: '100%' }} justify="center">
        <Container>
          <div className="top">
            <H1 size="20">Add Image to Society Gallery</H1>
            <PrimaryButton
              type="primary"
              width="150px"
              height="35px"
              onClick={() => props.uploadAsync(files)}
            >
              Save
            </PrimaryButton>
          </div>
          <Divider />
          <div className="grid-box">
            {progress !== false ? (
              <Spin size="large" />
            ) : (
              <GalleryImageSelector selectImage={selectImage} />
            )}

            {urls.map(url => (
              <Image.PreviewGroup>
                <Image src={url} />
              </Image.PreviewGroup>
            ))}
          </div>
        </Container>
      </Row>
    </div>
  );
}

AddSocietyGallery.propTypes = {
  uploadAsync: PropTypes.func.isRequired,
  addSocietyGallery: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addSocietyGallery: makeSelectAddSocietyGallery(),
});

function mapDispatchToProps(dispatch) {
  return {
    uploadAsync: data => dispatch(uploadAsync(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddSocietyGallery);
