import React from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './componentes/router/AppRouter';
import { store } from './store/store';

export const InventarioApp = () => {
  return (
    <Provider store={ store } >
       <AppRouter />
    </Provider>
  )
}
