import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { equipoReducer } from './equipoReducer';
import { herramientaReducer } from './herramientaReducer';
import { materialReducer } from './materialReducer';
import { usuarioReducer } from './usuarioReducer';
import { mantenimientoReducer } from './mantenimientoReducer'
import { matUsado } from './matusado'
import { uiSlice } from '../store/ui/uiSlice';
import { calendarSlice } from '../store/calendar/calendarSlice';
import { authSlice } from '../store/auth/authSlice';

export const rootReducer = combineReducers({
    auth:     authReducer,
    material: materialReducer,
    herramienta: herramientaReducer,
    equipo: equipoReducer,
    usuario: usuarioReducer,
    mantenimiento: mantenimientoReducer,
    usado: matUsado,
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
    authSlic: authSlice.reducer
    

    // ui: uiSlice.reducer

})