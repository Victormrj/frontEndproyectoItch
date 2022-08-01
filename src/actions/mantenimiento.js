import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch'

export const mantenimientoStartAddNew = (mantenimiento) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('mantenimiento', mantenimiento, 'POST');
            const body = await resp.json();

            if (body.ok) {
                dispatch(mantenimientoAddNew(mantenimiento));
                Swal.fire('Agregado!',body.msg, 'success');
            } else {
                Swal.fire('Error', body.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

}

export const mantenimientoStartLoaded = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('mantenimiento');
            const body = await resp.json();

            // const mantenimientos = prepareEquipo(body.mantenimiento);

            dispatch(mantenimientoLoaded(body.mantenimiento));

        } catch (error) {
            console.log(error)
        }
    }
}
export const mantenimientoStartUpdated = (mantenimiento) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`mantenimiento/${mantenimiento.id}`, mantenimiento, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch(mantenimientoUpdate(mantenimiento));
            } else {
                Swal.fire('Acción denegada', body.msg);
            }

        } catch (error) {
            console.log(error)
        }
    }
}
export const mantenimientoStartDeleted = (id, rol) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`mantenimiento/${id}`, { rol }, 'DELETE');
            const body = await resp.json();
            if (body.ok) {
                dispatch(mantenimientoDelete(rol))
            } else {
                Swal.fire('Acción denegada', body.msg)
            }

        } catch (error) {
            console.log(error)
        }
    }
}
const mantenimientoLoaded = (mantenimiento) => ({
    type: types.mantenimientoLoaded,
    payload: mantenimiento
})

const mantenimientoAddNew = (mantenimiento) => ({
    type: types.mantenimientoAddNew,
    payload: mantenimiento
});
const mantenimientoUpdate = (mantenimiento) => ({
    type: types.mantenimientoUpdate,
    payload: mantenimiento
});

const mantenimientoDelete = (rol) => ({
    type: types.mantenimientoDelete,
    payload: rol
});