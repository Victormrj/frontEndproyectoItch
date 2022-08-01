import { Container, Grid, Paper, TextField, Stack } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import './Menu.css';
import React, { useEffect, useState } from 'react';
import './Menu.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { materialStartAddNew, materialAddNew, temporalStartAddNew } from '../../actions/material';
import moment from 'moment'; import 'moment-timezone';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
// import SwipeableViews from 'react-swipeable-views';
import SwipeableViews from "react-swipeable-views"
import { styled } from "@mui/material/styles";
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
const names = [
  'Plomeria',
  'Electricidad',
  'Farmacia',
];

const tipoMat = [
  {
    value: 'Plomeria',
    label: 'Plomeria',
  },
  {
    value: 'Electricidad',
    label: 'Electricidad',
  },
  {
    value: 'Farmacia',
    label: 'Farmacia',
  },
];

const unidadMedida = [
  {
    value: 'Metros',
    label: 'Metros'
  },
  {
    value: 'Piezas',
    label: 'Piezas'
  },
  {
    value: 'Kilogramos',
    label: 'Kilogramos'
  },
  {
    value: 'Litros',
    label: 'Litros'
  },
  {
    value: 'Metros Cuadrados',
    label: 'Metros Cuadrados'
  },
  {
    value: 'Metros Cubicos',
    label: 'Metros Cubicos'
  }
]

const areaUbicacion = [
  {
    value: 'Bodega Edificio D',
    label: 'Bodega Edificio D'
  },
  {
    value: 'Bodega Edificio G',
    label: 'Bodega Edificio G'
  },
  {
    value: 'Bodega de Intendencia Edificio (D)',
    label: 'Bodega de Intendencia Edificio (D)'
  },
  {
    value: 'Oficina Mantenimiento (Edificio D)',
    label: 'Oficina Mantenimiento (Edificio D)'
  }
]

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

