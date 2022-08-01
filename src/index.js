import React from 'react';
import ReactDOM from 'react-dom';
import { InventarioApp, Login } from './InventarioApp';

console.log(process.env)

ReactDOM.render(
  <React.StrictMode>

    <InventarioApp />

  </React.StrictMode>,
  document.getElementById('root')
);