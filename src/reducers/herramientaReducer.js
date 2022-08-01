import { types } from '../types/types';
export const initialState = {
    herramienta: [],
    activeEvent: null
}

export const herramientaReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.herramientaAddNew:
            return {
                ...state,
                herramienta: [
                    ...state.herramienta,
                    action.payload
                ]
            }
        case types.herramientaLoaded: 
        return{
            ...state,
            herramienta:[ ...action.payload ]
        }
        case types.herramientaUpdate:
            return {
                ...state,
                herramienta: state.herramienta.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        default:
            return state;


    }

}