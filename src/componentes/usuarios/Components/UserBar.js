import React, { useEffect, useState } from 'react';

import { SideBarData, SideRegresar } from './SideBarData';
import './MenuBar.css'
import { UsuariosAdd } from '../UsuariosAdd';
import MiPerfil from '../MiPerfil';
import CuentaUser from '../CuentaUser';
import ListUsuarios from '../listUsuarios';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
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
import { makeStyles } from '@material-ui/core/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { LightTooltip } from '../../inventario/components/Personalizado'
import CssBaseline from '@mui/material/CssBaseline';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';


const drawerWidth = 240;

export const UserBar = (props) => {

  const [buttonClicked, setButtonClicked] = useState(false);
  const [valor, setValor] = useState();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [clicked, setClicked] = useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  function ListItemLink(props) {
    return <ListItemButton component="a" {...props} />;
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleMenu = (valor) => {
    // console.log(valor)    
  }
  const handleComponent = () => {
    if (valor == 1 || valor == null) {
      return (<MiPerfil />)
    } else if (valor == 2) {
      return (<ListUsuarios />)
    } else if (valor == 3) {
      return (<CuentaUser />)
    } else if (valor == 4) {
      return (<UsuariosAdd />)
    }
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Toolbar />
      <Divider />
      <List>
        <ListItem >
          <ListItemLink sx={{ textAlign: 'center' }}
            selected={selectedIndex == 0}
            variant={selectedIndex == 0 ? 'soft' : 'plain'}
            color={selectedIndex == 0 ? 'danger' : undefined}
            onClick={(event) => { setValor(1); handleListItemClick(event, 0) }}
          >
            <ListItemIcon>
              < PermIdentityOutlinedIcon sx={{ color: '#1E477A', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary='Mi perfil' />
          </ListItemLink>
        </ListItem>

        <ListItem  >
          <ListItemLink sx={{ textAlign: 'center' }}
            selected={selectedIndex == 1}
            variant={selectedIndex == 1 ? 'soft' : 'plain'}
            color={selectedIndex == 1 ? 'danger' : undefined}
            onClick={(event) => { setValor(2); handleListItemClick(event, 1) }} >
            <ListItemIcon>
              <ListAltOutlinedIcon sx={{ color: '#1E477A', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary='Usuarios' />
          </ListItemLink>
        </ListItem>

        <ListItem >
          <ListItemLink sx={{ textAlign: 'center' }}
            selected={selectedIndex === 2}
            onClick={(event) => { setValor(3); handleListItemClick(event, 2) }}>
            <ListItemIcon>
              <BadgeOutlinedIcon sx={{ color: '#1E477A', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary='Cuenta' />
          </ListItemLink>
        </ListItem>

        <ListItem >
          <ListItemLink sx={{ textAlign: 'center' }}
            selected={selectedIndex === 3}
            onClick={(event) => { setValor(4); handleListItemClick(event, 3) }}>
            <ListItemIcon>
              <PersonAddAltOutlinedIcon sx={{ color: '#1E477A', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary='Nuevo Usuario' />
          </ListItemLink>
        </ListItem>

        <ListItem >
          <ListItemLink sx={{ textAlign: 'center' }} href="/">
            <ListItemIcon >
              <KeyboardReturnOutlinedIcon sx={{ color: '#1E477A', fontSize: 40 }} />
            </ListItemIcon>
            <ListItemText primary='Regresar' />
          </ListItemLink>
        </ListItem>
        {/* ))} */}
      </List>
    </Box>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            bgcolor: '#1E477A'
          }}
        >
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
            <Typography variant="h6" noWrap component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block', fontFamily: 'Monserrat, sans-serif', fontSize: '2rem', letterSpacing: '0.5vh', fontStyle: 'regular' }
              }}>
              Gestion de Usuarios
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          {handleComponent()}
        </Box>
      </Box>
      <div className='contenido'>
      </div>
    </>
  )
}

export default UserBar