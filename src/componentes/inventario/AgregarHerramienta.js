import { Container, Grid, Paper, Stack, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Menu.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Menu.css';
import moment from 'moment'; import 'moment-timezone';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { herramientaStartAddNew } from '../../actions/herramienta';
import { materialAddNew, temporalStartAddNew } from '../../actions/material';

import SwipeableViews from "react-swipeable-views"
import { styled } from "@mui/material/styles";
import Tabs from '@mui/material/Tabs';
import Tab, { tabsClasses } from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
// import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { Divider } from '@material-ui/core';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { es } from 'date-fns/locale'


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

const herramientas = [
    'Electricas',
    'Plomeria'
];

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

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) == -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
}
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

export const AgregarHerramienta = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [fechaAct, setValue] = React.useState(new Date(moment.tz("America/Mexico_City").format('L')));
    const [valueRecepcion, setValueRecepcion] = React.useState(new Date(moment.tz("America/Mexico_City").format('L')));
    const [areaUb, setAreaUb] = useState('');

    const [tabValue, setTabValue] = React.useState(0);
    const [tabEfect, setTabEfect] = React.useState(0);

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
        setTabEfect(newValue)
    };
    const handleFechas = (newValue) => {
        setValue(newValue);
    };

    const handleDateRecepcion = (newValue) => {
        setValueRecepcion(newValue);
    }

    const [time, setTime] = React.useState();

    const handleTimeRecepcion = (newVal) => {
        setTime(newVal);
    }

    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value == 'string' ? value.split(',') : value,
        );
    };

    const [currency, setCurrency] = React.useState('');

    const handleMateTipo = (event) => {
        setCurrency(event.target.value);
    };

    const { id, rol } = useSelector(state => state.auth)


    const [formHerramientas, setFormHerramientas] = useState({
        tipoH: '',
        nombreH: '',
        codigo: '',
        descripcion: '',
        cantidad: '',
        observaciones: '',
        precioCosto: '',
        precioVenta: '',
        precioMayoreo: '',
        precioMinimo: '',
        horaIngreso: moment().format('LT'),
        fechaIngreso: valueRecepcion,
        user_id: id,
        tipo: 'herramienta',
        areaUbicacion: ''
    });
    const [formTemporal, setFormTemporal] = useState({
        tipo: '',
        codigo: '',
        nombre: '',
        cantidad: '',
        unidad: '',
        descripcion: '',
        obervaciones: '',
        precioCosto: '',
        precioVenta: '',
        precioMayoreo: '',
        precioMinimo: '',
        horaIngreso: moment().format('LT'),
        fechaIngreso: valueRecepcion,
        tipoHoM: 'herramienta',
        temporal_id: id,
        estado: 'Pendiente',
        areaUbicacion: ''
    })

    const { tipo, nombre, tipoHoM, obervaciones } = formTemporal;

    const { tipoH, nombreH, codigo, descripcion, cantidad, observaciones, horaIngreso,
        fechaIngreso, precioCosto, precioVenta, precioMayoreo, precioMinimo } = formHerramientas;

    const handleInputChange = ({ target }) => {
        setFormHerramientas({
            ...formHerramientas,
            [target.name]: target.value
        });
        setFormTemporal({
            ...formTemporal,
            [target.name]: target.value
        })
        // setFormTemporal([])
        // setFormHerramientas([])
    }
    const vaciarCampos = () => {
        setFormHerramientas({
            tipoH: '',
            nombreH: '',
            codigo: '',
            descripcion: '',
            cantidad: '',
            observaciones: '',
            precioCosto: '',
            precioVenta: '',
            precioMayoreo: '',
            precioMinimo: '',
            horaIngreso: moment().format('LT'),
            fechaIngreso: valueRecepcion,
            user_id: id,
            tipo: 'herramienta'
        })
        setFormTemporal({
            tipo: '',
            codigo: '',
            nombre: '',
            cantidad: '',
            unidad: '',
            descripcion: '',
            obervaciones: '',
            precioCosto: '',
            precioVenta: '',
            precioMayoreo: '',
            precioMinimo: '',
            horaIngreso: moment().format('LT'),
            fechaIngreso: valueRecepcion,
            tipoHoM: 'herramienta',
            temporal_id: id,
            estado: 'Pendiente'
        })
    }

    const handleAreaUbicacion = (event) => {
        const {
            target: { value },
        } = event;
        setAreaUb(value);
        setFormHerramientas({ ...formHerramientas, areaUbicacion: value });
        setFormTemporal({ ...formTemporal, areaUbicacion: value });
    }
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (rol == 'servicio social') {
            console.log(formTemporal)
            dispatch(temporalStartAddNew(formTemporal));
            vaciarCampos()
            setAreaUb('')
            e.target.reset();
            // setFormTemporal({})
        }
        if (rol == 'Administrador') {
            console.log(formHerramientas)
            dispatch(herramientaStartAddNew(formHerramientas));
            setAreaUb('')
            e.target.reset();
            // setFormHerramientas({})
        }
        vaciarCampos()
        e.target.reset();
        setAreaUb('')
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
    return (
        <>
            <Paper className='bodyPaper' elevation={0}>
                <Grid
                    container
                    direction='row'
                    justifyContent='space-around'
                    alignItems='center'>
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
                            Alta de Herramienta
                        </Typography>
                    </Paper>

                </Grid>
                <Grid container >
                    <Box sx={{ maxWidth: { xs: '100%', sm: '80%' }, borderColor: '#002F6C', marginLeft: 'auto', marginRight: 'auto' }}>
                        <Box sx={{ borderBottom: 4, borderColor: 'divider' }}>
                            <AppBar position="static">
                                <StyledTabs
                                    sx={{ backgroundColor: '#002F6C' }}
                                    value={tabValue}
                                    onChange={handleChangeTab}
                                    variant="scrollable"
                                    // centered
                                    allowScrollButtonsMobile
                                    aria-label="visible arrows tabs example">
                                    <StyledTab label="Datos de Almacen"  {...a11yProps(0)} />
                                    <StyledTab label="Datos de adquisición" {...a11yProps(1)} />
                                </StyledTabs>
                            </AppBar>
                        </Box>
                        <form onSubmit={handleSubmitForm} >
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x-reverse'}
                                index={tabValue}
                                onChangeIndex={handleChangeTab}>

                                <TabPanel value={tabValue} index={0} dir={theme.direction}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField id="outlined-select-currency" select label="Area de Ubicación" value={areaUb} onChange={handleAreaUbicacion} name='areaUbicacion'>
                                                {areaUbicacion.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            {(rol == 'servicio social') ?
                                                <TextField id="outlined-basic" label="Tipo Herramienta" name='tipo' variant="outlined" value={tipo} onChange={handleInputChange} />
                                                :
                                                <TextField id="outlined-basic" label="Tipo Herramienta" name='tipoH' variant="outlined" value={tipoH} onChange={handleInputChange} />
                                            }
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            {(rol == 'servicio social') ?
                                                <TextField id="outlined-basic" label="Nombre de Herramienta" name='nombre' variant="outlined" value={nombre} onChange={handleInputChange} />
                                                :
                                                <TextField id="outlined-basic" label="Nombre de Herramienta" name='nombreH' variant="outlined" value={nombreH} onChange={handleInputChange} />
                                            }
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField id="outlined-basic" label="Código" variant="outlined" name='codigo' value={codigo} onChange={handleInputChange} />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField id="outlined-basic" label="Cantidad" type="number" variant="outlined" name='cantidad' value={cantidad} onChange={handleInputChange} />

                                            {/* <TextField id="outlined-basic" label="Cantidad" variant="outlined" /> */}
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <TextField
                                                id="standard-multiline-static"
                                                label="Descripcion"
                                                multiline
                                                rows={2}
                                                placeholder="Descripcion"
                                                variant="outlined"
                                                name='descripcion'
                                                value={descripcion}
                                                // defaultValue="Default Value"
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid xs={12} sm={12} md={12} item >
                                            {(rol == 'servicio social') ?
                                                <TextField id="standard-multiline-static" label="Observaciones" multiline rows={4} placeholder="obervaciones" variant="outlined"
                                                    name='obervaciones' value={obervaciones} onChange={handleInputChange}
                                                // defaultValue="Default Value"
                                                />
                                                :
                                                <TextField
                                                    id="standard-multiline-static"
                                                    label="Observaciones"
                                                    multiline
                                                    rows={2}
                                                    placeholder="Observaciones"
                                                    variant="outlined"
                                                    name='observaciones'
                                                    value={observaciones}
                                                    onChange={handleInputChange}
                                                // defaultValue="Default Value"
                                                />
                                            }

                                        </Grid>

                                    </Grid>

                                </TabPanel>
                                <TabPanel value={tabValue} index={1} dir={theme.direction}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField id="outlined-basic" label="Hora de Ingreso" variant="outlined" value={moment().format('LT')} disabled />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <Stack spacing={3}>
                                                    <DesktopDatePicker
                                                        label="Fecha de Ingreso:"
                                                        inputFormat="dd/MM/yyyy"
                                                        name='fechaIngreso'
                                                        value={fechaIngreso}
                                                        onChange={handleDateRecepcion}
                                                        disabled
                                                        renderInput={(paramsR) => <TextField {...paramsR} disabled />}
                                                    />
                                                </Stack>
                                            </LocalizationProvider>
                                            {/* <TextField id="outlined-basic" label="Fecha de Ingreso" variant="outlined" /> */}
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField id="outlined-basic" label="Precio costo" variant="outlined" type="number" name='precioCosto' value={precioCosto} onChange={handleInputChange} />

                                            {/* <TextField id="outlined-basic" label="Precio costo" variant="outlined" /> */}
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField id="outlined-basic" label="Precio venta" variant="outlined" type="number" name='precioVenta' value={precioVenta} onChange={handleInputChange} />
                                            {/* <TextField id="outlined-basic" label="Precio venta" variant="outlined" /> */}
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField id="outlined-basic" label="Precio mayoreo" variant="outlined" type="number" name='precioMayoreo' value={precioMayoreo} onChange={handleInputChange} />

                                            {/* <TextField id="outlined-basic" label="Precio mayoreo" variant="outlined" /> */}
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField id="outlined-basic" label="Precio minimo" variant="outlined" type="number" name='precioMinimo' value={precioMinimo} onChange={handleInputChange} />

                                            {/* <TextField id="outlined-basic" label="Precio minimo" variant="outlined" /> */}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Button variant="outlined" className='btnAgregarMaterial' type='submit'
                                            sx={{
                                                marginTop: '2vh',marginBottom:'2vh',
                                                backgroundColor: '', color: '#002F6C', borderRadius: '5vh',
                                                fontFamily: 'Monserrat, sans-serif',
                                                fontStyle: 'regular'
                                            }}>Agregar Herramienta</Button>
                                    </Grid>
                                </TabPanel>
                            </SwipeableViews>

                        </form>
                    </Box>
                </Grid>
            </Paper>
        </>
    )

}


export default AgregarHerramienta;