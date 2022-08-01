import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import MaterialTable from '@material-table/core';
import { Paper, Grid, Stack, TextField } from '@mui/material';
import './Tablas.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { material, materialStartLoaded, usuariosMaterial, materialStartUpdated, materialStartDeleted, temporalStartUpdated } from '../../actions/material';
import { herramientaStartAddNew } from '../../actions/herramienta';

import { fetchConToken } from '../../helpers/fetch';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { materialStartAddNew, materialAddNew } from '../../actions/material';
import moment from 'moment'; import 'moment-timezone';
import MenuItem from '@mui/material/MenuItem';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  // pb: 3,
  borderRadius: '20px',
  overflow: 'auto',
  height: '95%',
  // display: 'block'
};
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
export const AlmacenNotificaciones = () => {

  const dispatch = useDispatch();
  const [valueRecepcion, setValueRecepcion] = React.useState(new Date(moment.tz("America/Mexico_City").format('L')));
  const [valueRecepcionH, setValueRecepcionH] = React.useState(new Date(moment.tz("America/Mexico_City").format('L')));

  const { id, rol } = useSelector(state => state.auth)
  const [areaUb, setAreaUb] = useState('');


  const [cardMaterial, setCardMaterial] = useState({
    // id:'',
    idT: '',
    tipoM: '',
    codigoM: '',
    nombreM: '',
    cantidadM: '',
    unidadM: '',
    descripcionM: '',
    obervacionesM: '',
    precioCosto: 'NA',
    precioVenta: 'NA',
    precioMayoreo: 'NA',
    precioMinimo: 'NA',
    horaIngreso: '',
    fechaIngreso: '',
    user_idm: '',
    tipo: '',
    role: rol,
    tipoHoM: '',
    estado: '',
    precioAdquisicion: '',
    numeroRequisicion: '',
    numeroFactura: '',
    numeroSisat: '',
    nombreVendedor: '',
    areaUbicacion: '',

    // createdAt: '',
    // updatedAt: '',
  });

  const [cardHerramienta, setCardHerramienta] = useState({
    // id:'',
    idT: '',
    tipoH: '',
    nombreH: '',
    codigo: '',
    descripcion: '',
    cantidad: '',
    observaciones: '',
    horaIngreso: '',
    fechaIngreso: '',
    precioCosto: '',
    precioVenta: '',
    precioMayoreo: '',
    precioMinimo: '',
    user_id: '',
    tipo: '',
    role: rol,
    tipoHoM: '',
    estado: ''

    // createdAt: '',
    // updatedAt: '',
  });
  const [cardSeleccionado, setCardSeleccionado] = useState({});
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [modalHerramienta, setModalHerramienta] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [mate, setMate] = useState('');
  const [unidaMedid, setUnidadMedid] = useState();

  const handleAreaUbicacion = (event) => {
    const {
      target: { value },
    } = event;
    setAreaUb(value);
    setCardMaterial({ ...cardMaterial, tipoM: value });
  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMate(value)
    setCardMaterial({ ...cardMaterial, areaUbicacion: value });

  };
  const handleUnidadMedida = (event) => {
    const {
      target: { value },
    } = event;
    setUnidadMedid(value);
    setCardMaterial({ ...cardMaterial, unidadM: value });

  }
  const handleDateRecepcion = (newValue) => {
    // const { fechaIngreso} = formValues;
    setValueRecepcion(newValue);
    // setFormValues({...formValues,fechaIngreso: newValue})      
  }

  const handleDateRecepcionHerr = (newValue) => {
    // const { fechaIngreso} = formValues;
    setValueRecepcionH(newValue);
    // setFormValues({...formValues,fechaIngreso: newValue})      
  }

  const seleccion = (temp) => { //MOSTRAR MODAL Y CARGAR DATOS
    // setCardSeleccionado(mat)
    const {
      id,
      // idT,
      tipoHoM,
      tipo,
      codigo,
      nombre,
      cantidad,
      unidad,
      descripcion,
      obervaciones,
      precioCosto,
      precioVenta,
      precioMayoreo,
      precioMinimo,
      horaIngreso,
      fechaIngreso,
      temporal_id,
      estado,
      adquisicion,
      requisicion,
      factura,
      sisat,
      vendedor,
      areaUbicacion
    } = temp;

    if (tipoHoM == 'material') {
      setCardMaterial({
        // id:id,
        idT: id,
        tipoM: tipo,
        codigoM: codigo,
        nombreM: nombre,
        cantidadM: cantidad,
        unidadM: unidad,
        descripcionM: descripcion,
        obervacionesM: obervaciones,
        precioCosto: precioCosto,
        precioVenta: precioVenta,
        precioMayoreo: precioMayoreo,
        precioMinimo: precioMinimo,
        horaIngreso: moment().format('LT'),
        fechaIngreso: valueRecepcion,
        user_idm: temporal_id,
        tipo: tipo,
        tipoHoM: tipoHoM,
        role: rol,
        estado: estado,
        precioAdquisicion: adquisicion,
        numeroRequisicion: requisicion,
        numeroFactura: factura,
        numeroSisat: sisat,
        nombreVendedor: vendedor,
        areaUbicacion: areaUbicacion

      })
      console.log('HOLA MATERIAL')
      abrirCerrarModalVer()
      console.log(cardMaterial)
    }
    if (tipoHoM == 'herramienta') {
      setCardHerramienta({
        // idT,id,
        idT: id,
        tipoH: tipo,
        nombreH: codigo,
        codigo: codigo,
        descripcion: descripcion,
        cantidad: cantidad,
        observaciones: obervaciones,
        horaIngreso: horaIngreso,
        fechaIngreso: fechaIngreso,
        precioCosto: precioCosto,
        precioVenta: precioVenta,
        precioMayoreo: precioMayoreo,
        precioMinimo: precioMinimo,
        user_id: temporal_id,
        tipo: tipo,
        tipoHoM: tipoHoM,
        role: rol,
        estado: estado

      })

      console.log('HOLA HERRAMIENTA');
      abrirCerrarModalVerHerramienta();
      console.log(cardHerramienta);
    }
  }

  const sendData = (data) => {
    const { tipoHoM, role } = data;
    if (tipoHoM == 'material') {
      abrirCerrarModalVer();
      // if (rol == 'servicio social') {
      dispatch(materialStartAddNew(cardMaterial));
      dispatch(temporalStartUpdated(cardMaterial));
      console.log('SS', role)
      console.log(cardMaterial)
      // }
    }
    if (tipoHoM == 'herramienta') {
      abrirCerrarModalVerHerramienta();
      // if (rol == 'Administrador') {
      dispatch(herramientaStartAddNew(cardHerramienta));
      dispatch(temporalStartUpdated(cardHerramienta));

      // dispatch(materialStartAddNew(cardHerramienta));
      console.log('ADMIN', role)

      console.log(cardHerramienta)
      // }
    }

  }

  const obtenerTemporal = async () => {
    const resp = await fetchConToken('temporal');
    const { temporal } = await resp.json();

    setCardData(temporal.map(b => ({
      id: b.id,
      idT: b.id,
      tipo: b.tipo,
      codigo: b.codigo,
      nombre: b.nombre,
      cantidad: b.cantidad,
      unidad: b.unidad,
      descripcion: b.descripcion,
      obervaciones: b.obervaciones,
      precioCosto: b.precioCosto,
      precioVenta: b.precioVenta,
      precioMayoreo: b.precioMayoreo,
      precioMinimo: b.precioMinimo,
      horaIngreso: b.horaIngreso,
      fechaIngreso: b.fechaIngreso,
      tipoHoM: b.tipoHoM,
      estado: b.estado,
      temporal_id: b.temporal_id,
      user_name: b.usuario.nombre,
      user_apellidoP: b.usuario.apellidoP,
      user_apellidoM: b.usuario.apellidoM,
      adquisicion: b.adquisicion,
      requisicion: b.requisicion,
      factura: b.factura,
      sisat: b.sisat,
      vendedor: b.vendedor,
      areaUbicacion: b.areaUbicacion
    })))


    // console.log(temporal)
  }

  const abrirCerrarModalVerHerramienta = () => {
    setModalHerramienta(!modalHerramienta);
  }

  const abrirCerrarModalVer = () => {
    setModalVisualizar(!modalVisualizar);
  }
  const handleInputChange = ({ target }) => {
    setCardMaterial({
      ...cardMaterial,
      [target.name]: target.value
    });

    setCardHerramienta({
      ...cardHerramienta,
      [target.name]: target.value
    })
  }
  useEffect(() => {
    obtenerTemporal();
    // console.log(cardData)
    // obtenerMateriales()

  }, [])


  const bodyMaterial = (
    <>
      <Grid
        sx={{ ...style, marginTop: '0.5vh', marginBottom: '1vh' }}
        container
        direction='row'
        justifyContent='space-around'
        alignItems='flex-start'
      >
        <Grid container
          direction='row'
          justifyContent='space-around'
          alignItems='center'>
          <Paper
            sx={{
              width: '100%', borderRadius: '20px', margin: '2vh',
              justifyContent: 'space-around'
            }} elevation={10} >
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
              Edicion de Material
            </Typography>
          </Paper>
        </Grid>
        <Paper className='cntainerPrueba'
          sx={{ width: '100%', margin: '1vh', borderRadius: '20px' }}
          elevation={10}>
          <Grid container item sx={{ marginBottom: '4vh', marginTop: '2vh' }} justifyContent="center">
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField id="outlined-select-currency"
                select label="Tipo de Material"
                value={cardMaterial && cardMaterial.tipoM}
                onChange={handleChange}
                name='tipoM'>
                {tipoMat.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {/* <TextField label='Tipo de Material' name='tipoM' onChange={handleInputChange} value={cardMaterial && cardMaterial.tipoM} /> */}
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Codigo de Material' name='codigoM' onChange={handleInputChange} value={cardMaterial && cardMaterial.codigoM} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Nombre Material' name='nombreM' onChange={handleInputChange} value={cardMaterial && cardMaterial.nombreM} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Cantidad de Material' name='cantidadM' onChange={handleInputChange} value={cardMaterial && cardMaterial.cantidadM} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }} >
              <TextField id="outlined-select-currency" 
              select label="Unidad de Medida" 
              value={(cardMaterial && cardMaterial.unidadM == null) ? '' : cardMaterial && cardMaterial.unidadM}
              onChange={handleUnidadMedida} name='unidadM'>
                {unidadMedida.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {/* <TextField label='Unidad de Medida'
                placeholder="Unidad de Medida"
                name='unidadM' value={(cardMaterial && cardMaterial.unidadM == null) ? '' : cardMaterial && cardMaterial.unidadM} onChange={handleInputChange} /> */}
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="Fecha de Ingreso:"
                    inputFormat="dd/MM/yyyy"
                    name='fechaIngreso'
                    value={cardMaterial && cardMaterial.fechaIngreso}
                    disabled
                    onChange={handleDateRecepcion}
                    renderInput={(paramsR) => <TextField {...paramsR} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField
                id="standard-multiline-static"
                label="Descripcion"
                multiline
                rows={4}
                onChange={handleInputChange}
                placeholder="Descripcion"
                name='descripcionM'
                value={cardMaterial && cardMaterial.descripcionM}
                variant="outlined"
              />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField
                id="standard-multiline-static"
                label="Observaciones"
                multiline
                rows={4}
                value={cardMaterial && cardMaterial.obervacionesM}
                onChange={handleInputChange}
                placeholder="Observaciones"
                name='obervacionesM'
                variant="outlined"
              />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Precio venta" variant="outlined"
                type="number" name='precioVenta' onChange={handleInputChange}
                value={(cardMaterial && cardMaterial.precioVenta == '') ? '0' : cardMaterial && cardMaterial.precioVenta} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Precio mayoreo" variant="outlined"
                type="number" name='precioMayoreo' onChange={handleInputChange}
                value={(cardMaterial && cardMaterial.precioMayoreo == null) ? '0' : cardMaterial && cardMaterial.precioMayoreo} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Precio minimo" variant="outlined"
                type="number" name='precioMinimo' onChange={handleInputChange}
                value={(cardMaterial && cardMaterial.precioMinimo == null) ? '0' : cardMaterial && cardMaterial.precioMinimo} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Precio costo" variant="outlined"
                type="number" name='precioCosto' onChange={handleInputChange}
                value={(cardMaterial && cardMaterial.precioCosto == null) ? '0' : cardMaterial && cardMaterial.precioCosto} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Precio de Adquisición" variant="outlined"
                type="number" name='precioAdquisicion' onChange={handleInputChange}
                value={(cardMaterial && cardMaterial.precioAdquisicion == null) ? '0' : cardMaterial && cardMaterial.precioAdquisicion} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Numero de Reqeuisición" variant="outlined"
                name='numeroRequisicion' onChange={handleInputChange}
                value={(cardMaterial && cardMaterial.numeroRequisicion == null) ? '0' : cardMaterial && cardMaterial.numeroRequisicion} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Numero de Factura" variant="outlined"
                name='numeroFactura' onChange={handleInputChange}
                value={(cardMaterial && cardMaterial.numeroFactura == null) ? '0' : cardMaterial && cardMaterial.numeroFactura} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Numero de Sisat" variant="outlined"
                name='numeroSisat' onChange={handleInputChange}
                value={(cardMaterial && cardMaterial.numeroSisat == null) ? '0' : cardMaterial && cardMaterial.numeroSisat} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Nombre del vendedor" variant="outlined"
                name='nombreVendedor' onChange={handleInputChange}
                value={(cardMaterial && cardMaterial.nombreVendedor == null) ? '0' : cardMaterial && cardMaterial.nombreVendedor} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-select-currency" select label="Area de Ubicación"
                value={(cardMaterial && cardMaterial.areaUbicacion == null) ? '0' : cardMaterial && cardMaterial.areaUbicacion}
                onChange={handleAreaUbicacion}
                name='areaUbicacion'>
                {areaUbicacion.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {/* <TextField id="outlined-basic" label="Area de Ubicación" variant="outlined"
                 name='areaUbicacion' onChange={handleInputChange}
                value={(cardMaterial && cardMaterial.areaUbicacion == null) ? '0' : cardMaterial && cardMaterial.areaUbicacion} /> */}
            </Grid>


            <Button
              variant="outlined"
              sx={{
                width: '50%', margin: '2vh', backgroundColor: '', color: '#002F6C', borderRadius: '5vh',
                fontFamily: 'Monserrat, sans-serif', fontStyle: 'regular'
              }}
              onClick={() => sendData(cardMaterial)} >Aceptar</Button>
          </Grid>
        </Paper>
      </Grid>
    </>
  );

  const bodyHerramienta = (
    <>
      <Grid
        sx={{ ...style, marginTop: '0.5vh', marginBottom: '1vh' }}
        container
        direction='row'
        justifyContent='space-around'
        alignItems='flex-start'
      >
        <Grid container
          direction='row'
          justifyContent='space-around'
          alignItems='center'>
          <Paper
            sx={{
              width: '100%', borderRadius: '20px', margin: '2vh',
              justifyContent: 'space-around'
            }} elevation={10} >
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
              Confirmación de Herramienta
            </Typography>
          </Paper>
        </Grid>
        <Paper className='cntainerPrueba'
          sx={{ width: '100%', margin: '1vh', borderRadius: '20px' }}
          elevation={10}>
          <Grid container item sx={{ marginBottom: '4vh', marginTop: '2vh' }} justifyContent="center">
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Tipo de Material' name='tipoH' value={cardHerramienta && cardHerramienta.tipoH} onChange={handleInputChange} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Codigo de Material' name='codigo' value={cardHerramienta && cardHerramienta.codigo} onChange={handleInputChange} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Nombre Material' name='nombreH' value={cardHerramienta && cardHerramienta.nombreH} onChange={handleInputChange} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Cantidad de Material' name='cantidad' value={cardHerramienta && cardHerramienta.cantidad} onChange={handleInputChange} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Precio venta" variant="outlined"
                type="number" name='precioVenta'
                value={(cardHerramienta && cardHerramienta.precioVenta == null) ? '0' : cardHerramienta && cardHerramienta.precioVenta} onChange={handleInputChange} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Precio mayoreo" variant="outlined"
                type="number" name='precioMayoreo'
                value={(cardHerramienta && cardHerramienta.precioMayoreo == null) ? '0' : cardHerramienta && cardHerramienta.precioMayoreo} onChange={handleInputChange} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Precio minimo" variant="outlined"
                type="number" name='precioMinimo'
                value={(cardHerramienta && cardHerramienta.precioMinimo == null) ? '0' : cardHerramienta && cardHerramienta.precioMinimo} onChange={handleInputChange} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Precio costo" variant="outlined"
                type="number" name='precioCosto'
                value={(cardHerramienta && cardHerramienta.precioCosto == null) ? '0' : cardHerramienta && cardHerramienta.precioCosto} onChange={handleInputChange} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '96%' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="Fecha de Ingreso:"
                    inputFormat="dd/MM/yyyy"
                    name='fechaIngreso'
                    value={cardHerramienta && cardHerramienta.fechaIngreso}
                    disabled
                    onChange={handleDateRecepcionHerr}
                    renderInput={(paramsR) => <TextField {...paramsR} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '96%' }}>
              <TextField
                id="standard-multiline-static"
                label="Descripcion"
                multiline
                rows={4}
                onChange={handleInputChange}
                placeholder="Descripcion"
                name='descripcion'
                value={cardHerramienta && cardHerramienta.descripcion}
                variant="outlined"
              />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '96%' }}>
              <TextField
                id="standard-multiline-static"
                label="Observaciones"
                multiline
                rows={4}
                value={cardHerramienta && cardHerramienta.observaciones}
                onChange={handleInputChange}
                placeholder="Observaciones"
                name='observaciones'
                variant="outlined"
              />
            </Grid>

            <Button
              variant="outlined"
              sx={{
                width: '50%', margin: '2vh', backgroundColor: '', color: '#002F6C', borderRadius: '5vh',
                fontFamily: 'Monserrat, sans-serif', fontStyle: 'regular'
              }}
              onClick={() => sendData(cardHerramienta)} >Aceptar</Button>
          </Grid>
        </Paper>
      </Grid>
    </>
  );

  return (
    <>
      {/* <Paper sx={{ borderRadius: '20px', margin: '2vh' }} elevation={10} className='prueba'> */}
      {cardData.map(temporal => {
        if (temporal.estado == 'Pendiente') {
          return <Card key={temporal.id} variant="outlined" sx={{ display: 'flex', borderRadius: '20px', marginLeft: '4vh', marginRight: '4vh', marginTop: '4vh' }}  >
            <Grid
              container
              direction='row'
              justifyContent="space-between"
              alignItems="center"
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography variant="body2">
                    {temporal.user_name} {temporal.user_apellidoP} {temporal.user_apellidoM} quiere agregar {(temporal.tipoHoM == 'material') ? 'un' : 'una'} {(temporal.tipoHoM == 'material') ? 'material' : 'herramienta'}
                  </Typography>

                </CardContent>
              </Box>
              <CardActions sx={{ marginRight: '5vh' }}>
                <Button variant="outlined" sx={{ margin: '2vh' }} onClick={() => seleccion(temporal)} >Ver</Button>
                <Button variant="outlined" color='error' disabled >Eliminar</Button>
              </CardActions>
              {/* </Grid> */}
            </Grid>
          </Card>
        }
      })

      }

      {/* </Paper> */}

      <Modal
        open={modalVisualizar}
        onClose={abrirCerrarModalVer}>
        {bodyMaterial}
      </Modal>
      <Modal
        open={modalHerramienta}
        onClose={abrirCerrarModalVerHerramienta}>
        {bodyHerramienta}
      </Modal>
    </>

    // <div>AlmacenNotificaciones</div>
  )
}
export default AlmacenNotificaciones;
