import React from 'react';
import ReactDOM from 'react-dom';
import { GraphicsGlobalStyle } from '../../style';
import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <GraphicsGlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
