import { types } from '../types/types';
export const initialState = {
    mantenimiento: [],
    activeEvent: null
}

export const mantenimientoReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.mantenimientoAddNew:
            return {
                ...state,
                mantenimiento: [
                    ...state.mantenimiento,
                    action.payload
                ]
            }
        case types.mantenimientoLoaded: 
        return{
            ...state,
            mantenimiento:[ ...action.payload ]
        }
        case types.mantenimientoUpdate:
            return {
                ...state,
                mantenimiento: state.mantenimiento.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        default:
            return state;


    }

}