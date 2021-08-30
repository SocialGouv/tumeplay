import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind/before.scss'
import './styles/index.scss';
import './styles/tailwind/after.scss'
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

