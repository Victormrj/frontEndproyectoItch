import { types } from '../types/types';
export const initialState = {
    equipo: [],
    activeEvent: null
}

export const equipoReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.equipoAddNew:
            return {
                ...state,
                equipo: [
                    ...state.equipo,
                    action.payload
                ]
            }
        case types.equipoLoaded: 
        return{
            ...state,
            equipo:[ ...action.payload ]
        }
        case types.equipoUpdate:
            return {
                ...state,
                equipo: state.equipo.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        default:
            return state;


    }

}