import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';
import Swal from 'sweetalert2';


export const usuarioStartAddNew = (usuario) =>{
    return async(dispatch) => {
        try {
            const resp = await fetchConToken('events', usuario, 'POST');
            const body = await resp.json();

            if( body.ok ){
                dispatch( usuarioAddNew( usuario ) );
                Swal.fire('Usuario agregada con exito!!', body.msg);

            }else{
                Swal.fire('Error', body.msg)
            }
            
        } catch (error) {
            console.log(error)
            
        }
    }
}

export const usuarioStartLoaded = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('events');
            const body = await resp.json();

            dispatch(usuarioLoaded(body.usuarios))

        } catch (error) {
            console.log(error)
        }
    }
}
export const usuarioStartUpdated = ( usuario ) => {

    return async(dispatch) =>{
        try {
            const resp = await fetchConToken(`events/${usuario.id}`, usuario , 'PUT');
            const body = await resp.json();

            if( body.ok ){
                dispatch( usuarioUpdate( usuario ) )
            }else{
                Swal.fire('Error', body.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const editInfoUser = (usuario) =>{
    return async(dispatch) =>{
        try {
            const resp = await fetchConToken(`cuentaUser/${usuario.id}`, usuario , 'PUT');
            const body = await resp.json();

            if( body.ok ){
                dispatch( usuarioUpdate( usuario ) )
            }else{
                Swal.fire('Error', body.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const usuarioStartDeleted= ( usuario )=>{
    return async(dispatch) =>{
        try {           
            const resp = await fetchConToken(`events/${usuario.id}`, usuario , 'PUT');
            const body = await resp.json();

            if( body.ok ){
                dispatch( usuarioDelete( usuario ))              
            }else{
                Swal.fire('Error', body.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }
}



const usuarioAddNew = ( usuario ) => ({

    type: types.usuarioAddNew,
    payload: usuario

});

const usuarioLoaded = ( usuario ) => ({

    type: types.usuarioLoaded,
    payload: usuario

});

const usuarioUpdate = ( usuario ) => ({

    type: types.usuarioUpdate,
    payload: usuario

});

const usuarioDelete = (rol) => ({

    type: types.usuarioDelete,
    payload: rol

});