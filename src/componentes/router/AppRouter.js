import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Login } from '../auth/Login';
import AlmacenPrincipal from '../inventario/AlmacenPrincipal';
import MenuAdministrador from '../inventario/MenuAdministrador';
import MaterialesMenu from '../inventario/MaterialesMenu';
import AgregarMaterial from '../inventario/AgregarMaterial';
import { Materiales } from '../inventario/Materiales';
import { AlmacenRout } from '../inventario/AlmacenRout';
import { Herramienta } from '../inventario/Herramienta';
import { MantenimientoRout } from '../mantenimiento/MantenimientoRout';
import { MantenimRout } from '../mantenimiento/MantenimRout';
import { EquipRout } from '../mantenimiento/EquipRout';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../../actions/auth';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { Home } from '../inventario/Home';
import { RootUser } from '../usuarios/routerUser';
import { RootAsignaciones } from '../asignaciones/rootAsignaciones';
// import { checking } from '../../reducers/authReducer';

export const AppRouter = () => {

  const dispatch = useDispatch();
  const authStatus = 'checking';

  const { checking, id } = useSelector(state => state.auth);
  const local = localStorage.getItem('token');

  // console.log(local);

  if (id == 13) {
    // console.log('YASTAS')

  }

  useEffect(() => {

    dispatch(startChecking());

  }, [dispatch])

  if (checking) {
    return <h5 >Espere...</h5>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
        />

        <Route path="/*" element={
          <PrivateRoute>
            <MenuAdministrador />
          </PrivateRoute>
        }
        
        />
        <Route path="/RootUser/*" element={
          <PrivateRoute>
            <RootUser />
          </PrivateRoute>
        }/>
         <Route path="/RootAsignaciones/*" element={
          <PrivateRoute>
            <RootAsignaciones />
          </PrivateRoute>
        }/>


        {/* <Route path="*" element={<CalendarScreen />} />   */}
        <Route exact path='/Materiales/*' element={<Materiales />} />
        <Route exact path='/Herramienta/*' element={<Herramienta />} />
        {/* <Route exact path='/AgregarMaterial' element={<AgregarMaterial />} /> */}
        <Route exact path='/AlmacenRout/*' element={<AlmacenRout />} />
        <Route exact path='/MantenimientoRout/*' element={<MantenimientoRout />} />
        <Route exact path='/MantenimRout/*' element={<MantenimRout />} />
        <Route exact path='/EquipRout/*' element={<EquipRout />} />
        {/* <Route exact path='/RootUser/*' element={< RootUser />} /> */}
      </Routes>
    
    </BrowserRouter>
  )
}
