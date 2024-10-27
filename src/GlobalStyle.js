// src/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background: #eef2f3; /* Light background color */
    color: #333;
  }

  h1, h2, h3 {
    margin: 10px 0;
    color: #333;
  }

  p {
    margin: 5px 0;
  }

  input:focus {
    outline: none;
    border-color: #00796b; /* Teal */
  }
`;

export default GlobalStyle;
