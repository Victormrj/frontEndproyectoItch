import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Grid, Paper, Stack, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../inventario/Menu.css';
// import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import moment from 'moment';
import moment from 'moment'; import 'moment-timezone';
import { es } from 'date-fns/locale'
// var moment = require('moment-timezone');
import { equipoStartLoaded, equipoStartAddNew, equipoStartUpdated, equipoStartDeleted } from '../../actions/equipos';
import SwipeableViews from "react-swipeable-views"
import { styled } from "@mui/material/styles";
import Tabs from '@mui/material/Tabs';
import Tab, { tabsClasses } from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
// import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { Divider } from '@material-ui/core';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const periodoMantenimiento = [
  'Mes',
  'Año'
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) == -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}
const currencies = [
  {
    value: 'Mes',
    label: 'Mes',
  },
  {
    value: 'Año',
    label: 'Año',
  }
];
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const EquipoAdd = () => {
  moment.locale();
  const theme = useTheme();

  const dispatch = useDispatch();

  const [personName, setPersonName] = React.useState([]);
  const [currency, setCurrency] = React.useState('');

  const [value, setValue] = React.useState(new Date(moment.tz("America/Mexico_City").format('L')));
  const [valueProx, setValueProx] = React.useState();
  const [ingreso, setIngreso] = React.useState(new Date(moment.tz("America/Mexico_City").format('L')));
  const [tabValue, setTabValue] = React.useState(0);
  const [tabEfect, setTabEfect] = React.useState(0);

  const { id } = useSelector(state => state.auth);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    setTabEfect(newValue)
  };
  const [formEquipos, setFormEquipos] = useState({
    nombreEquio: '',
    numInventario: '',
    modelo: '',
    numSerie: '',
    voltaje: '',
    corriente: '',
    watts: '',
    temperatura: '',
    hp: '',
    hz: '',
    peso: '',
    presion: '',
    volumen: '',
    rpm: '',
    fechaIngreso: value,
    capacidad: '',
    cantidadEquipos: '',
    observaciones: '',
    numPeriodo: '',
    numMes: '',
    inicioMantenimiento: '',
    proximoMantenimiento: '',
    estadoEquipo: 'Disponible',
    user_idE: id

  });

  const { nombreEquio, numInventario, modelo, numSerie, voltaje, corriente, watts, temperatura, hp, hz, peso, presion, volumen,
    rpm, fechaIngreso, capacidad, cantidadEquipos, observaciones, numMes, inicioMantenimiento, proximoMantenimiento } = formEquipos;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrency(value);

    setFormEquipos({ ...formEquipos, numPeriodo: value })


    console.log(value)
  };

  //FECHAS  
  const handleFechaIn = (fecha) => {

    // const { target: { value } } = newValue;
    setValue(fecha);
    console.log(fecha)
    //AQUI SE CAMBIARA LA FECHA EN EL FORMVALUES  
  };

  const handleFechas = (newValue) => {
    const { inicioMantenimiento, numMes, numPeriodo } = formEquipos;
    // const { target: { value } } = newValue;
    setValue(newValue);
    console.log(numMes)
    if (numPeriodo == 'Mes') {
      var new_date = new Date(moment(newValue).add(numMes, 'M').tz("America/Mexico_City").format('L'));
      // console.log('CAMBIO',new_date)
      setValueProx(new_date);
      setFormEquipos({ ...formEquipos, inicioMantenimiento: newValue, proximoMantenimiento: new_date })
    } else if (numPeriodo == 'Año') {
      var new_date = new Date(moment(newValue).add(numMes, 'y').tz("America/Mexico_City").format('L'));
      // console.log('CAMBIO',new_date)
      setValueProx(new_date);
      setFormEquipos({ ...formEquipos, inicioMantenimiento: newValue, proximoMantenimiento: new_date })
    }
  };

  const handleInputChange = ({ target }) => {
    setFormEquipos({
      ...formEquipos,
      [target.name]: target.value
    });
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    dispatch(equipoStartAddNew(formEquipos));

    console.log(formEquipos);

  }
  const StyledTabs = styled((props) => (
    <Tabs 
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))
    ({
      //  color:'red',
      "& .MuiTabs-indicator": {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent"
      },
      "& .MuiTabs-indicatorSpan": {
        maxWidth: '100%',
        width: "100%",
        backgroundColor: "#706c6c"
      }
    });
  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      fontFamily: 'Monserrat, sans-serif',
      fontWeight: 400,
      fontStyle: 'regular',

      textTransform: "none",
      // fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(20),
      marginRight: theme.spacing(1),
      color: "rgba(255, 255, 255, 0.7)",
      "&.Mui-selected": {
        color: "#fff"
      },
      "&.Mui-focusVisible": {
        backgroundColor: "rgba(100, 95, 228, 0.32)"
      }
    })
  );
  useEffect(() => {
    // cambioFech()
  }, []);

  return (
    <>
      <Paper elevation={0}>
        <Grid
          container
          direction='row'
          justifyContent='space-around'
          alignItems='center'
        >
          <Paper sx={{
            width: '100%', margin: '2vh', borderRadius: '15px',
            alignItems: 'center', justifyContent: 'space-around'
          }} elevation={20}>
            <Typography variant='h1' component='div' align='center'
              sx={{
                fontFamily: 'Monserrat, sans-serif',
                fontWeight: 400,
                fontStyle: 'regular',
                color: '#002F6C',
                fontSize: '2.5rem',
                letterSpacing: '1vh',
                marginTop: '2vh',
                marginBottom: '2vh',
              }}>
              Alta de Equipo
            </Typography>
          </Paper>
        </Grid>

        <Grid container >
          <Box sx={{maxWidth: { xs:'100%' , sm: '80%' }, borderColor: '#002F6C', marginLeft: 'auto', marginRight: 'auto' }}>
            <Box sx={{ borderBottom: 4, borderColor: 'divider' }}>
              <AppBar position="static">
                <StyledTabs 
                  sx={{ backgroundColor: '#002F6C' }}
                  value={tabValue}     
                  onChange={handleChangeTab}
                  variant="scrollable"
                  // centered
                  allowScrollButtonsMobile
                  aria-label="visible arrows tabs example" 
                 >
                  {/* <Tabs value={tabValue} onChange={handleChangeTab}
                textColor="inherit"
                variant="fullWidth" aria-label="full width tabs example"> */}
                  <StyledTab label="Datos de Almacen"  {...a11yProps(0)} />
                  <StyledTab label="Caracteristicas del Equipo" {...a11yProps(1)} />
                  <StyledTab label="Periodo de Mantenimiento" {...a11yProps(2)} />

                </StyledTabs>
                {/* </Tabs> */}
              </AppBar>

            </Box>

            <form onSubmit={handleSubmitForm}>
              <SwipeableViews
                // enableMouseEvents
                //  action={actions => setSwipeableActions(actions)}'x', 'x-reverse', 'y', 'y-reverse'
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x-reverse'}
                index={tabValue}
                onChangeIndex={handleChangeTab}>

                <TabPanel value={tabValue} index={0} dir={theme.direction} >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} >
                      <TextField id="outlined-basic" label="Nombre del equipo" variant="outlined" name='nombreEquio' value={nombreEquio} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} >
                      <TextField id="outlined-basic" label="No. de Inventario" variant="outlined" name='numInventario' value={numInventario} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} >
                      <TextField id="outlined-basic" label="Modelo" variant="outlined" name='modelo' value={modelo} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} >
                      <TextField id="outlined-basic" label="Serie" variant="outlined" name='numSerie' value={numSerie} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <DesktopDatePicker label="Fecha Ingreso" inputFormat="dd/MM/yyyy" value={ingreso} onChange={handleFechaIn} disabled
                            renderInput={(params) => <TextField {...params} disabled />}
                          />
                        </Stack>
                      </LocalizationProvider>
                      {/* <TextField id="outlined-basic" label="Fecha de Ingreso" variant="outlined" disabled /> */}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} >
                      <TextField id="outlined-basic" label="Cantidad de Equipos" variant="outlined" type="number" name='cantidadEquipos' value={cantidadEquipos} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}  >
                      <TextField
                        id="standard-multiline-static"
                        label="Observaciones"
                        multiline
                        rows={4}
                        placeholder="Observaciones"
                        value={observaciones}
                        // defaultValue="Default Value"
                        variant="outlined"
                        onChange={handleInputChange} />
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={tabValue} index={1} dir={theme.direction} >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={4} >
                      <TextField id="outlined-basic" label="Voltaje" variant="outlined" name='voltaje' value={voltaje} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} >
                      <TextField id="outlined-basic" label="Corriente" variant="outlined" name='corriente' value={corriente} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} >
                      <TextField id="outlined-basic" label="Watts" variant="outlined" name='watts' value={watts} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} >
                      <TextField id="outlined-basic" label="Temperatura" variant="outlined" name='temperatura' value={temperatura} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} >
                      <TextField id="outlined-basic" label="HP" variant="outlined" name='hp' value={hp} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} >
                      <TextField id="outlined-basic" label="Hz" variant="outlined" name='hz' value={hz} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} >
                      <TextField id="outlined-basic" label="Peso" variant="outlined" name='peso' value={peso} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} >
                      <TextField id="outlined-basic" label="Presion" variant="outlined" name='presion' value={presion} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} >
                      <TextField id="outlined-basic" label="Volumen" variant="outlined" name='volumen' value={volumen} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} >
                      <TextField id="outlined-basic" label="RPM" variant="outlined" name='rpm' value={rpm} onChange={handleInputChange} />
                    </Grid>
                    <Grid xs={12} sm={4} md={4} item >
                      <TextField id="outlined-basic" label="Capacidad" variant="outlined" name='capacidad' value={capacidad} onChange={handleInputChange} />
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={tabValue} index={2} dir={theme.direction} >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Periodo Mantenimiento"
                        value={currency}
                        onChange={handleChange}
                        // placeholder='Seleccionar'
                        helperText="Seleccione el periodo de mantenimiento"
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} >
                      <TextField id="outlined-basic" label="No. de Meses/año" variant="outlined" type="number" name='numMes' value={numMes} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <DesktopDatePicker label="A partir del dia" inputFormat="dd/MM/yyyy" value={value} onChange={handleFechas}
                            renderInput={(params) => <TextField {...params} disabled />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}  >
                        <Stack spacing={3}>
                          <DesktopDatePicker label='Proximo Mantenimiento:' inputFormat="dd/MM/yyyy" value={valueProx} onChange={handleFechas} disabled focused
                            renderInput={(params) => <TextField {...params} disabled />}
                          />
                        </Stack>
                      </LocalizationProvider>
                      {/* <TextField id="outlined-basic"  label="" variant="outlined" disabled name='proximoMantenimiento' value={proximoMantenimiento} onChange={handleFechas} /> */}
                    </Grid>

                  </Grid>
                  <Divider />
                  <Button variant="outlined" className='btnAgregarMaterial' type='submit'
                    sx={{
                      marginTop: '2vh',
                      backgroundColor: '', color: '#002F6C', borderRadius: '5vh', fontWeight: 560, letterSpacing: '0.5vh',
                      fontFamily: 'Monserrat, sans-serif',
                      fontStyle: 'regular'
                    }}>Aceptar</Button>
                </TabPanel>
              </SwipeableViews>
            </form>
          </Box>
        </Grid>
      </Paper>
    </>
  )
}
export default EquipoAdd;