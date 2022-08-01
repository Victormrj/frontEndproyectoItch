import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux'
import { convertEventsToDate } from '../helpers/convertEventsToDate';
import { onLoadEvents } from '../store/calendar/calendarSlice';

export const eventoStartAddNew = (evento) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('eventos', evento, 'POST');
            const body = await resp.json();

            if (body.ok) {
                dispatch(eventoAddNew(evento));
                console.log({ body })
                // Swal.fire('Usuario agregada con exito!!', body.msg);

            } else {
                Swal.fire('Error', body.msg)
            }

        } catch (error) {
            console.log(error)
        }
    }
}
export const eventoStartLoaded = async () => {
    // const dispatch = useDispatch()

    // return async (dispatch) => {
        try {
            const resp = await fetchConToken('eventos');
            const body = await resp.json();
            // dispatch(eventoLoaded(body.eventos))
            console.log({ body })
            const events = convertEventsToDate(body.eventos);
            console.log(events)
            // dispatch(onLoadEvents(events))
        } catch (error) {
            console.log(error)
        }
    // }
}
export const eventoStartUpdated = (evento) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`eventos/${evento.id}`, evento, 'PUT');
            const body = await resp.json();
            if (body.ok) {
                // dispatch(materiaUpdate(material))
            } else {
                Swal.fire('Error', body.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
const eventoAddNew = (evento) => ({

    type: types.eventosAddNew,
    payload: evento

});

const eventoLoaded = (evento) => ({

    type: types.eventosLoaded,
    payload: evento

});

const eventoUpdate = (evento) => ({

    type: types.eventosUpdate,
    payload: evento

});

const eventoDelete = (rol) => ({

    type: types.eventosDelete,
    payload: rol

});