import React from 'react';
import { GraphicsGlobalStyle } from '../../style';
import { App } from './app';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <GraphicsGlobalStyle />
    <App />
  </React.StrictMode>
);
