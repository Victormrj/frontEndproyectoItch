//RUTAS PARA EL MENI DE EQUIPOS
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import EquiposMenu from './EquiposMenu';
import EquiposNotificaciones from './EquiposNotificaciones';
import EquipoBajas from './EquipoBajas';
import EquiposLista from './EquiposLista';
import EquipoAdd from './EquipoAdd';

export const EquipRout = () => {
    return (
        <div>
            <EquiposMenu />
            <Routes>
                <Route exact path='/' element={<EquiposNotificaciones />} />
                <Route exact path='/EquipoBajas' element={ <EquipoBajas/> } />
                <Route exact path='/EquiposLista' element={ <EquiposLista/> }  />
                <Route exact path='/EquipoAdd' element={ <EquipoAdd/> } />
            </Routes>
        </div>

    )
}
