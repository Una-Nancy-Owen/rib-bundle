import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
   /* ... */
 `;

export const GraphicsGlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}

.hidden-element{
  display: none;
}

@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Noto+Sans+JP&display=swap');
`;