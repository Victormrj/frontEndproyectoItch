import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Sidebar from './Components/Sidebar';
import UserBar from './Components/UserBar';
// import './Components/MenuBar.css'



export const RootUser = () => {
    return( 
        <div>
            {/* <MantenimientoMenu /> */}
            <Routes>
                {/* <Route exact path='/' element={ <MantNotif/> } /> */}
                <Route exact path='/' element={ <UserBar/> } />
            </Routes>
        </div>
    )
}
