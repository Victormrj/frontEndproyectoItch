import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MenuAdministrador from '../inventario/MenuAdministrador';
import MantenimientoMenu from './MantenimientoMenu';
import MantNotif from './MantNotif';
import PendientesMantenimiento from './PendientesMantenimiento';

export const MantenimientoRout = () => {
    return( 
        <div>
            <MantenimientoMenu />
            <Routes>
                <Route exact path='/' element={ <PendientesMantenimiento/> } />
                <Route exact path='/MenuAdministrador' element={ <MenuAdministrador/> } />
            </Routes>
        </div>
    )
}
