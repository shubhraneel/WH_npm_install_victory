/* eslint-disable no-nested-ternary */
/**
 *
 * LoginCard
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import H1 from 'components/H1';
import P1 from 'components/P1';
import PrimaryButton from 'components/PrimaryButton';
import CustomInput from 'components/CustomInput';
import Spinner from 'components/Spinner';

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 60px;
  background-color: #fff;
  width: 90%;
  max-width: 50rem;
  height: fit-content;
  border-radius: 25px;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
`;

const LoginOptionsContainer = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

const InputBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const LoginForStudents = props => (
  <InputBoxContainer>
    {props.currentInput === 'email' ? (
      <CustomInput
        label="Email"
        type="email"
        value={props.email}
        onChange={props.setEmail}
      />
    ) : (
      <CustomInput
        label="OTP"
        type="text"
        value={props.otp}
        onChange={props.setOtp}
      />
    )}
    <PrimaryButton
      padding="1rem 2rem"
      width="auto"
      margintop="40px"
      onClick={props.handleLoginForStudentClick}
    >
      {props.isOtpSending && props.currentInput !== 'email' ? (
        <Spinner />
      ) : props.currentInput === 'email' ? (
        'REQUEST OTP'
      ) : (
        'LOGIN'
      )}
    </PrimaryButton>
    {props.currentInput !== 'email' ? (
      <P1
        color="#00aff0"
        margintop="15"
        onClick={() => props.setCurrentInput('email')}
      >
        Change Email
      </P1>
    ) : null}
  </InputBoxContainer>
);

LoginForStudents.propTypes = {
  email: PropTypes.string,
  otp: PropTypes.string,
  setEmail: PropTypes.func.isRequired,
  setOtp: PropTypes.func.isRequired,
  currentInput: PropTypes.string.isRequired,
  setCurrentInput: PropTypes.func.isRequired,
  handleLoginForStudentClick: PropTypes.func.isRequired,
  isOtpSending: PropTypes.bool,
};

const LoginForOfficials = () => (
  <a
    href={
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000/'
        : 'https://website-hackathon-admin.web.app/'
    }
    target="_blank"
  >
    <PrimaryButton
      width="250px"
      height="40px"
      fontWeight="600"
      transparentbg
      margintop="50px"
      marginbottom="50px"
      border="2px dashed black"
      iconcolor="black"
    >
      Go To Officials Website
    </PrimaryButton>
  </a>
);

LoginForOfficials.propTypes = {};

function LoginCard(props) {
  const [currentOption, setCurrentOption] = useState('students');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentInput, setCurrentInput] = useState('email');

  const handleOptionClick = value => setCurrentOption(value);

  useEffect(() => {
    if (props.otpError) {
      setCurrentInput('email');
      setEmail('');
    }
  }, [props.otpError]);

  const handleLoginForStudentClick = () => {
    if (currentInput === 'email') {
      props.requestOtp(email);
      setCurrentInput('otp');
    } else {
      props.loginStudent(email, otp);
    }
  };

  return (
    <CardContainer>
      <Card>
        <H1 size="32" lineheight="30px" marginbottom="40" gradienttext>
          Welcome
        </H1>
        <P1>Log into your account</P1>
        <LoginOptionsContainer>
          <PrimaryButton
            onClick={() => handleOptionClick('students')}
            plainbg={currentOption === 'students'}
            transparentbg={currentOption !== 'students'}
            iconcolor={currentOption === 'students' ? 'white' : 'black'}
            width="auto"
            padding="0.8rem 1.4rem"
            height="auto"
            fontWeight="600"
            iconsize="1.5rem"
          >
            Students
          </PrimaryButton>
          <PrimaryButton
            onClick={() => handleOptionClick('officials')}
            plainbg={currentOption === 'officials'}
            transparentbg={currentOption !== 'officials'}
            iconcolor={currentOption === 'officials' ? 'white' : 'black'}
            width="auto"
            padding="0.8rem 1rem"
            height="auto"
            fontWeight="600"
            iconsize="1.5rem"
          >
            Officials
          </PrimaryButton>
        </LoginOptionsContainer>
        {currentOption === 'students' ? (
          <LoginForStudents
            email={email}
            otp={otp}
            setEmail={setEmail}
            setOtp={setOtp}
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
            handleLoginForStudentClick={handleLoginForStudentClick}
            isOtpSending={props.isOtpSending}
          />
        ) : (
          <LoginForOfficials
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        )}
      </Card>
    </CardContainer>
  );
}

LoginCard.propTypes = {
  requestOtp: PropTypes.func.isRequired,
  isOtpSending: PropTypes.bool,
  otpError: PropTypes.object,
  loginStudent: PropTypes.func.isRequired,
};

export default memo(LoginCard);
