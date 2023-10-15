import styled from 'styled-components';

export default styled.h1`
  line-height: ${props => (props.lineheight ? props.lineheight : '26px')};
  letter-spacing: 0;
  color: ${props => (props.color ? props.color : 'rgb(0 47 45)')};
  font-size: ${props => (props.size ? props.size : '28')}px;
  font-weight: ${props => (props.fontweight ? props.fontweight : '600')};
  margin-top: ${props => (props.margintop ? props.margintop : '0')}px;
  margin-bottom: ${props => (props.marginbottom ? props.marginbottom : '0')}px;
  text-align: ${props =>
    props.textAlign ? props.textAlign : 'initial'} !important;
  margin-left: ${props => (props.marginleft ? props.marginleft : '0')}px;
  margin-right: ${props => (props.marginright ? props.marginright : '0')}px;
  span {
    color: rgb(116 116 116);
    font-size: 15pt;
  }

  ${({ gradienttext }) =>
    gradienttext &&
    `
    background: -webkit-linear-gradient(#FD749B, #281AC8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

  `}
`;
