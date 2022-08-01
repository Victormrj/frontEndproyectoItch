import React from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesEs } from '../../helpers/getMessages';
// import  from 'date-fns/format'
// import  from 'date-fns/parse'
// import  from 'date-fns/startOfWeek'
// import  from 'date-fns/getDay'
// import enUS from 'date-fns/locale/en-US'
import { addHours } from 'date-fns';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState,useEffect } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
// import startLoadingEvents  from '../../hooks/useCalendarStore/startLoadingEvents';

import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';
import { eventoStartLoaded } from '../../actions/eventos';
import { useSelector } from 'react-redux';

// const events = [
//     {
//         title: 'Cumpleaños',
//         notes: 'Comprar pastel',
//         start: new Date(),
//         end: addHours(new Date(), 1),
//         bgColor: '#fafafa',
//         user: {
//             _id: '123',
//             name: 'victor'
//         }
//     }
// ]
export const CalendarPage = () => {

    const { openDateModal } = useUiStore();
    const { events, setActiveEvent,startLoadingEvents } = useCalendarStore();
    const { id } = useSelector(state => state.auth)

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log({event, start, end, isSelected });
    const isMyEvent = ( id === event.id_userEvento );


        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '10px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    const onDoubleClick = (event) => {
        // console.log({ doubleClick: event })
        openDateModal();

    }
    const onSelect = (event) => {
        // console.log({ click: event })
        setActiveEvent(event);
    }
    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event);
        setLastView(event)
        // console.log({viewChange: event})
    }

    useEffect(() => {
        startLoadingEvents()
        // eventoStartLoaded()
    }, [])

    return (
        <>
            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                messages={getMessagesEs()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />
            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    )
}
