import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Poppins', sans-serif;
  }

  #app {
    background-color: #fff;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Poppins', sans-serif;
    line-height: 1.5em;
  }

  a {
    text-decoration: none;
  }

  .ant-select-dropdown {
    max-height: 250px !important;
    overflow-y: auto !important;
  }

  .ant-divider {
    border-top-color: rgba(0, 0, 0, 0.6);

    &::after {
      transform: none;
    }
  }
`;

export default GlobalStyle;
