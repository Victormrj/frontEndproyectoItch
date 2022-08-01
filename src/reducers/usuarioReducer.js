import { types } from '../types/types';
export const initialState = {
    usuario: [],
    activeEvent: null
}

export const usuarioReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.usuarioAddNew:
            return {
                ...state,
                usuario: [
                    ...state.usuario,
                    action.payload
                ]
            }
        case types.usuarioLoaded:
            return {
                ...state,
                usuario: [...action.payload]
            }
        case types.usuarioUpdate:
            return {
                ...state,
                usuario: state.usuario.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }

        default:
            return state;


    }

}