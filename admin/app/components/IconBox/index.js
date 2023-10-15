/**
 *
 * IconBox
 *
 */
import styled from 'styled-components';

export default styled.img`
  height: ${props => (props.size ? props.size : '22px')} !important;
  width: ${props => (props.size ? props.size : '22px')} !important;
  object-fit: cover;
  margin-right: ${props =>
    props.marginright ? props.marginright : '0'} !important;
  margin-left: ${props =>
    props.marginleft ? props.marginleft : '0'} !important;
  margin-bottom: ${props =>
    props.marginbottom ? props.marginbottom : '0'}!important;
  cursor: ${props => (props.cursor ? props.cursor : 'default')};
`;
