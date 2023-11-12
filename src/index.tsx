import React from 'react';
import ReactDOM from 'react-dom/client';
import { LottoProvider } from "./contextAPI/LottoContext";
import App from './App';
import './scss/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <LottoProvider>
      <App />
    </LottoProvider>
  </React.StrictMode>
);