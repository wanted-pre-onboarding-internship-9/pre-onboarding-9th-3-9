import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
	line-height: 1;
  }

  h1, h2, h3, h4, h5, h6,p {
    margin: 0;
  }

`;

export default GlobalStyle;
