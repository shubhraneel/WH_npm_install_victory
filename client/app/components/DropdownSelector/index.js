/**
 *
 * DropdownSelector
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Select } from 'antd';

const { Option } = Select;

const CustomSelect = styled(Select)`
  width: 100% !important;
  margin-bottom: 20px !important;
  .ant-select-selector {
    padding: 0 20px !important;
    border: 1px solid #767373 !important;
    border-radius: ${props =>
      props.borderRadius ? props.borderRadius : '10px'}!important;
    box-shadow: none !important;
    height: ${props => (props.height ? props.height : '50px')}!important;

    .ant-select-selection-search {
      height: 100% !important;
      display: flex;
      justify-content: flex-start !important;
      align-items: center !important;
      input {
        height: 100% !important;
      }
    }

    .ant-select-selection-placeholder {
      position: absolute !important;
      top: 50%;
      transform: translateY(
        ${props => (props.countryfocused === 'true' ? '-100%' : '-50%')}
      );
      height: fit-content !important;
      padding-left: 8px !important;
      color: #767373 !important;
    }

    .ant-select-selection-item {
      height: 100% !important;
      display: flex;
      justify-content: flex-start !important;
      align-items: center !important;
      background: transparent !important;
      .ant-select-selection-item-content {
        color: #ffffff !important;
        text-transform: capitalize;
      }
    }
  }

  .ant-select-multiple .ant-select-selection-item-remove > .anticon {
    vertical-align: 0 !important;
  }
  .ant-select-multiple .ant-select-selection-item-remove {
    font-size: 12px !important;
  }
`;

function DropdownSelector(props) {
  function onChange(value) {
    props.onChange(value);
  }

  function onSearch(val) {
    console.log('search:', val);
  }

  return (
    <CustomSelect
      showSearch
      placeholder={props.placeholder}
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      height={props.height}
      borderRadius={props.borderRadius}
    >
      {props.options.map(e => (
        <Option value={e._id}>{e.name}</Option>
      ))}
    </CustomSelect>
  );
}

DropdownSelector.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
};

export default memo(DropdownSelector);
