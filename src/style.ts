import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   overflow: hidden;
   font-family: 'Noto Sans JP', sans-serif;
  }
  body {
   position: relative;
   margin: 0;
  }
 `;

export const GraphicsGlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  font-family: 'Noto Sans JP', sans-serif;
  color:#fff;
}
`;