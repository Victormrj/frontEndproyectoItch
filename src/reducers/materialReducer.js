import { types } from '../types/types';
export const initialState = {
    material: [],
    activeEvent: null
}

export const materialReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.materialAddNew:
            return {
                ...state,
                material: [
                    ...state.material,
                    action.payload
                ]
            }
        case types.materialLoaded: 
        return{
            ...state,
            material:[ ...action.payload ]
        }
        case types.materiaUpdate:
            return {
                ...state,
                material: state.material.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        default:
            return state;


    }

}