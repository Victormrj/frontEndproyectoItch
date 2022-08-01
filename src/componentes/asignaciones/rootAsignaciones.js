import React from 'react';
import { EmpleadoBar } from './components/EmpleadoBar';
import { Routes, Route } from 'react-router-dom';

export const RootAsignaciones = () => {
    return (
        <div>
            {/* <MantenimientoMenu /> */}
            <Routes>
                {/* <Route exact path='/' element={ <MantNotif/> } /> */}
                <Route exact path='/' element={<EmpleadoBar />} />
            </Routes>
        </div>
    )
}
