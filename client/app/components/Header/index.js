/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/**
 *
 * Header
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

import { Menu, Dropdown } from 'antd';

import H1 from 'components/H1';
import P1 from 'components/P1';
import PrimaryButton from 'components/PrimaryButton';
import CustomModal from 'components/CustomModal';
import ModalInnerState from 'components/ModalInnerState';

import SadEmoji from 'images/sad.svg';
import TitleImage from 'images/IIT_Kharagpur_Logo.png';
import NotifiactionIcon from 'images/notification.png';
import UserIcon from 'images/user.png';
import Hamburger from 'images/hamburger.svg';
import TSGLogo from 'images/TSGLogo.svg';
import CloseIcon from 'images/close-icon.svg';

import NavbarOptions from './NavbarOptions';
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #767373;
`;

const WebsiteTitle = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

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

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const Navbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  padding-top: 5px;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const WebsiteTitleMobile = styled.div`
  display: none;
  width: 100%;
  position: relative;

  .top-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1rem;
    position: relative;
    z-index: 1000;
    background-color: rgba(255, 255, 255);
  }

  .left {
    display: flex;

    .left-icon {
      margin-right: 1rem;
      width: 3rem;
      position: relative;
    }
  }

  .hamburger-menu {
    transform: translateY(-100%);
    position: absolute;
    top: 100%;
    transition: all 0.4s;
    padding: 2rem;
    z-index: 10;
    background-color: white;
    width: 100%;
    box-shadow: 0 10px 6px -6px rgba(0, 0, 0, 0.3);
  }

  .hamburger-menu-option {
    color: #777;
    margin-bottom: 2rem;
    font-weight: bold;
  }

  .hamburger-menu-visible {
    transform: translateY(0);
  }

  .tsg-icon {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    transition: all 0.4s;
    visibility: hidden;
  }

  .tsg-icon-appear {
    opacity: 100%;
    visibility: visible;
  }

  .hamburger-menu-icon {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 100%;
    transition: all 0.4s;
    visibility: visible;
  }

  .hamburger-menu-icon-disappear {
    opacity: 0;
    visibility: hidden;
  }

  .login-mobile-or-close {
    position: relative;
    width: 9rem;
  }

  .hamburger-close {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    visibility: hidden;
  }

  .hamburger-close-appear {
    opacity: 100;
    visibility: visible;
  }

  .login-mobile {
    display: flex;
    gap: 5px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 100%;
    visibility: visible;
  }

  .login-mobile-disappear {
    opacity: 0;
    visibility: hidden;
  }

  @media screen and (max-width: 900px) {
    display: block;
  }
`;

const DropdownMenu = (
  <Menu>
    <Menu.Item key="0">
      <Link to="/archives">
        <P1
          PadLeft="10"
          PadRight="10"
          marginbottom="10"
          margintop="15"
          size="18"
        >
          Archives
        </P1>
      </Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link to="/calendar">
        <P1 PadLeft="10" PadRight="10" size="18" marginbottom="15">
          Calendar
        </P1>
      </Link>
    </Menu.Item>
  </Menu>
);

function Header(props) {
  const [currentPage, setCurrentPage] = useState('/');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const history = useHistory();

  useEffect(
    () =>
      history.listen(location => {
        setCurrentPage(location.pathname);
      }),
    [history],
  );

  const handleHamburgerMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <Container>
      <WebsiteTitleMobile>
        <div className="top-container">
          <div className="left">
            <div className="left-icon">
              <img
                aria-hidden="true"
                className={`hamburger-menu-icon ${
                  isMenuVisible ? 'hamburger-menu-icon-disappear' : null
                }`}
                src={Hamburger}
                alt="hamburger"
                onClick={handleHamburgerMenu}
                width="25"
                height="25"
              />
              <Link
                to="/"
                className={`tsg-icon ${
                  isMenuVisible ? 'tsg-icon-appear' : null
                }`}
              >
                <img
                  aria-hidden="true"
                  src={TSGLogo}
                  alt="tsg-logo"
                  width="25"
                  height="25"
                  onClick={handleHamburgerMenu}
                />
              </Link>
            </div>
            <H1 fontweight="700" size="1.5rem" color="#777">
              Technology Students’ Gymkhana
            </H1>
          </div>
          <div className="login-mobile-or-close">
            {!props.AuthData.isLoggedIn ? (
              <Link to="/login">
                <PrimaryButton
                  className={`login-mobile ${
                    isMenuVisible ? 'login-mobile-disappear' : null
                  }`}
                  width="auto"
                  height="auto"
                  iconsize="1.2rem"
                >
                  Login
                </PrimaryButton>
              </Link>
            ) : (
              <div
                className={`login-mobile ${
                  isMenuVisible ? 'login-mobile-disappear' : null
                }`}
              >
                <Link to="/notifications">
                  <div style={{ position: 'relative' }}>
                    <img
                      style={{ height: '20px', width: '20px' }}
                      src={NotifiactionIcon}
                      alt="Notification Icon"
                    />
                    {props.AuthData.credentials &&
                    props.AuthData.credentials.newNotification ? (
                      <div
                        style={{
                          height: '12px',
                          width: '12px',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '-2px',
                          right: '20px',
                          background: '#FD749B',
                        }}
                      />
                    ) : null}
                  </div>
                </Link>
                <PrimaryButton
                  width="auto"
                  height="auto"
                  iconsize="1.2rem"
                  onClick={() => setIsModalVisible(true)}
                >
                  Logout
                </PrimaryButton>
              </div>
            )}

            <img
              aria-hidden="true"
              className={`hamburger-close ${
                isMenuVisible ? 'hamburger-close-appear' : null
              }`}
              src={CloseIcon}
              alt="hamburger-close"
              onClick={handleHamburgerMenu}
              width="15"
              height="15"
            />
          </div>
        </div>
        <div
          className={`hamburger-menu ${
            isMenuVisible ? 'hamburger-menu-visible' : null
          }`}
        >
          {NavbarOptions.map(option =>
            !props.AuthData.isLoggedIn &&
            option.isProtected ? null : (currentPage === '/' &&
                option.link === '/') ||
              (option.link !== '/' && currentPage.startsWith(option.link)) ? (
              <div className="hamburger-menu-option"> {option.title} </div>
            ) : (
              <div className="hamburger-menu-option">
                <Link
                  to={option.link}
                  style={{ textDecoration: 'none', color: '#B247A7' }}
                  onClick={handleHamburgerMenu}
                >
                  {option.title}
                </Link>
              </div>
            ),
          )}
          <Dropdown overlay={DropdownMenu} trigger={['click']}>
            <div style={{ fontWeight: 'bold', color: '#B247A7' }}>
              {NavbarOptions[NavbarOptions.length - 1].title}
            </div>
          </Dropdown>
        </div>
      </WebsiteTitleMobile>

      <WebsiteTitle>
        <div className="left-side">
          <Link to="/">
            <img src={TitleImage} alt="IIT Kgp Logo" />
          </Link>
          <H1 size="20px">Technology Students’ Gymkhana</H1>
        </div>
        <div className="right-side">
          {props.AuthData.isLoggedIn ? (
            <Link to="/notifications">
              <div style={{ position: 'relative' }}>
                <img src={NotifiactionIcon} alt="Notification Icon" />
                {props.AuthData.credentials &&
                props.AuthData.credentials.newNotification ? (
                  <div
                    style={{
                      height: '12px',
                      width: '12px',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '-2px',
                      right: '20px',
                      background: '#FD749B',
                    }}
                  />
                ) : null}
              </div>
            </Link>
          ) : null}
          {props.AuthData.isLoggedIn ? (
            <Link to="/profile">
              <img src={UserIcon} alt="User Icon" />
            </Link>
          ) : null}
          {!props.AuthData.isLoggedIn ? (
            <Link to="/login">
              <PrimaryButton height="40px" width="100px">
                Login
              </PrimaryButton>
            </Link>
          ) : (
            <PrimaryButton
              height="40px"
              width="100px"
              onClick={() => setIsModalVisible(true)}
            >
              Logout
            </PrimaryButton>
          )}
        </div>
      </WebsiteTitle>
      <Navbar>
        {NavbarOptions.map(option =>
          option.isDropdown ? null : !props.AuthData.isLoggedIn &&
            option.isProtected ? null : (currentPage === '/' &&
              option.link === '/') ||
            (option.link !== '/' && currentPage.startsWith(option.link)) ? (
            <PrimaryButton width="fit-content" height="30px">
              {option.title}
            </PrimaryButton>
          ) : (
            <Link to={option.link} style={{ textDecoration: 'none' }}>
              <PrimaryButton
                width="fit-content"
                height="30px"
                transparentbg
                iconcolor="rgb(0 47 45)"
                fontWeight="500"
                border={
                  option.title === 'Fundae Finder'
                    ? '1.5px dashed #281AC8'
                    : 'transparent'
                }
              >
                {option.title}
              </PrimaryButton>
            </Link>
          ),
        )}
        <Dropdown overlay={DropdownMenu} trigger={['click']}>
          <PrimaryButton
            width="fit-content"
            height="30px"
            transparentbg
            iconcolor="rgb(0 47 45)"
            fontWeight="500"
            border="transparent"
          >
            {NavbarOptions[NavbarOptions.length - 1].title}
          </PrimaryButton>
        </Dropdown>
      </Navbar>
      <CustomModal
        visible={isModalVisible}
        centered
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <div
            key="1"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PrimaryButton
              plainbg
              key="1"
              margintop="10px"
              onClick={() => {
                props.logoutStudent();
                setIsModalVisible(false);
              }}
            >
              Confirm logout
            </PrimaryButton>
            <PrimaryButton
              key="2"
              onClick={() => setIsModalVisible(false)}
              colorbg="rgb(243 245 252)"
              iconcolor="rgb(35 43 43)"
              margintop="15px"
              marginbottom="15px"
            >
              Cancel
            </PrimaryButton>
          </div>,
        ]}
        mask="false"
        style={{ borderradius: '5px' }}
        contentStyle={{ borderradius: '5px', overflow: 'hidden' }}
      >
        <ModalInnerState
          icon={SadEmoji}
          height="100%"
          width="100%"
          paddingbottom="0"
          headingmargintop="30"
          headingmarginbottom="0"
          heading="Are you sure you want to logout?"
        />
      </CustomModal>
    </Container>
  );
}

Header.propTypes = {
  AuthData: PropTypes.object.isRequired,
  logoutStudent: PropTypes.func.isRequired,
};

export default memo(Header);
