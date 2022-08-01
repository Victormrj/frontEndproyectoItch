import React from 'react'
import './Modal.css'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { addHours } from 'date-fns';
import { useSelector } from 'react-redux';

export const FabAddNew = () => {
    const { id } = useSelector(state => state.auth)

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            // _id: new Date().getTime(),
            title: '',
            notes: '',
            start: new Date(),
            end: new Date(),
            // end: addHours(new Date(), 1),
            bgColor: '#fafafa',
            id_userEvento: id
        })
        openDateModal();
    }

    return (
        <button
            className='btn btn-primary fab'
            onClick={handleClickNew}
        >
            <AddOutlinedIcon sx={{ fontSize: 40, marginTop: 'auto' }} />
        </button>
    )
}
