/**
 *
 * PageDescriptionHomePageList
 *
 */

import React, { memo } from 'react';
import PageDescriptionList from './PageDescriptionList';
import PageDescriptionHomePage from 'components/PageDescriptionHomePage';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  margin: 15em auto;
`

function PageDescriptionHomePageList() {
  return <Container>
    {
      PageDescriptionList.map((e, index) => <PageDescriptionHomePage {...e} index={index} />)
    }
  </Container>
}

PageDescriptionHomePageList.propTypes = {};

export default memo(PageDescriptionHomePageList);
