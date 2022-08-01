import React, { useEffect, useState } from 'react';
import { fetchConToken } from '../../helpers/fetch';



export const MaterialesData = () => {

    const [rowData, setRowdata] = useState([]);
    const obtenerMate = async () => {

        const resp = await fetchConToken('materiales');
        const { material } = await resp.json();
        
        material.map(b => {
            if (b.cantidadM < 5) {
                setRowdata(material.map(b => ({
                    nombreM: b.nombreM,
                    cantidadM: b.cantidadM
                })))
            }
            // console.log(b.Usuario)
        })


    }

    return (
        <>
        </>
    )

}