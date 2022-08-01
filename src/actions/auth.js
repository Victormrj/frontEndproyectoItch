import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from 'sweetalert2'
import { Navigate } from "react-router-dom";
import { onLogoutCalendar } from "../store/calendar/calendarSlice";
// import MenuAdministrador from "../componentes/inventario/MenuAdministrador";

export const startLogin = (email, password) => {
    return async (dispatch) => {

        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();  
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( login({
                id: body.id,
                nombre: body.nombre,
                apellidoP: body.apellidoP,
                apellidoM:body.apellidoM,
                numControl: body.numControl,
                sexo: body.sexo,
                rol: body.rol
            }));

            // if(body.rol = 'servicio social'){
            //     console.log('HOLA')
            // }


        }else{
            Swal.fire('Error', body.msg,'error');
        }
    }
}

export const startChecking = () =>{
    return async(dispatch)=>{

        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();


        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                id: body.id,
                nombre: body.nombre,
                apellidoP: body.apellidoP,
                apellidoM:body.apellidoM,
                numControl: body.numControl,
                sexo: body.sexo,
                rol: body.rol
            }))

        }else{
            // Swal.fire('Error', body.msg,'error');
            dispatch( checkingFinish() );
        }
    }    
}

const checkingFinish = () =>({ type: types.authCheckingFinish });

const login = (user) => ({
    type: types.authLogin,
    payload: user
})
export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( logout() );
        
        dispatch( onLogoutCalendar() )
    }
}

const logout = () => ({ type: types.authLogout })