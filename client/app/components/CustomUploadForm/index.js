/**
 *
 * CustomUploadForm
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Radio, Row } from 'antd';

import H1 from 'components/H1';
import P1 from 'components/P1';
import CustomInput from 'components/CustomInput';
import FormUploadButton from 'components/FormUploadButton';
import FileInput from 'components/FileInput';

import UploadIcon from 'images/upload-icon.png';
import { uploadMultipleFiles } from 'utils/uploadMultipleFiles';
import CustomDatePicker from 'components/CustomDatePicker';
import UploadMediaDisplay from 'components/UploadMediaDisplay';
import Spinner from 'components/Spinner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
`;

const FormContainer = styled.div`
  width: 75vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  padding: 30px;

  .radio-options-container {
    width: 100%;

    .ant-radio-group {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;

      .ant-radio-wrapper {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;

        .ant-radio {
          margin-right: 6px !important;
        }
      }
    }
  }

  .buttons-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const PreviewImageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 40px;
  gap: 5px;
`;

function CustomUploadForm(props) {
  const [media, setMedia] = useState([]);
  const [category, setCategory] = useState(undefined);
  const [eventName, setEventName] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [date, setDate] = useState(undefined);
  const [attempts, setAttempts] = useState(undefined);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (!props.isUploading) {
      setMedia([]);
      setCategory(undefined);
      setEventName(undefined);
      setDescription(undefined);
      setDate(undefined);
      setAttempts(undefined);
      setDocuments([]);
    }
  }, [props.isUploading]);

  const addCertificateFiles = event => {
    uploadMultipleFiles(event, setMedia, media);
  };

  const removeCertificate = idx => {
    setMedia([...media.filter((e, i) => i !== idx)]);
  };

  const addDocumentFiles = event => {
    uploadMultipleFiles(event, setDocuments, documents);
  };

  const removeDocument = idx => {
    setDocuments([...documents.filter((e, i) => i !== idx)]);
  };

  if (props.title === 'Achievement Upload Form')
    return (
      <Container>
        <H1 size="28" marginbottom="30px">
          {props.title}
        </H1>
        <FormContainer>
          <P1 marginbottom="20px">Type of Achievement</P1>
          <div className="radio-options-container">
            <Radio.Group onChange={e => setCategory(e.target.value)}>
              <Radio value="Technology">
                <P1>Technology</P1>
              </Radio>
              <Radio value="SocialAndCulture">
                <P1>Social and cultural</P1>
              </Radio>
              <Radio value="SportsAndGames">
                <P1>Sports and Games</P1>
              </Radio>
              <Radio value="StudentWelfare">
                <P1>Student Welfare</P1>
              </Radio>
              <Radio value="Others">
                <P1>Others</P1>
              </Radio>
            </Radio.Group>
          </div>
          <P1 margintop="35">Event Name</P1>
          <CustomInput forminput onChange={setEventName} value={eventName} />
          <P1 margintop="35">Description</P1>
          <CustomInput
            forminput
            onChange={setDescription}
            value={description}
          />
          <P1 margintop="35">Date of Event</P1>
          <CustomDatePicker value={date} onChange={setDate} />
          <P1 margintop="35" marginbottom="20">
            Upload relevant documents{' '}
          </P1>
          <div className="buttons-container">
            <FormUploadButton
              width="100px"
              onClick={() => document.getElementById('certi-upload').click()}
            >
              <img
                style={{
                  width: '15px',
                  height: '15px',
                  objectFit: 'cover',
                  marginRight: '5px',
                }}
                src={UploadIcon}
                alt="Upload Icon"
              />{' '}
              Upload
            </FormUploadButton>
            <FormUploadButton
              width="100px"
              onClick={() =>
                props.handleSubmit({
                  media: media.map(e => e.file),
                  category,
                  eventName,
                  description,
                  date,
                })
              }
            >
              {props.isUploading ? (
                <Spinner color="blue" />
              ) : (
                <Row>
                  <img
                    style={{
                      width: '15px',
                      height: '15px',
                      objectFit: 'cover',
                      marginRight: '5px',
                    }}
                    src={UploadIcon}
                    alt="Upload Icon"
                  />{' '}
                  Submit
                </Row>
              )}
            </FormUploadButton>
          </div>
          <FileInput
            multiple
            acceptedFileType="image/*, application/pdf"
            inputFieldId="certi-upload"
            handleChange={addCertificateFiles}
          />
          <PreviewImageContainer>
            {media.map((obj, idx) => (
              <UploadMediaDisplay
                height="150px"
                width="150px"
                url={obj}
                removeSelectedFile={removeCertificate}
                index={idx}
              />
            ))}
          </PreviewImageContainer>
        </FormContainer>
      </Container>
    );

  if (props.title === 'Students Grievance Form')
    return (
      <Container>
        <H1 size="28" marginbottom="30px">
          {props.title}
        </H1>
        <FormContainer>
          <P1 marginbottom="20px">Type of grievance</P1>
          <div className="radio-options-container">
            <Radio.Group onChange={e => setCategory(e.target.value)}>
              <Radio value="academic">
                <P1>Academic</P1>
              </Radio>
              <Radio value="Payment">
                <P1>Payment</P1>
              </Radio>
              <Radio value="ExtraCurricular">
                <P1>Extracurricular</P1>
              </Radio>
              <Radio value="Scholarship">
                <P1>Scolarship</P1>
              </Radio>
              <Radio value="MentalHealth">
                <P1>Mental Health</P1>
              </Radio>
              <Radio value="Others">
                <P1>Others</P1>
              </Radio>
            </Radio.Group>
          </div>
          <P1 margintop="35">Mention your grievance</P1>
          <CustomInput
            forminput
            onChange={setDescription}
            value={description}
          />
          <P1 margintop="35">
            What attempts have you made to resolve the grievance?
          </P1>
          <CustomInput forminput value={attempts} onChange={setAttempts} />
          <P1 margintop="35" marginbottom="20">
            Upload relevant documents{' '}
          </P1>
          <div className="buttons-container">
            <FormUploadButton
              width="100px"
              onClick={() => document.getElementById('document-upload').click()}
            >
              <img
                style={{
                  width: '15px',
                  height: '15px',
                  objectFit: 'cover',
                  marginRight: '5px',
                }}
                src={UploadIcon}
                alt="Upload Icon"
              />{' '}
              Upload
            </FormUploadButton>
            <FormUploadButton
              width="100px"
              onClick={() =>
                props.handleSubmit({
                  category,
                  documents: documents.map(e => e.file),
                  description,
                  attempts,
                })
              }
            >
              {props.isUploading ? (
                <Spinner color="blue" />
              ) : (
                <Row>
                  <img
                    style={{
                      width: '15px',
                      height: '15px',
                      objectFit: 'cover',
                      marginRight: '5px',
                    }}
                    src={UploadIcon}
                    alt="Upload Icon"
                  />{' '}
                  Submit
                </Row>
              )}
            </FormUploadButton>
          </div>
          <FileInput
            multiple
            acceptedFileType="image/*, application/pdf"
            inputFieldId="document-upload"
            handleChange={addDocumentFiles}
          />
          <PreviewImageContainer>
            {documents.map((obj, idx) => (
              <UploadMediaDisplay
                height="150px"
                width="150px"
                url={obj}
                removeSelectedFile={removeDocument}
                index={idx}
              />
            ))}
          </PreviewImageContainer>
        </FormContainer>
      </Container>
    );
}

CustomUploadForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isUploading: PropTypes.bool,
};

export default memo(CustomUploadForm);
