import React from 'react';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListIcon from '@mui/icons-material/List';


export const BarDataEmpleado = [
    {
        key: '1',
        title: 'Personal',
        icon: < PermIdentityOutlinedIcon sx={{ color: 'white', fontSize: 30 }} />,
    },
    // {
    //     key: '2',
    //     title: 'Nueva asignación',
    //     icon: < AssignmentIcon sx={{ color: 'white', fontSize: 30 }} />,
    // },
    {
        key: '2',
        title: 'Lista de Asignaciones',
        icon: < ListIcon sx={{ color: 'white', fontSize: 30 }} />,
    }
];
export const SideRegresar = {
    title: 'Regresar',
    icon: < KeyboardReturnOutlinedIcon sx={{ color: 'white', fontSize: 40 }} />,
    link: '/',
}
