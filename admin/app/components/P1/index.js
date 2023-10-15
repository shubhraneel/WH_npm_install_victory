import styled from 'styled-components';

export default styled.p`
  line-height: ${props => (props.Lineheight ? props.Lineheight : '20')}px;
  letter-spacing: ${props => (props.letterspacing ? props.letterspacing : 0)};
  color: ${props => (props.color ? props.color : 'rgb(116 116 116)')};
  font-size: ${props => (props.size ? props.size : '14')}px !important;
  font-weight: ${props => (props.FontWeight ? props.FontWeight : '400')};
  margin-top: ${props => (props.margintop ? props.margintop : '0')}px;
  margin-right: ${props => (props.marginRight ? props.marginRight : '0')}px;
  margin-left: ${props => (props.marginleft ? props.marginleft : '0')}px;
  margin-bottom: ${props => (props.marginbottom ? props.marginbottom : '0')}px;
  text-align: ${props => (props.textAlign ? props.textAlign : 'initial')};
  padding-right: ${props => (props.PadRight ? props.PadRight : '0')}px;
  padding-left: ${props => (props.PadLeft ? props.PadLeft : '0')}px;
  cursor: ${props => (props.cursor ? props.cursor : 'inherit')};
`;
