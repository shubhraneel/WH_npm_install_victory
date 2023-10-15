/**
 *
 * LoginPage
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  InfoCircleOutlined,
  UserOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';
import { Card, Input, Row, Tooltip } from 'antd';

import H1 from 'components/H1';
import PrimaryButton from 'components/PrimaryButton';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { loginStart } from 'containers/App/actions';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function LoginPage(props) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const [userName, setUserName] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  return (
    <div>
      <Helmet>
        <title>LoginPage</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <Row justify="center" style={{ width: '100%' }}>
        <Card
          style={{ width: 600 }}
          title={
            <H1 size="18" fontweight="600">
              Login As Official
            </H1>
          }
          actions={[
            <Row justify="center" style={{ width: '100%' }}>
              <PrimaryButton
                type="primary"
                width="30%"
                height="40px"
                margintop="10px"
                marginbottom="10px"
                onClick={() => props.loginStart(userName, password)}
              >
                Login
              </PrimaryButton>
            </Row>,
          ]}
        >
          <Input
            size="large"
            type="text"
            placeholder="Enter Username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Your username as provided by Admin.">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
            onChange={e => setUserName(e.target.value)}
            value={userName}
          />
          <Input.Password
            size="large"
            type="password"
            placeholder="Enter Password"
            style={{ marginTop: '20px' }}
            prefix={<QrcodeOutlined className="site-form-item-icon" />}
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </Card>
      </Row>
    </div>
  );
}

LoginPage.propTypes = {
  loginStart: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    loginStart: (userName, password) =>
      dispatch(loginStart(userName, password)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
