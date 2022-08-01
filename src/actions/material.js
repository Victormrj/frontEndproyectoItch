import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch'
import { prepareMaterial } from '../helpers/prepareMaterial';

export const materialStartAddNew = (material) => {
    return async (dispatch) => {
        try {
            // const { tipoM } = material
            if (material.tipoM == '') {
                material.tipoM = material.otroM
            }
            if (material.unidadM == '') {
                material.unidadM = material.otroUnidadM
            }
            if (material.unidadM != '') {
                material.unidadM = material.unidadM
            }
            if (material.tipoM != '') {
                material.tipoM = material.tipoM
            }

            const resp = await fetchConToken('materiales', material, 'POST');
            const body = await resp.json();
            // if(body.tipoM == null){
            //     body.tipoM = body.otroM
            // }
            if (body.ok) {
                dispatch(materialAddNew(material));
                Swal.fire('Material agregado con exito!!', body.msg)

            } else {
                Swal.fire('Error', body.msg)

            }

        } catch (error) {
            console.log(error);
        }

    }
}
export const temporalStartAddNew = (temporal) => {
    return async (dispatch) => {
        try {
            if (temporal.tipo == '') {
                temporal.tipo = temporal.otro
            }
            if (temporal.unidad == '') {
                temporal.unidad = temporal.otroUnidad
            }

            if(temporal.tipo != ''){
                temporal.tipo = temporal.tipo
            }
            if (temporal.unidad != '') {
                temporal.unidad = temporal.unidad
            }
            const resp = await fetchConToken('temporal', temporal, 'POST');
            const body = await resp.json();
            if (body.ok) {
                dispatch(temporalAddNew(temporal));
                Swal.fire('Registro agregado con exito!!',
                    'El registro será validado mas tarde', 'success', body.msg)
            } else {
                Swal.fire('Error', body.msg)

            }
        } catch (error) {
            console.log(error);
        }
    }
}
export const materialStartLoaded = () => {
    return async (dispatch) => {
        try {

            const resp = await fetchConToken('materiales');
            const body = await resp.json();

            const materiales = prepareMaterial(body.material);
            // console.log(materiales)
            dispatch(materialLoaded(materiales))

        } catch (error) {
            console.log(error)

        }

    }
}

export const materialStartUpdated = (material) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`materiales/${material.id}`, material, 'PUT');
            const body = await resp.json();
            if (body.ok) {
                dispatch(materiaUpdate(material))
            } else {
                Swal.fire('Error', body.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const materialStartUpdate = (material) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`materiales/${material.id}`, material, 'PUT');
            const body = await resp.json();
            if (body.ok) {
                dispatch(materiaUpdated(material))
            } else {
                Swal.fire('Error', body.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const temporalStartUpdated = (temporal) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`temporal/${temporal.idT}`, temporal, 'PUT');
            const body = await resp.json();
            if (body.ok) {
                dispatch(temporalUpdate(temporal))
            } else {
                Swal.fire('Error', body.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const materialStartDeleted = (id, rol) => {

    return async (dispatch) => {

        try {
            console.log('PRESIONADO', id)
            const resp = await fetchConToken(`materiales/${id}`, { rol }, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                dispatch(materialDelete(rol))
            } else {
                Swal.fire('Error', body.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const materialLoaded = (material) => ({
    type: types.materialLoaded,
    payload: material
})

const materialAddNew = (material) => ({
    type: types.materialAddNew,
    payload: material
});

const materiaUpdate = (material) => ({
    type: types.materiaUpdate,
    payload: material
});
const materiaUpdated = (material) => ({
    type: types.materiaUpdated,
    payload: material
});

const materialDelete = (rol) => ({
    type: types.materialDelete,
    payload: rol
});
const temporalAddNew = (temporal) => ({
    type: types.temporalAddNew,
    payload: temporal
});
const temporalDelete = (rol) => ({
    type: types.temporalDelete,
    payload: rol
});
const temporalUpdate = (temporal) => ({
    type: types.temporalUpdate,
    payload: temporal
});