/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import H1 from 'components/H1';
import PrimaryButton from 'components/PrimaryButton';
import TitleImage from 'images/IIT_Kharagpur_Logo.png';
import NotifiactionIcon from 'images/notification.png';

const WebsiteTitle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  background: #fff;
  box-shadow: 4px 4px 40px 0 rgb(0 0 0 / 5%);
  z-index: 10;

  .left-side {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 45px;
      height: 50px;
      margin-right: 20px;
    }
  }

  .right-side {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 20px;
      height: 20px;
      margin-right: 20px;
    }
  }
`;

function Header(props) {
  return (
    <WebsiteTitle>
      <div className="left-side">
        <Link to="/">
          <img src={TitleImage} alt="IIT Kgp Logo" />
        </Link>
        <H1 size="18">Technology Students’ Gymkhana</H1>
      </div>
      <div className="right-side">
        <img src={NotifiactionIcon} alt="Notification Icon" />
        {props.AuthData.isLoggedIn ? (
          <PrimaryButton
            height="35px"
            width="100px"
            type="primary"
            onClick={() => props.logout()}
          >
            Logout
          </PrimaryButton>
        ) : (
          <Link to="/login">
            <PrimaryButton height="35px" width="100px" type="primary">
              Login
            </PrimaryButton>
          </Link>
        )}
      </div>
    </WebsiteTitle>
  );
}

Header.propTypes = {
  AuthData: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default memo(Header);
