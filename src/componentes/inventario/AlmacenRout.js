import React from 'react';
import AlmacenPrincipal from './AlmacenPrincipal';
import { Routes, Route } from 'react-router-dom';
import AlmacenNotificaciones from './AlmacenNotificaciones';
import MenuAdministrador from './MenuAdministrador';
export const AlmacenRout = () => {
    return (
        <div>
            <AlmacenPrincipal />
            <Routes>
                <Route exact path='/' element={< AlmacenNotificaciones />} />
                <Route exact path='/MenuAdministrador' element={ <MenuAdministrador/> } />
            </Routes>
        </div>
    )
}
