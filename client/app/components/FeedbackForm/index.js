/**
 *
 * FeedbackForm
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import P1 from 'components/P1';
import CustomInput from 'components/CustomInput';
import CustomTextArea from 'components/CustomTextArea';
import PrimaryButton from 'components/PrimaryButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  max-width: 50rem;
  margin-bottom: 50px;
`;

const RowInputs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

function FeedbackForm() {
  return (
    <Container>
      <P1 color="rgba(51, 51, 51, 1)" marginbottom="50" size="20">
        Give your feedback below
      </P1>
      <RowInputs>
        <CustomInput label="Name" />
        <CustomInput label="Email" />
      </RowInputs>
      <CustomTextArea label="Your Feedback" rows={6} />
      <PrimaryButton width="30%" margintop="40px">
        Submit
      </PrimaryButton>
    </Container>
  );
}

FeedbackForm.propTypes = {};

export default memo(FeedbackForm);
