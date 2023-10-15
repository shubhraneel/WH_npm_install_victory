/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/**
 *
 * FormUploadButton
 *
 */

import { Button } from 'antd';
import styled from 'styled-components';

export default styled(Button)`
  cursor: pointer;
  background: #ffffff;
  padding: ${props => (props.$nopadding ? '0' : '4px 6px')} !important;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  border: none;

  width: ${props => (props.width ? props.width : '100%')} !important;
  height: ${props =>
    props.height && !props.$fixtopsave ? props.height : '40px'} !important;
  max-width: ${props => (props.maxwidth ? props.maxwidth : '100%')} !important;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: ${props =>
    props.fontWeight ? props.fontWeight : '400'} !important;
  border-radius: ${props =>
    props.borderradius ? props.borderradius : '3'}px !important;

  span {
    margin: 0 !important;
    color: ${props =>
      props.iconcolor ? props.iconcolor : '#767373'} !important;
    font-size: ${props =>
      props.iconsize ? props.iconsize : '16'}px !important;
  }

  text-align: ${props =>
    props.textAlign ? props.textAlign : 'center'}!important;

  display: ${props => (props.display ? props.display : null)};
  margin-bottom: ${props =>
    props.marginbottom ? props.marginbottom : null} !important;
  margin-top: ${props => (props.margintop ? props.margintop : null)} !important;
  margin-left: ${props =>
    props.marginleft ? props.marginleft : null} !important;
  margin-right: ${props =>
    props.marginright ? props.marginright : null} !important;
`;
