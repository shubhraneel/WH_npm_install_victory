/**
 *
 * Footer
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Col } from 'antd';

import P1 from 'components/P1';
import FooterDesignSvg from 'images/footer-design.svg';

const Container = styled.div`
  position: relative;
  /* bottom: 0;
  left: 0;
  right: 0; */
  padding: 4rem 2rem;
  background-color: #333333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 900px) {
    .first-column {
      width: 100%;
    }
  }
`;

const FooterDesign = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 150px;
  z-index: 1;
`;

function Footer() {
  return (
    <Container>
      <Col className="first-column" style={{ zIndex: '2' }}>
        <P1 color="#FFFFFB">Technology Students’ Gymkhana, IIT Kharagpur</P1>
        <P1 size="12">
          (0322) 12345677 <br /> tsg@gmail.com <br /> IIT Kharagpur, Kharagpur{' '}
          <br /> West Bengal - 721302
        </P1>
      </Col>
      <Col style={{ zIndex: '2' }}>
        <a href="http://www.iitkgp.ac.in/" target="_blank">
          <P1 color="#FFFFFB">IITKGP Website</P1>
        </a>
        <a href="/quick-info">
          <P1 color="#FFFFFB">Quick Links</P1>
        </a>
        <a href="https://erp.iitkgp.ac.in/" target="_blank">
          <P1 color="#FFFFFB">ERP</P1>
        </a>
        <a href="https://iitkgpmail.iitkgp.ac.in/" target="_blank">
          <P1 color="#FFFFFB">Zimbra Webmail</P1>
        </a>
      </Col>
      <Col style={{ zIndex: '2' }}>
        <a href="http://www.iitkgp.ac.in/" target="_blank">
          <P1 color="#FFFFFB">Your Dost</P1>
        </a>
        <a href="http://www.iitkgp.ac.in/" target="_blank">
          <P1 color="#FFFFFB">Hall Management Centre</P1>
        </a>
        <a href="http://www.iitkgp.ac.in/" target="_blank">
          <P1 color="#FFFFFB">Yellow Pages</P1>
        </a>
        <a href="http://www.iitkgp.ac.in/" target="_blank">
          <P1 color="#FFFFFB">Counselling Center</P1>
        </a>
      </Col>
      <FooterDesign src={FooterDesignSvg} />
    </Container>
  );
}

Footer.propTypes = {};

export default memo(Footer);
