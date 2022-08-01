import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import BurgerButton from '../componentsPersonalizados/BurgerButton'


import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InboxIcon from '@material-ui/icons/Inbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
// import React from 'react';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import PlaylistRemoveOutlinedIcon from '@mui/icons-material/PlaylistRemoveOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import { makeStyles } from '@material-ui/core/styles';

import { LightTooltip } from '../inventario/components/Personalizado'


const drawerWidth = 240;
const navItems = ['Notificaciones', 'Nuevo Material', 'Listado', 'Volver a almacen'];
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function EquiposMenu(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();


  const [clicked, setClicked] = useState(false)
  const handleClick = () => {
    //cuando esta true lo pasa a false y vice versa
    setClicked(!clicked)
  }


  function ListItemLink(props) {
    return <ListItemButton component="a" {...props} />;
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} >
      <Typography variant='h6' sx={{ my: 2, textAlign: 'center' }}>
        Equipos
      </Typography>
      <Divider />
      <List >
        <ListItem >
          <ListItemLink sx={{ textAlign: 'center' }} href="/EquipRout/">
            <ListItemIcon>
              <NotificationsOutlinedIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Notificaciones' />
          </ListItemLink>
        </ListItem>

        <ListItem  >
          <ListItemLink sx={{ textAlign: 'center' }} href="/EquipRout/EquipoBajas">
            <ListItemIcon>
              <PlaylistRemoveOutlinedIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Bajas de equipos' />
          </ListItemLink>
        </ListItem>
        <ListItem  >
          <ListItemLink sx={{ textAlign: 'center' }} href="/EquipRout/EquiposLista">
            <ListItemIcon>
              <ListOutlinedIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Lista de equipos' />
          </ListItemLink>
        </ListItem>
        <ListItem  >
          <ListItemLink sx={{ textAlign: 'center' }} href="/EquipRout/EquipoAdd">
            <ListItemIcon>
              <AddOutlinedIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Nuevo equipo' />
          </ListItemLink>
        </ListItem>

        <ListItem >
          <ListItemLink sx={{ textAlign: 'center' }} href="/MantenimientoRout">
            <ListItemIcon>
              <UndoOutlinedIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Volver' />
          </ListItemLink>
        </ListItem>
        {/* ))} */}
      </List>

    </Box>
  )
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{ backgroundColor: '#1E477A' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Equipos
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button sx={{ color: '#fff' }} href="/EquipRout/">
              <LightTooltip title='Notificaciones' >
              <NotificationsOutlinedIcon sx={{ color: 'white', marginRight: '2vh', fontSize: 30 }} />
              </LightTooltip>
            </Button>
            <Button sx={{ color: '#fff' }} href="/EquipRout/EquipoBajas" >
              <LightTooltip title='Bajas de equipos' >
              <PlaylistRemoveOutlinedIcon sx={{ color: 'white', marginRight: '2vh', fontSize: 30 }} />
              </LightTooltip>
            </Button>
            <Button sx={{ color: '#fff' }} href="/EquipRout/EquiposLista" >
              <LightTooltip title='Lista de equipos' >
              <ListOutlinedIcon sx={{ color: 'white', marginRight: '2vh', fontSize: 30 }} />
              </LightTooltip>
            </Button>
            <Button sx={{ color: '#fff' }} href="/EquipRout/EquipoAdd" >
              <LightTooltip title='Nuevo equipo' >
              <AddOutlinedIcon sx={{ color: 'white', marginRight: '2vh', fontSize: 30 }} />
              </LightTooltip>
            </Button>
            <Button sx={{ color: '#fff' }} href="/MantenimientoRout">
              <LightTooltip title='Volver' >
              <UndoOutlinedIcon sx={{ color: 'white', marginRight: '2vh', fontSize: 30 }} />
              </LightTooltip>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </Box>
  )

  // const [clicked, setClicked] = useState(false)
  // const handleClick = () => {
  //   setClicked(!clicked)
  // }
  // return (
  //   <>
  //     <NavContainer>
  //       <h2><span>Equipos</span></h2>
  //       <div className={`links ${clicked ? 'active' : ''}`}>
  //         <Link to='/EquipRout/' >Notificaciones</Link>
  //         <Link to='/EquipRout/EquipoBajas' >Bajas de Equipos</Link>
  //         <Link to='/EquipRout/EquiposLista' >Lista de Equipos</Link>
  //         <Link to='/EquipRout/EquipoAdd' >Nuevo Equipo</Link>
  //         <Link to='/MantenimientoRout'>Volver</Link>
  //       </div>
  //       <div className='burguer'>
  //         <BurgerButton clicked={clicked} handleClick={handleClick} />
  //       </div>
  //       <BgDiv className={`initial ${clicked ? ' active' : ''}`}></BgDiv>
  //     </NavContainer>
  //   </>
  // )
}

export default EquiposMenu

const NavContainer = styled.nav`
  h2{
    margin-left: 2vh;
    color: white;
    // padding: 2rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    span{
      font-family: 'Montserrat', sans-serif;
      font-weight: bold;
      font-size: 2rem;
      letter-spacing: 6px;

    }
  }
  padding: .1.5rem;
  background-color: #1E477A;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a{
    color: white;
    text-decoration: none;
    margin-right: 2.5rem;
    font-family: 'Montserrat', sans-serif;
    // font-weight: 600;
  }
  .links{
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all .5s ease;
    a{
      padding:2px 10px;
      color: white;
      font-size: 2rem;
      display: block;
    }
    @media(min-width: 768px){
      position: initial;
      margin: 0;
      a{
        padding:1px 10px;
        font-size: 3vh;
        color: white;
        display: inline;
        margin-left: 1vw;
        // padding: 10;
        &:hover{
          border:1px solid white;
          border-radius: 10px;
        }
      }
      display: block;
    }
  }
  .links.active{
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 15%;
    left: 0;
    right: 0;
    text-align: center;
    @media(min-width: 768px){
       a{
         
        font-size: 2rem;
        margin-top: 1rem;
        color: white;
        display: inline;
       }
    }
  }
  
  .burguer{
    @media(min-width: 768px){
      display: none;
    }
  }
`

const BgDiv = styled.div`
background-color: rgba(30, 71, 122,0.8); 
// opacity: 0.8;
//   background-color: #1E477A;
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all .6s ease ;

  &.active{
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 45%;
  }

//   @media(min-width: 768px){
//     background-color:  rgba(30, 71, 122,0.6);
//     position: absolute;
//     top: -1000px;
//     left: -1000px;
//     width: 100%;
//     height: 100%;
//     z-index: -1;
//     transition: all .6s ease ;
//     &.active{
//         border-radius: 0 0 80% 0;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 50%;
//     }
//   }
  
  
`
