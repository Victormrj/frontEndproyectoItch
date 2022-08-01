import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch'
import { prepareEquipo } from '../helpers/prepareMaterial';

export const equipoStartAddNew = (equipo) => {
    return async (dispatch) => {

        try {
            const resp = await fetchConToken('equipos', equipo, 'POST');
            const body = await resp.json();
            if (body.ok) {
                dispatch(equipoAddNew(equipo));
                Swal.fire('Equipo Agregado con exito!!', body.msg);
            } else {
                Swal.fire('Error', body.msg)
            }

        } catch (error) {
            console.log(error)
        }

    }
}

export const equipoStartAddNewDeleted = (equipo) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('bajasEquipos', equipo, 'POST');
            const body = await resp.json();
            if (body.ok) {         
                dispatch(equipoAddNewDeleted(equipo));
                // Swal.fire('Equipo Agregado con exito!!', body.msg);
            } else {
                // Swal.fire('Error', body.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const equipoStartLoaded = () => {
    return async (dispatch) => {
        try {

            const resp = await fetchConToken('equipos');
            const body = await resp.json();

            const equipos = prepareEquipo(body.equipo);

            dispatch(equipoLoaded(equipos));

        } catch (error) {
            console.log(error)
        }

    }
}

export const equipoStartLoadedDeleted = () => {
    return async (dispatch) => {

        try {

            const resp = await fetchConToken('bajasEquipos');
            const body = await resp.json();

            const equipos = prepareEquipo(body.equipo);

            dispatch(equipoLoadedDeleted(equipos));

        } catch (error) {
            console.log(error)
        }

    }
}


export const equipoStartUpdated = (equipo) => {
    return async (dispatch) => {
        try {

            const resp = await fetchConToken(`equipos/${equipo.id}`, equipo, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch(equipoUpdate(equipo));
            } else {
                Swal.fire('Acción denegada', body.msg);
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const equipoStartDeleted = (id, rol) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`equipos/${id}`, { rol }, 'DELETE');
            const body = await resp.json();
            if (body.ok) {
                dispatch(equipoDelete(rol))
            } else {
                Swal.fire('Acción denegada', body.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }
}



const equipoLoaded = (equipo) => ({
    type: types.equipoLoaded,
    payload: equipo
})

const equipoLoadedDeleted = (equipo) => ({
    type: types.equipoLoadedDeleted,
    payload: equipo
})

const equipoAddNew = (equipo) => ({
    type: types.equipoAddNew,
    payload: equipo
});
const equipoAddNewDeleted = (equipo) => ({
    type: types.equipoDeletedStartAddNew,
    payload: equipo
});
const equipoUpdate = (equipo) => ({
    type: types.equipoUpdate,
    payload: equipo
});

const equipoDelete = (rol) => ({
    type: types.equipoDelete,
    payload: rol
});