import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input } from 'antd';

import Icons from 'components/IconBox';
import Search from 'images/search-icon-blue.svg';

const SearchInput = styled(Input)`
  width: 100% !important;
  background-color: rgb(40, 26, 200, 0.1) !important;
  padding: 15px 40px !important;
  border: none !important;
  outline: none !important;
  border-radius: 2000px !important;
  font-size: 18px !important;

  .ant-input {
    font-size: 18px;
    font-weight: 400;
    color: #281ac8;
    background-color: transparent !important;

    &::placeholder {
      color: rgb(116 116 116);
      font-size: 16px;
      font-weight: 400;
    }
  }
`;

function SearchBox(props) {
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <SearchInput
        value={props.query}
        placeholder="Search"
        onChange={event => props.setQuery(event.target.value)}
        prefix={<Icons src={Search} marginright="5px" size="20px" />}
      />
    </div>
  );
}

SearchBox.propTypes = {
  setQuery: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default SearchBox;
