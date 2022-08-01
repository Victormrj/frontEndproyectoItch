import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2';
import { eventoStartAddNew, eventoStartLoaded } from '../actions/eventos';
import { convertEventsToDate } from '../helpers/convertEventsToDate';
import { fetchConToken } from '../helpers/fetch';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice'

const baseUrl = process.env.REACT_APP_API_URL;

export const useCalendarStore = () => {

  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector(state => state.calendar)
  // const { id } = useSelector(state => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    //TODO: llegar al backend

    //Todo bien
    if (calendarEvent.id) {
      //actualizando
      const resp = await fetchConToken(`eventos/${calendarEvent.id}`, calendarEvent, 'PUT');
      // const body = await resp.json();
      dispatch(onUpdateEvent({ ...calendarEvent, id:calendarEvent.id }));
      return;
    }

    const resp = await fetchConToken('eventos', calendarEvent, 'POST');
    const body = await resp.json();
    console.log({ body })
    // dispatch(eventoStartAddNew(calendarEvent))
    dispatch(onAddNewEvent({ ...calendarEvent }))



  }

  const startDeletingEvent =async () => {
    //Todo: llegar al backend
    // const { id } = activeEvent

    try {
      const resp = await fetchConToken(`eventos/${activeEvent.id}`, {activeEvent},'DELETE');
      console.log('active',activeEvent.id)      
      
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error)
      Swal.fire('Error al eliminar', error.resp.body.msg,'error')
    }


  }

  const startLoadingEvents = async () => {
    try {
      const resp = await fetchConToken('eventos');
      const body = await resp.json();
      console.log({ body })
      const events = convertEventsToDate(body.eventos);
      console.log(events)
      dispatch(onLoadEvents(events))

    } catch (error) {
      console.log(error)
    }
  }

  return {
    //Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,


    //Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
    // startLoadingEvents
  }
}





