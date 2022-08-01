import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';
import BurgerButton from '../componentsPersonalizados/BurgerButton'
import './Menu.css';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from "react-swipeable-views"
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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { CalendarPage } from '../../calendar/pages/CalendarPage';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#1E477A',
    color: 'white',
    // backgroundColor: theme.palette.common.white,
    // color: "rgba(0, 0, 0, 0.87)",
    boxShadow: 3,
    fontFamily: 'Monserrat, sans-serif',
    fontSize: 18
  }
}));

function MenuAdministrador(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { rol } = useSelector(state => state.auth)
  const [clicked, setClicked] = useState(false)
  const [tabValue, setTabValue] = React.useState(0);
  const [tabEfect, setTabEfect] = React.useState(0);
  const handleClick = () => {
    //cuando esta true lo pasa a false y vice versa
    setClicked(!clicked)
  }

  function ListItemLink(props) {
    return <ListItemButton component="a" {...props} />;
  }
  const handleLogout = () => {
    dispatch(startLogout());
  }
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    setTabEfect(newValue)
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Typography variant="h6"
        sx={{
          my: 2, textAlign: 'center',
          fontFamily: 'Monserrat, sans-serif',
          color: '#002F6C',
          fontSize: '1.5rem'
        }} >
        {rol}
      </Typography>
      <Divider />
      <List >
        <ListItem >
          <ListItemLink sx={{ textAlign: 'center' }} href="/AlmacenRout/">
            <ListItemIcon>
              <WarehouseOutlinedIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Almacen' />
          </ListItemLink>
        </ListItem>
        <ListItem  >
          <ListItemLink sx={{ textAlign: 'center' }} href="/MantenimientoRout">
            <ListItemIcon>
              <EngineeringOutlinedIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Mantenimiento' />
          </ListItemLink>
        </ListItem>
        <ListItem >
          <ListItemLink sx={{ textAlign: 'center' }} href="/RootUser/">
            <ListItemIcon>
              <GroupOutlinedIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Usuarios' />
          </ListItemLink>
        </ListItem>
        <ListItem >
          <ListItemLink sx={{ textAlign: 'center' }} href="/RootAsignaciones/">
            <ListItemIcon >
              <AssignmentOutlinedIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Asignaciones' />
          </ListItemLink>
        </ListItem>
        <ListItem >
          <ListItemLink sx={{ textAlign: 'center' }} href="#" onClick={handleLogout} >
            <ListItemIcon >
              <KeyboardReturnOutlinedIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Cerrar Sesión' />
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
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', fontFamily: 'Monserrat, sans-serif', fontSize: '2rem', letterSpacing: '0.5vh', fontStyle: 'regular' } }}
          >
            {rol}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button sx={{ color: '#fff' }} href="/AlmacenRout/">
              <LightTooltip title='Almacen' arrow>
                <WarehouseOutlinedIcon sx={{ color: 'white', marginRight: '2vh', fontSize: 30 }} />
              </LightTooltip>
            </Button>
            <Button sx={{ color: '#fff' }} href="/MantenimientoRout" >
              <LightTooltip title='Mantenimiento' arrow sx={{ fontSize: '4vh' }}>
                <EngineeringOutlinedIcon sx={{ color: 'white', marginRight: '2vh', fontSize: 30 }} />
              </LightTooltip>
            </Button>
            <Button sx={{ color: '#fff' }} href="/RootUser/">
              <LightTooltip title='Usuarios' arrow sx={{ fontSize: '4vh' }}>
                <GroupOutlinedIcon sx={{ color: 'white', marginRight: '2vh', fontSize: 30 }} />
              </LightTooltip>
            </Button>
            <Button sx={{ color: '#fff' }} href="/RootAsignaciones/">
              <LightTooltip title='Asignaciones' arrow sx={{ fontSize: '4vh' }}>
                <AssignmentOutlinedIcon sx={{ color: 'white', marginRight: '2vh', fontSize: 30 }} />
              </LightTooltip>
            </Button>
            <Button sx={{ color: '#fff' }} href="#" onClick={handleLogout} >
              <LightTooltip title='Cerrar Sesión' arrow sx={{ fontSize: '4vh' }}>
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
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <CalendarPage/>
      </Box>
    </Box>
  );
}

export default MenuAdministrador;

const NavContainer = styled.nav`
  h2{
    font-family: 'Montserrat', sans-serif;
    color: white;
    font-weight: 400;
    // padding: 2rem;
    font-size: 1.8rem;
    span{
      font-family: 'Montserrat', sans-serif;
      font-weight: bold;
      font-size: 1.8rem;
      letter-spacing: 6px;

    }
  }
  padding: .1rem;
  background-color: #1E477A;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a{
    // font-family: 'Montserrat', sans-serif;
    font-family: 'Montserrat';
    font-style: normal;
    color: white;
    text-decoration: none;
    margin-right: -rem;
    // margin-left: 5rem;
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
      color: white;
      font-size: 2rem;
      display: block;
    }
    @media(min-width: 768px){
      position: initial;
      margin: 0;
      a{
        font-size: 1.5rem;
        color: white;
        display: none;
        margin-left: 2vw;
        // padding: 1%;
      }
      display: block;
    }
  }
  .links.active{
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: 2rem;
    top: 15%;
    left: 0;
    right: 0;
    text-align: center;
    @media(min-width: 768px){
       a{
        padding:5px 8px;
        font-size: 2rem;
        margin-top: 1rem;
        color: white;
        display: inline;
        &:hover{
          border:1.5px solid white;
          border-radius: 10px;
        }
       }
    }
  }
  
//   .burguer{
//     @media(min-width: 768px){
//       display: none;
//     }
//   }
`

const BgDiv = styled.div`
background-color: rgba(30, 71, 122); 
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
    border-radius: 0 0 30% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 40%;
  }

  // @media(min-width: 768px){
  //   background-color:  rgba(30, 71, 122);
  //   position: absolute;
  //   top: -1000px;
  //   left: -1000px;
  //   width: 100%;
  //   height: 100%;
  //   z-index: 0;
  //   transition: all .6s ease ;
  //   &.active{
  //       border-radius: 0 0 40% 0;
  //       top: 0;
  //       left: 0;
  //       width: 100%;
  //       height: 50%;
  //   }
  // } 
`