const steps = ['Datos de Material', 'Datos de Adquisicion', 'Informacion de Fecha'];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  label: {
    color: "#FFF000"
  },
  indicator: {
    backgroundColor: "red"
  }
});
export const AgregarMaterial = () => {
  const dispatch = useDispatch();
  const [fechaAct, setValue] = React.useState(new Date());
  const [valueRecepcion, setValueRecepcion] = React.useState(new Date(moment.tz("America/Mexico_City").format('L')));
  const [unidaMedid, setUnidadMedid] = useState();
  const [areaUb, setAreaUb] = useState('');
  const [tabValue, setTabValue] = React.useState(0);
  const [tabEfect, setTabEfect] = React.useState(0);
  // const { classes } = this.props;

  const theme = useTheme();


  const handleFechas = (newValue) => {
    setValue(newValue);
  };
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    setTabEfect(newValue)
  };
  const [time, setTime] = React.useState(new Date(moment().format('LT')));
  const handleTimeRecepcion = (newVal) => {
    setTime(moment(newVal).format('HH:mm:ss'));
  }
  const [personName, setPersonName] = React.useState([]);


  const [currency, setCurrency] = React.useState('');
  const [mate, setMate] = useState('');


  const handleMateTipo = (event) => {
    setCurrency(event.target.value);
  };

  const { id, rol } = useSelector(state => state.auth)
  const [formValues, setFormValues] = useState({
    tipoM: '',
    otroM: '',
    codigoM: '',
    nombreM: '',
    cantidadM: '',
    unidadM: '',
    otroUnidadM: '',
    descripcionM: '',
    obervacionesM: '',
    precioCosto: '',
    precioVenta: '',
    precioMayoreo: '',
    precioMinimo: '',
    horaIngreso: moment().format('LT'),
    fechaIngreso: valueRecepcion,
    user_idm: id,
    tipo: 'material',
    precioAdquisicion: '',
    numeroRequisicion: '',
    numeroFactura: '',
    numeroSisat: '',
    nombreVendedor: '',
    role: rol,
    areaUbicacion: ''
  });
  const [formTemporal, setFormTemporal] = useState({
    tipo: '',
    otro: '',
    codigo: '',
    nombre: '',
    cantidad: '',
    unidad: '',
    otroUnidad: '',
    descripcion: '',
    obervaciones: '',
    precioCosto: '',
    precioVenta: '',
    precioMayoreo: '',
    precioMinimo: '',
    horaIngreso: moment().format('LT'),
    fechaIngreso: valueRecepcion,
    tipoHoM: 'material',
    temporal_id: id,
    estado: 'Pendiente',
    adquisicion: '',
    requisicion: '',
    factura: '',
    sisat: '',
    vendedor: '',
    role: rol,
    areaUbicacion: ''
  })


  const { tipo, codigo, nombre, cantidad, unidad, descripcion, obervaciones, adquisicion,
    requisicion, factura, sisat, vendedor, otro, otroUnidad } = formTemporal;

  const { tipoM, codigoM, nombreM, cantidadM, unidadM, descripcionM, obervacionesM,
    precioCosto, precioVenta, precioMayoreo, precioMinimo, horaIngreso, fechaIngreso, precioAdquisicion, numeroRequisicion, numeroFactura,
    numeroSisat, nombreVendedor, otroM, otroUnidadM } = formValues;

  const camposVacios = () => {
    setFormValues({
      tipoM: '',
      otroM: '',
      codigoM: '',
      nombreM: '',
      cantidadM: '',
      unidadM: '',
      otroUnidadM: '',
      descripcionM: '',
      obervacionesM: '',
      precioCosto: '',
      precioVenta: '',
      precioMayoreo: '',
      precioMinimo: '',
      horaIngreso: moment().format('LT'),
      fechaIngreso: valueRecepcion,
      user_idm: id,
      tipo: 'material',
      precioAdquisicion: '',
      numeroRequisicion: '',
      numeroFactura: '',
      numeroSisat: '',
      nombreVendedor: '',
      role: rol,
      // areaUb:''
    });
    setFormTemporal({
      tipo: '',
      otro: '',
      codigo: '',
      nombre: '',
      cantidad: '',
      unidad: '',
      otroUnidad: '',
      descripcion: '',
      obervaciones: '',
      precioCosto: '',
      precioVenta: '',
      precioMayoreo: '',
      precioMinimo: '',
      horaIngreso: moment().format('LT'),
      fechaIngreso: valueRecepcion,
      tipoHoM: 'material',
      temporal_id: id,
      estado: 'Pendiente',
      adquisicion: '',
      requisicion: '',
      factura: '',
      sisat: '',
      vendedor: '',
      role: rol,
      // areaUb:''

    })
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMate(value)
    setFormValues({ ...formValues, tipoM: value })
    setFormTemporal({ ...formTemporal, tipo: value })
    // console.log(value)
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleUnidadMedida = (event) => {
    const {
      target: { value },
    } = event;
    setUnidadMedid(value);
    setFormValues({ ...formValues, unidadM: value })
    setFormTemporal({ ...formTemporal, unidad: value })
  }
  const handleAreaUbicacion = (event) => {
    const {
      target: { value },
    } = event;
    setAreaUb(value);
    setFormValues({ ...formValues, areaUbicacion: value })
    setFormTemporal({ ...formTemporal, areaUbicacion: value })
    // setUnidadMedid(value);
    // setFormValues({ ...formValues, unidadM: value })
    // setFormTemporal({ ...formTemporal, unidad: value })
  }

  const cam = (value) => {
    setFormValues({ fechaIngreso: value })
  }
  const handleDateRecepcion = (newValue) => {
    const { fechaIngreso } = formValues;
    setValueRecepcion(newValue);
    setFormValues({ ...formValues, fechaIngreso: newValue })
  }

  const [textoError, setTextoError] = React.useState('');
  const [errorCampo, setErrorCampo] = React.useState(false);

  const handleInputChange = ({ target }, value) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
    setFormTemporal({
      ...formTemporal,
      [target.name]: target.value
    })
    // if (otroMaterial.length >= 5) {
    //   setErrorCampo(true);
    //   setTextoError('No debe exceder de 10')
    // } else {
    //   setErrorCampo(false);
    //   setTextoError('');
    // }

  }
  const handleChangeIndex = (index) => {
    setTabEfect(index);
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (rol == 'servicio social') { dispatch(temporalStartAddNew(formTemporal)); }
    if (rol == 'Administrador') { dispatch(materialStartAddNew(formValues)); }
    camposVacios()
    setUnidadMedid('')
    setAreaUb('')
    setMate('')
    e.target.reset();

  }
  useEffect(() => {
  }, [])
  const { root, indicator, label } = styles

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
          }} elevation={10}>
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
              }}
            >
              Alta de Material
            </Typography>
          </Paper>
        </Grid>

        <Grid container  >
          <Box  sx={{ width:'80%', borderColor: '#002F6C', marginLeft: 'auto', marginRight: 'auto' }}>
            <Box sx={{ borderBottom: 4, borderColor: 'divider' }}>
              <AppBar position="static">
                <StyledTabs sx={{ backgroundColor: '#002F6C' }}
                  value={tabValue}
                  onChange={handleChangeTab}
                  aria-label="styled tabs example">
                  {/* <Tabs value={tabValue} onChange={handleChangeTab}
                textColor="inherit"
                variant="fullWidth" aria-label="full width tabs example"> */}
                  <StyledTab label="Datos de Material"  {...a11yProps(0)} />
                  <StyledTab label="Datos de Adquisicion" {...a11yProps(1)} />
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
                      <TextField id="outlined-select-currency" select label="Area de Ubicación" value={areaUb} onChange={handleAreaUbicacion} name='areaUbicacion'>
                        {areaUbicacion.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} >
                      {(rol == 'servicio social') ?
                        <TextField id="outlined-basic" label="Nombre de material" variant="outlined" name='nombre' value={nombre} onChange={handleInputChange} />
                        :
                        <TextField id="outlined-basic" label="Nombre de material" variant="outlined" name='nombreM' value={nombreM} onChange={handleInputChange} />
                      }
                    </Grid>   
                    <Grid  item xs={12} sm={6} md={6}>
                      <TextField id="outlined-select-currency" select label="Tipo de Material" value={mate} onChange={handleChange} name='sexo'>
                        {tipoMat.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>                                    
                    <Grid item xs={12} sm={6} md={6} >
                      {(rol == 'servicio social') ?
                        <TextField id="outlined-basic" label="Otro tipo de Material" variant="outlined" name='otro' value={otro} onChange={handleInputChange} />
                        :
                        <TextField id="outlined-basic" label="Otro tipo de Material" variant="outlined" name='otroM' value={otroM} onChange={handleInputChange} />
                      }
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      {(rol == 'servicio social') ?
                        <TextField id="outlined-basic" label="Código" variant="outlined" name='codigo' value={codigo} onChange={handleInputChange} />
                        :
                        <TextField id="outlined-basic" label="Código" variant="outlined" name='codigoM' value={codigoM} onChange={handleInputChange} />
                      }
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={6} >
                      {(rol == 'servicio social') ?
                        <TextField id="outlined-basic" label="Cantidad" type="number" variant="outlined" name='cantidad' value={cantidad} onChange={handleInputChange} />
                        :
                        <TextField id="outlined-basic" label="Cantidad" type="number" variant="outlined" name='cantidadM' value={cantidadM} onChange={handleInputChange} />
                      }
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} >
                      {(rol == 'servicio social') ?
                        <TextField id="outlined-select-currency" select label="Unidad de Medida" value={unidad} onChange={handleUnidadMedida} name='unidad'>
                          {unidadMedida.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>

                        :
                        <TextField id="outlined-select-currency" select label="Unidad de Medida" value={unidadM} onChange={handleUnidadMedida} name='unidadM'>
                          {unidadMedida.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>

                      }
                    </Grid>
                    <Grid  item xs={12} sm={6} md={6}>
                      {(rol == 'servicio social') ?
                        <TextField id="outlined-basic" label="Otra unidad de Medida" variant="outlined" name='otroUnidad' value={otroUnidad} onChange={handleInputChange} />
                        :
                        <TextField id="outlined-basic" label="Otra unidad de Medida" variant="outlined" name='otroUnidadM' value={otroUnidadM} onChange={handleInputChange} />
                      }
                    </Grid>
                    <Grid xs={12} sm={12} md={6} item >
                      {(rol == 'servicio social') ?
                        <TextField
                          id="standard-multiline-static"
                          label="Descripcion"
                          multiline
                          rows={4}
                          placeholder="Descripcion"
                          name='descripcion'
                          value={descripcion}
                          // defaultValue="Default Value"
                          variant="outlined" onChange={handleInputChange} />
                        :
                        <TextField
                          id="standard-multiline-static"
                          label="Descripcion"
                          multiline
                          rows={4}
                          placeholder="Descripcion"
                          name='descripcionM'
                          value={descripcionM}
                          // defaultValue="Default Value"
                          variant="outlined" onChange={handleInputChange} />
                      }
                    </Grid>
                    <Grid xs={12} sm={12} md={6} item >
                      {(rol == 'servicio social') ?
                        <TextField
                          id="standard-multiline-static"
                          label="Observaciones"
                          multiline
                          rows={4}
                          placeholder="Observaciones"
                          name='obervaciones'
                          value={obervaciones}
                          // defaultValue="Default Value"
                          variant="outlined" onChange={handleInputChange} /> :
                        <TextField
                          id="standard-multiline-static"
                          label="Observaciones"
                          multiline
                          rows={4}
                          placeholder="Observaciones"
                          name='obervacionesM'
                          value={obervacionesM}
                          // defaultValue="Default Value"
                          variant="outlined" onChange={handleInputChange} />
                      }
                    </Grid>
                  </Grid>
                  {/* Item One */}
                </TabPanel>

                <TabPanel value={tabValue} index={1} dir={theme.direction}>
                  <Grid container spacing={2} sx={{marginBottom:'2vh'}}>

                    <Grid xs={12} sm={6} md={6} item>
                      <TextField id="outlined-basic" label="Hora de Ingreso" variant="outlined" value={moment().format('LT')} disabled />
                    </Grid>
                    <Grid xs={12} sm={6} md={6} item>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <DesktopDatePicker
                            label="Fecha de Ingreso:"
                            inputFormat="dd/MM/yyyy"
                            name='fechaIngreso'
                            value={fechaIngreso}
                            disabled
                            onChange={handleDateRecepcion}
                            renderInput={(paramsR) => <TextField {...paramsR} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                    <Grid xs={12} sm={6} md={6} item>
                      {(rol == 'servicio social') ?
                        <TextField id="outlined-basic" label="Precion de Adquisición" variant="outlined" name='adquisicion' value={adquisicion} onChange={handleInputChange} />
                        :
                        <TextField id="outlined-basic" label="Precion de Adquisición" variant="outlined" name='precioAdquisicion' value={precioAdquisicion} onChange={handleInputChange} />
                      }
                    </Grid>
                    <Grid xs={12} sm={6} md={6} item>
                      {(rol == 'servicio social') ?
                        <TextField id="outlined-basic" label="Numero de Requisición" variant="outlined" name='requisicion' value={requisicion} onChange={handleInputChange} />
                        :
                        <TextField id="outlined-basic" label="Numero de Requisición" variant="outlined" name='numeroRequisicion' value={numeroRequisicion} onChange={handleInputChange} />
                      }
                    </Grid>
                    <Grid xs={12} sm={6} md={6} item>
                      {(rol == 'servicio social') ?
                        <TextField id="outlined-basic" label="Numero de Factura" variant="outlined" name='factura' value={factura} onChange={handleInputChange} />
                        :
                        <TextField id="outlined-basic" label="Numero de Factura" variant="outlined" name='numeroFactura' value={numeroFactura} onChange={handleInputChange} />
                      }
                    </Grid>
                    <Grid xs={12} sm={6} md={6} item>
                      {(rol == 'servicio social') ?
                        <TextField id="outlined-basic" label="Numero de Sisat" variant="outlined" name='sisat' value={sisat} onChange={handleInputChange} />
                        :
                        <TextField id="outlined-basic" label="Numero de Sisat" variant="outlined" name='numeroSisat' value={numeroSisat} onChange={handleInputChange} />
                      }
                    </Grid>
                    <Grid xs={12} sm={6} md={6} item>
                      {(rol == 'servicio social') ?
                        <TextField id="outlined-basic" label="Nombre del Vendedor" variant="outlined" name='vendedor' value={vendedor} onChange={handleInputChange} />
                        :
                        <TextField id="outlined-basic" label="Nombre del Vendedor" variant="outlined" name='nombreVendedor' value={nombreVendedor} onChange={handleInputChange} />
                      }
                    </Grid>
                  </Grid>
                  <Divider />
                  <Button variant="outlined" className='btnAgregarMaterial' type='submit'
                    sx={{marginTop:'2vh',
                      backgroundColor: '', color: '#002F6C', borderRadius: '3vh',
                      fontFamily: 'Monserrat, sans-serif',
                      fontStyle: 'regular'
                    }} >Agregar Material</Button>
                  {/* Item Two */}
                </TabPanel>
              </SwipeableViews>
              {/* <TabPanel value={tabValue} index={2}>
            Item Three
          </TabPanel> */}
            </form>
          </Box>

        </Grid>


      </Paper>

      {/* <Paper className='paperPrincipal' elevation={20} >
        
        <form className={'formulario'} onSubmit={handleSubmitForm} >

          <Paper className='paperPrimario' elevation={10} sx={{ borderRadius: '15px' }} >
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 1 }} columns={12} gridRow={2}>

            </Grid>
          </Paper>

          <Paper className='paperSecundario' elevation={20} sx={{ borderRadius: '15px' }} >

          </Paper>
          <Paper className='paperBotones' elevation={20} sx={{ borderRadius: '15px' }}>
            
          </Paper>
        </form>
      </Paper > */}
    </>
  );
}

export default AgregarMaterial;