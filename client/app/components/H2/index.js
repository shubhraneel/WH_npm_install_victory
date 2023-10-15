import styled from 'styled-components';

export default styled.h2`
  letter-spacing: 0;
  color: rgb(54 54 54);
  line-height: ${props => props.Lineheight ? props.Lineheight : '38px'};
  font-size: ${props =>
    props.size
      ? props.size.endsWith('em') || props.size.endsWith('px')
        ? props.size
        : `${props.size}px`
      : '24px'} !important;
  margin-top: ${props => (props.margintop ? props.margintop : '0')}px;
  margin-bottom: ${props => (props.marginbottom ? props.marginbottom : '0')}px;
  text-align: ${props => (props.textAlign ? props.textAlign : 'initial')};

  ${({ gradienttext }) =>
    gradienttext &&
    `
    background: -webkit-linear-gradient(#FD749B, #281AC8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

  `}
`;
