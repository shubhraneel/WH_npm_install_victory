/**
 *
 * Header
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Menu } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
// import { Link } from 'react-router-dom';

import history from 'utils/history';

function SideMenu() {
  const [currentPage, setCurrentPage] = useState('/');

  const changePage = url => {
    history.push(url);
    setCurrentPage(url);
  };

  return (
    <div
      style={{
        width: 256,
        height: '100vh',
        position: 'fixed',
        left: '0',
        top: 80,
        bottom: '0',
        boxShadow: '0 0 28px 0 rgb(24 144 255 / 10%)',
        zIndex: '0',
      }}
    >
      <Menu
        mode="inline"
        style={{ height: '100vh' }}
        selectedKeys={[currentPage]}
      >
        <Menu.Item
          key="/"
          icon={<PieChartOutlined />}
          onClick={() => changePage('/')}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="/students-data"
          icon={<DesktopOutlined />}
          onClick={() => changePage('/students-data')}
        >
          Students Data
        </Menu.Item>
        <Menu.Item
          key="/societies"
          icon={<ContainerOutlined />}
          onClick={() => changePage('/societies')}
        >
          Societies
        </Menu.Item>
        <Menu.Item
          key="/halls"
          icon={<ContainerOutlined />}
          onClick={() => changePage('/halls')}
        >
          Halls
        </Menu.Item>
        <Menu.Item
          key="/departments"
          icon={<ContainerOutlined />}
          onClick={() => changePage('/departments')}
        >
          Departments
        </Menu.Item>
        <Menu.Item
          key="/bill-reimbursements"
          icon={<ContainerOutlined />}
          onClick={() => changePage('/bill-reimbursements')}
        >
          Bill Reimbursements
        </Menu.Item>
      </Menu>
    </div>
  );
}

SideMenu.propTypes = {};

export default memo(SideMenu);
