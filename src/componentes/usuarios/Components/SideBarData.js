import React from 'react';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import { pink } from '@mui/material/colors';

export const SideBarData = [
    {
        key: '1',
        title: 'Mi perfil',
        icon: < PermIdentityOutlinedIcon sx={{ color: 'white', fontSize: 30 }} />,
        // link: '/perfil',
    },
    {
        key: '2',
        title: 'Usuarios',
        icon: < ListAltOutlinedIcon sx={{ color: 'white', fontSize: 30 }} />,
        // link: '/usuariosLista',
    },
    {
        key: '3',
        title: 'Cuenta',
        icon: < BadgeOutlinedIcon sx={{ color: 'white', fontSize: 30 }} />,
        // link: '/seguridad',
    },
    {
        key: '4',
        title: 'Nuevo Usuario',
        icon: < PersonAddAltOutlinedIcon sx={{ color: 'white', fontSize: 30 }} />,
        // link: '/usuariosAdd',
    },
    // {
    //     title: 'Regresar',
    //     icon:< PersonAddAltOutlinedIcon />,
    //     link:'',
    // }
]
export const SideRegresar = {
    title: 'Regresar',
    icon: < KeyboardReturnOutlinedIcon sx={{ color: 'white', fontSize: 40 }} />,
    link: '/',
}

// export default SideBarData
/*
    MI PERFIL
    Usuarios
    Cuenta

*/