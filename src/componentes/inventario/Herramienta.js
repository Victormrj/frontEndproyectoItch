import React from 'react'
import MaterialesMenu from './MaterialesMenu'
import { Router, Routes, Route } from 'react-router-dom'
import HerramientaMenu from './HerramientaMenu';
import { NotificacionesHerramienta } from '../inventario/NotificacionesHerramienta';
import AgregarHerramienta from './AgregarHerramienta';
import { ListadoHerramientas } from './ListadoHerramientas';

export const Herramienta = () => {
    return (
        <div>
            <HerramientaMenu />
            <Routes>
                <Route exact path='/' element={<NotificacionesHerramienta />} />
                <Route exact path='/AgregarHerramienta' element={< AgregarHerramienta />} />
                <Route exact path='/ListadoHerramientas' element={<ListadoHerramientas />} />
                {/* <Route exact path='/' element={< Notificaciones />} />
                <Route exact path='/AgregarMaterial' element={<AgregarMaterial />} /> */}
            </Routes>
        </div>
    )
}
