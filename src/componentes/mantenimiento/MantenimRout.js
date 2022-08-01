//RUTAS PARA EL MENU DE MANTENIMIENTO
import React from 'react';
import { Router, Routes, Route } from 'react-router-dom';

import MenuMant from './MenuMant';
import PendientesMantenimiento from './PendientesMantenimiento';
import ListaEquiposMant from './ListaEquiposMant';
import Historial from './Historial';
import AddMantenimiento from './AddMantenimiento';

export const MantenimRout = () => {
  return (
      <div>
          <MenuMant/>
          <Routes>
              {/* <Route exact path='/' element={ < PendientesMantenimiento/> } /> */}
              <Route exact path='/ListaEquiposMant' element={ <ListaEquiposMant/> } />
              <Route exact path='/' element={ <Historial/> } />
              <Route exact path='/AddMantenimiento' element={ <AddMantenimiento/> }  />
          </Routes>
      </div>
  )
}
