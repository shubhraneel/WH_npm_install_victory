/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/**
 *
 * PrimaryButton
 *
 */

import { Button } from 'antd';
import styled from 'styled-components';

export default styled(Button)`
  cursor: pointer;
  background: ${props =>
    props.colorbg
      ? props.colorbg
      : props.plainbg
      ? '#B247A7'
      : props.transparentbg
      ? 'transparent'
      : 'linear-gradient(178.18deg, #FD749B -13.56%, #281AC8 158.3%)'} !important;
  border-color: ${props => (props.bordercolor ? props.bordercolor : null)};
  border: ${props => (props.border ? props.border : 'none')} !important;
  padding: ${props =>
    props.padding
      ? props.padding
      : props.$nopadding
      ? '0'
      : '4px 15px'} !important;

  width: ${props => (props.width ? props.width : '100%')} !important;
  height: ${props =>
    props.height && !props.$fixtopsave ? props.height : '50px'} !important;
  max-width: ${props => (props.maxwidth ? props.maxwidth : '100%')} !important;

  display: ${props => (props.display ? props.display : 'flex')} !important;
  justify-content: center !important;
  align-items: center !important;

  font-weight: ${props =>
    props.fontWeight ? props.fontWeight : '400'} !important;
  border-radius: ${props =>
    props.borderradius ? props.borderradius : '500'}px !important;

  span {
    margin: 0 !important;
    color: ${props =>
      props.iconcolor ? props.iconcolor : '#ffffff'} !important;
    font-size: ${props =>
      props.iconsize
        ? props.iconsize.endsWith('em') || props.iconsize.endsWith('px')
          ? props.iconsize
          : `${props.iconsize}px`
        : '16px'} !important;
  }

  text-align: ${props =>
    props.textAlign ? props.textAlign : 'center'}!important;

  ${({ dashed }) =>
    dashed &&
    `
     border-style: dashed !important;
   `}

  &:hover {
    background: #348dfe !important;

    span {
      color: #fff !important;
    }
  }

  display: ${props => (props.display ? props.display : null)};
  bottom: ${props => (props.FromBottom ? props.FromBottom : null)};
  margin-bottom: ${props =>
    props.marginbottom ? props.marginbottom : null} !important;
  margin-top: ${props => (props.margintop ? props.margintop : null)} !important;
  margin-left: ${props =>
    props.marginleft ? props.marginleft : null} !important;
  margin-right: ${props =>
    props.marginright ? props.marginright : null} !important;
`;
