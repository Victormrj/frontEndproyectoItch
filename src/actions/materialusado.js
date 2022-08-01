import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch'


export const materialUsadoStartAddNew = (usado) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('materialUsados', usado, 'POST');
            const body = await resp.json();

            if (body.ok) {
                dispatch(usadoAddNew(usado));
                // Swal.fire('Agregado!',body.msg, 'success');
            } else {
                Swal.fire('Error', body.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

}

const usadoLoaded = (usado) => ({
    type: types.materialUsadoLoaded,
    payload: usado
})

const usadoAddNew = (usado) => ({
    type: types.materialUsadoAddNew,
    payload: usado
});
const usadoUpdate = (usado) => ({
    type: types.materialUsadoUpdate,
    payload: usado
});

const usadoDelete = (rol) => ({
    type: types.materialUsadoDelete,
    payload: rol
});