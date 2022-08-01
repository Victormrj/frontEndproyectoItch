import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';
import Swal from 'sweetalert2';
// import { EmpleadoList } from '../componentes/asignaciones/EmpleadoList'

export const personalStartAddNew = (personal) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('personal', personal, 'POST');
            const body = await resp.json();

            if (body.ok) {
                dispatch(personalAddNew(personal));
                
                //   target: document.getElementById('body-asignacion'),
                Swal.fire({
                    target: document.getElementById('personal-add'),
                    title: 'Personal agregado',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                })
                // Swal.fire('Personal agregado', body.msg)
            } else {
                Swal.fire('Ocurrio un error', body.msg)
            }

        } catch (error) {
            console.log(error)
        }
    }

}
export const personalStartLoaded = (personal) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('personal');
            const body = await resp.json();

            dispatch(personalLoaded(body.personal))

        } catch (error) {
            console.log(error)

        }
    }
}
export const personalStartUpdated = (personal) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`personal/${personal.id}`, personal, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch(personalUpdated(personal));
            } else {
                Swal.fire('Error', body.msg)
            }
        } catch (error) {

        }
    }
}
export const personalStartDeleted = (personal) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`personal/${personal.id}`, {}, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                dispatch(personalDeleted(personal));
            } else {
                Swal.fire('Error', body.msg)
            }

        } catch (error) {

        }
    }
}



const personalAddNew = (personal) => ({
    type: types.personalAddNew,
    payload: personal
})
const personalLoaded = (personal) => ({
    type: types.personalLoaded,
    payload: personal
})
const personalUpdated = (personal) => ({
    type: types.personalUpdated,
    payload: personal
})
const personalDeleted = (rol) => ({
    type: types.personalDeleted,
    payload: rol
})














