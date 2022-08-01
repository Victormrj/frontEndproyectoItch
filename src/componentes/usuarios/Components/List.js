import React from 'react'
import ListUsuarios from '../listUsuarios'

function List({ usuario }) {
    return (
        <>
            <h1>Lista de usuarios</h1>
            {usuario.map((usuario, index) => {
                return <ListUsuarios name={usuario.nombre} />
            })}


        </>
    )
}

export default List