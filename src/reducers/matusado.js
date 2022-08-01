import { types } from '../types/types';
export const initialState = {
    usado: [],
    activeEvent: null
}

export const matUsado = (state = initialState, action) => {

    switch (action.type) {
        case types.materialUsadoAddNew:
            return {
                ...state,
                usado: [
                    ...state.usado,
                    action.payload
                ]
            }
        case types.materialUsadoLoaded: 
        return{
            ...state,
            usado:[ ...action.payload ]
        }
        case types.materialUsadoUpdate:
            return {
                ...state,
                usado: state.usado.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        default:
            return state;


    }

}