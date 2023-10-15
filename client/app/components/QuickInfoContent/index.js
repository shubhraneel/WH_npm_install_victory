/**
 *
 * QuickInfoContent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import CdcStatsIcon from 'images/cdcStatsIcon.png';
import ContactsIcon from 'images/contactsIcon.png';
import FacultyIcon from 'images/facultyIcon.png';
import HallIcon from 'images/hallIcon.png';
import QuickLinksIcon from 'images/quickLinksIcon.png';
import SocietyIcon from 'images/societyIcon.png';
import TitleCard from 'components/TitleCard';

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  grid-column-gap: 30px;
  grid-row-gap: 60px;
  padding: 30px;
`;

function QuickInfoContent() {
  const options = [
    { imageSrc: CdcStatsIcon, title: 'CDC Stats', link: '/cdc-stats' },
    { imageSrc: QuickLinksIcon, title: 'Quick Links', link: '/quick-links' },
    { imageSrc: ContactsIcon, title: 'Contacts', link: '/contacts' },
    { imageSrc: HallIcon, title: 'Halls of Residence', link: '/halls' },
    { imageSrc: SocietyIcon, title: 'Societies', link: '/society-details' },
    { imageSrc: FacultyIcon, title: 'Faculty', link: '/faculty-contacts' },
  ];
  return (
    <Container>
      {options.map(obj => (
        <Link to={obj.link} style={{ width: 'fit-content' }}>
          <TitleCard imageSrc={obj.imageSrc} title={obj.title} />
        </Link>
      ))}
    </Container>
  );
}

QuickInfoContent.propTypes = {};

export default memo(QuickInfoContent);
