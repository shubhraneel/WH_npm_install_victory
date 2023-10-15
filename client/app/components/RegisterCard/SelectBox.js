/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { message, Select } from 'antd';

const SelectWrapper = styled(Select)`
  width: 100%;
  .ant-select-selector {
    width: 100% !important;
    border-radius: 5px;
    background-color: transparent;
    border: 1.5px solid #767373;
    box-shadow: none !important;
    height: 60px;
    .ant-select-selection-item {
      height: 35px !important;
      justify-content: center !important;
      align-items: center !important;
      background: rgb(114 133 234) !important;
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

const OptionsText = styled.p`
  text-transform: capitalize;
  margin: 0;
`;

class SelectBox extends React.Component {
  handleChange = selectedItems => {
    if (selectedItems.length <= 3) {
      this.props.setSelected(selectedItems);
    } else {
      message.warning('Please select only 3 tags');
    }
  };

  render() {
    return (
      <SelectWrapper
        mode="multiple"
        placeholder="Profile Tags"
        value={this.props.selected}
        onChange={this.handleChange}
      >
        {this.props.tags.map(item => (
          <Select.Option key={item} value={item}>
            <OptionsText>{item}</OptionsText>
          </Select.Option>
        ))}
      </SelectWrapper>
    );
  }
}

SelectBox.proptype = {
  tags: PropTypes.array,
  setOptionState: PropTypes.func,
  selected: PropTypes.array,
  setSelected: PropTypes.func,
};

export default SelectBox;
