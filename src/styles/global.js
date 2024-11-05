import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0rem;
    box-sizing: border-box;
  }

  body {
    width: 100vw;
    height: 100vh;
    background-color:#C3B195 ;
    color: #281811;
    font-family: "Roboto Slab", serif;
  }
`;

export default GlobalStyle;
