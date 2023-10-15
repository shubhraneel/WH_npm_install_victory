/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * AchievementCard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { saveAs } from 'file-saver';
import { Image } from 'antd';

import P1 from 'components/P1';

import PreviewIcon from 'images/preview-icon.png';
import DownloadIcon from 'images/download-icon.png';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  height: 200px;
  border-bottom: 4px solid rgba(118, 115, 115, 0.6);

  .event-image {
    height: 120px;
    width: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }

  .details-box {
    height: 40%;
    flex: 1.8;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    margin-right: 15px;
  }

  .action-card {
    position: relative;
    flex: 0.5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
    margin-right: 15px;
    height: 120px;
    cursor: pointer;

    .action-image {
      height: 60px;
      object-fit: cover;
      margin-bottom: 10px;
    }

    .ant-image {
      position: absolute !important;
      height: 100% !important;
      width: 100% !important;
      z-index: 10 !important;
    }
  }
`;

function AchievementCard(props) {
  const downloadMedia = () => {
    saveAs('image_url', props.certificate);
  };

  return (
    <Container>
      <img
        className="event-image"
        src={`https://ui-avatars.com/api/?name=${
          props.eventName
        }&background=random`}
        alt="Achievement"
      />
      <div className="details-box">
        <P1 size="18" color="black" FontWeight="500" marginbottom="10">
          {props.eventName}
        </P1>
        <P1>{props.description}</P1>
      </div>
      <div className="action-card">
        <Image src={props.certificate} preview height={0} width={0} />
        <img className="action-image" src={PreviewIcon} alt="Action Icon" />
        <P1 color="#767373">Preview</P1>
      </div>
      <div className="action-card" onClick={downloadMedia}>
        <img src={DownloadIcon} alt="Action Icon" />
        <P1>Download</P1>
      </div>
    </Container>
  );
}

AchievementCard.propTypes = {
  certificate: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default memo(AchievementCard);
