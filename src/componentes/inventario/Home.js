import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MenuAdministrador from './MenuAdministrador';
export const Home = () => {
    return (
        <div>
            {/* <AlmacenPrincipal /> */}
            <Routes>
                <Route exact path='/' element={ <MenuAdministrador/> } />
            </Routes>
        </div>
    )
}
