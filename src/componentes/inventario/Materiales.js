import React,{ useEffect, useState }  from 'react'
import MaterialesMenu from './MaterialesMenu'
import { Router, Routes, Route } from 'react-router-dom'
import AgregarMaterial from '../inventario/AgregarMaterial';
import { Notificaciones } from './Notificaciones';
import { ListadoMateriales } from './ListadoMateriales';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { material, materialStartLoaded, usuariosMaterial } from '../../actions/material';


export const Materiales = () => {
  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(materialStartLoaded());
    
      }, [dispatch])
    
    return (
        <div>
            <MaterialesMenu />
            <Routes>
                <Route exact path='/' element={< Notificaciones />} />
                <Route exact path='/AgregarMaterial' element={<AgregarMaterial />} />
                <Route exact path='/ListadoMateriales' element={<ListadoMateriales />} />
            </Routes>
        </div>
    )
}
