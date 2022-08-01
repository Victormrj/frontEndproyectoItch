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
import { makeStyles } from '@material-ui/core/styles';
import { LightTooltip } from './components/Personalizado'

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function HerramientaMenu(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();


  function ListItemLink(props) {
    return <ListItemButton component="a" {...props} />;
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Typography variant="h6" 
      sx={{ my: 2, textAlign: 'center',
      fontFamily: 'Monserrat, sans-serif',
      color: '#002F6C',
      fontSize: '1.5rem' }} >
        Herramientas
      </Typography>
      <Divider />
      <List >
        <ListItem >
          <ListItemLink sx={{ textAlign: 'center' }} href="/Herramienta/">
            <ListItemIcon>
              <NotificationsOutlinedIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Notificaciones' />
          </ListItemLink>
        </ListItem>
        <ListItem  >
          <ListItemLink sx={{ textAlign: 'center' }} href="/Herramienta/AgregarHerramienta">
            <ListItemIcon>
              <AddBoxOutlinedIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Nueva Herramienta' />
          </ListItemLink>
        </ListItem>
        <ListItem >
          <ListItemLink sx={{ textAlign: 'center' }} href="/Herramienta/ListadoHerramientas">
            <ListItemIcon>
              <ListAltOutlinedIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Listado' />
          </ListItemLink>
        </ListItem>
        <ListItem >
          <ListItemLink sx={{ textAlign: 'center' }} href="/AlmacenRout">
            <ListItemIcon >
              <KeyboardReturnOutlinedIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Volver a Almacen' />
          </ListItemLink>
        </ListItem>
        {/* ))} */}
      </List>
    </Box>
  );

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
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block',fontFamily: 'Monserrat, sans-serif',fontSize: '2rem',letterSpacing: '0.5vh',fontStyle: 'regular' } }}
          >
            Herramientas
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button sx={{ color: '#fff' }} href="/Herramienta/">
              <LightTooltip title='Notificaciones'>
              <NotificationsOutlinedIcon sx={{ color: 'white', marginRight: '2vh', fontSize: 30 }} />
              </LightTooltip>
              
            </Button>
            <Button sx={{ color: '#fff' }} href="/Herramienta/AgregarHerramienta" >
              <LightTooltip title='Nueva Herramienta'>
              <AddBoxOutlinedIcon sx={{ color: 'white', marginRight: '2vh', fontSize: 30 }} />
              </LightTooltip>
              
            </Button>
            <Button sx={{ color: '#fff' }} href="/Herramienta/ListadoHerramientas">
              <LightTooltip title ='Listado'>
              <ListAltOutlinedIcon sx={{ color: 'white', marginRight: '2vh', fontSize: 30 }} />
              </LightTooltip>
            </Button>
            <Button sx={{ color: '#fff' }} href="/AlmacenRout">
              <LightTooltip title='Volver a Almacen'>
              <KeyboardReturnOutlinedIcon sx={{ color: 'white', marginRight: '2vh', fontSize: 30 }} />
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
  );
}
export default HerramientaMenu
