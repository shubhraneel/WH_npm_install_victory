import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Poppins', sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Poppins', sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Poppins', sans-serif;
    line-height: 1.5em;
  }

  .anticon {
    vertical-align: 0 !important;
  }
`;

export default GlobalStyle;
