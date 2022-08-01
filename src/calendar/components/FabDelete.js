import React from 'react'
import './Modal.css'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { addHours } from 'date-fns';

export const FabDelete = () => {

    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent()
    }

    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={handleDelete}
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <DeleteOutlineOutlinedIcon sx={{ fontSize: 40, marginTop: 'auto' }} />
        </button>
    )
}
