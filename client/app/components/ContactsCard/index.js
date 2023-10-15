/* eslint-disable no-nested-ternary */
/**
 *
 * ContactsCard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import H1 from 'components/H1';
import P1 from 'components/P1';

const Container = styled.div`
  width: 80%;
  heigt: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  border-radius: 16px;
  background-color: #fff;

  img {
    width: 40%;
    height: 40%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

function ContactsCard(props) {
  return (
    <Container>
      <img
        src={
          props.profilePic
            ? props.profilePic.imageURL
            : 'https://picsum.photos/600/600'
        }
        alt="Profile"
      />
      <H1 size="18" margintop="20">
        {props.name}
      </H1>
      <P1>
        {props.roleMetadata
          ? props.roleMetadata.position.toUpperCase()
          : props.designation
          ? props.designation
          : '-'}
      </P1>
      {props.phone ? <P1 margintop="20">&#9742; {props.phone}</P1> : null}
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      {props.email ? <P1 margintop="5">&#128140; {props.email}</P1> : null}
    </Container>
  );
}

ContactsCard.propTypes = {
  profilePic: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  roleMetadata: PropTypes.object,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  designation: PropTypes.string,
};

export default memo(ContactsCard);
