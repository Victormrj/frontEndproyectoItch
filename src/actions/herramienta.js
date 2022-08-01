import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';
import Swal from 'sweetalert2';
import { prepareHerramienta } from '../helpers/prepareMaterial';

export const herramientaStartAddNew = (herramienta) =>{
    return async(dispatch) => {
        try {
            const resp = await fetchConToken('herramientas', herramienta, 'POST');
            const body = await resp.json();
            if( body.ok ){
                dispatch( herramientaAddNew( herramienta ) );
                Swal.fire('Herramienta agregada con exito!!', body.msg);
            }else{
                Swal.fire('Error', body.msg)
            }            
        } catch (error) {
            console.log(error)            
        }
    }
}

export const herramientaStartLoaded = () => {
    return async (dispatch) => {
        try {

            const resp = await fetchConToken('herramientas');
            const body = await resp.json();

            const herramientas = prepareHerramienta(body.herramienta);
            // console.log(materiales)
            dispatch(herramientaLoaded(herramientas))

        } catch (error) {
            console.log(error)

        }

    }
}

export const herramientaStartUpdated = ( herramienta ) => {

    return async(dispatch) =>{
        try {
            const resp = await fetchConToken(`herramientas/${herramienta.id}`, herramienta , 'PUT');
            const body = await resp.json();

            if( body.ok ){
                dispatch( herramientaUpdate( herramienta ) )

            }else{
                Swal.fire('Error', body.msg)
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const herramientaStartDeleted= ( id, rol )=>{

    return async(dispatch) =>{

        try {           
            console.log('PRESIONADO',id)
            const resp = await fetchConToken(`herramientas/${id}`, { rol } , 'DELETE');
            const body = await resp.json();

            if( body.ok ){
                dispatch( herramientaDelete( rol ))              
            }else{
                Swal.fire('Error', body.msg)
                // console.log('EL ERROR',body)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const herramientaAddNew = ( herramienta ) => ({

    type: types.herramientaAddNew,
    payload: herramienta

});

const herramientaLoaded = ( herramienta ) => ({

    type: types.herramientaLoaded,
    payload: herramienta

});

const herramientaUpdate = ( herramienta ) => ({

    type: types.herramientaUpdate,
    payload: herramienta

});

export const herramientaDelete = (rol) => ({
    type: types.herramientaDelete,
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