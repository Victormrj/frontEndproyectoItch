import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment'; import 'moment-timezone';
import { fetchConToken } from '../../helpers/fetch';
import { es } from 'date-fns/locale'
import { isSameDay } from 'date-fns';

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

export const EquiposNotificaciones = () => {
  const [rowData, setRowdata] = useState([]);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [currency, setCurrency] = React.useState('');

  const { id, rol } = useSelector(state => state.auth);
  const [value, setValue] = React.useState(new Date(moment.tz("America/Mexico_City").format('L')));
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
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

  const [equipoSeleccionado, setEquipoSeleccionado] = useState({
    nombreEquio: '',
    numInventario: '',
    modelo: '',
    numSerie: '',
    fechaIngreso: '',
    cantidadEquipos: '',
    numPeriodo: '',
    numMes: '',
    inicioMantenimiento: '',
    proximoMantenimiento: '',
    estadoEquipo: '',
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
    capacidad: '',
    observaciones: '',
    rol: rol,
    user_idE: id,

  });

  const getEquipos = async () => {
    const resp = await fetchConToken('equipos');
    const { equipo } = await resp.json();

    setRowdata(equipo.map(b => ({
      id: b.id,
      nombreEquio: b.nombreEquio,
      numInventario: b.numInventario,
      modelo: b.modelo,
      numSerie: b.numSerie,
      voltaje: b.voltaje,
      corriente: b.corriente,
      watts: b.watts,
      temperatura: b.temperatura,
      hp: b.hp,
      hz: b.hz,
      peso: b.peso,
      presion: b.presion,
      volumen: b.volumen,
      rpm: b.rpm,
      fechaIngreso: b.fechaIngreso,
      capacidad: b.capacidad,
      cantidadEquipos: b.cantidadEquipos,
      observaciones: b.observaciones,
      numPeriodo: b.numPeriodo, //HACER REFERENCIA A MES O A AÑO          
      numMes: b.numMes,
      inicioMantenimiento: b.inicioMantenimiento,
      proximoMantenimiento: b.proximoMantenimiento,
      estadoEquipo: b.estadoEquipo,
      // user_idE: id,
      idEqb_user: id,
      // numControl: b.Usuario.numControl,
      rol: rol,
      // fechaBaja: ,
      // nombre: b.Usuario.nombre
    })))
  }

  // const { proximoMantenimiento } = rowData

  // const validacion = () =>{ (== value) ? true : false }
  const abrirCerrarModalVer = () => {
    setModalVisualizar(!modalVisualizar);
    getEquipos();
    console.log('HOLA')
    console.log(equipoSeleccionado)
  }

  const seleccion = (equipo) => {
    // const { inicioMantenimiento } = equipoSeleccionado
    setEquipoSeleccionado(equipo)
    abrirCerrarModalVer()
  }

  const handleInputChange = ({ target }) => {

    setEquipoSeleccionado({
      ...equipoSeleccionado,
      [target.name]: target.value
    });
  }
  const handleFechas = (newValue) => {
    const { target: { value } } = newValue;
    setValue(newValue);
  };

  useEffect(() => {
    // dispatch(equipoStartLoaded());
    getEquipos();
    console.log(value)
    console.log(rowData)

  }, []);

  const bodyVisualizar = (
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
              Edición de Equipo
            </Typography>
          </Paper>
        </Grid>
        <Paper className='cntainerPrueba'
          sx={{ width: '100%', margin: '1vh', borderRadius: '20px' }}
          elevation={10}>
          <Grid container item sx={{ marginBottom: '4vh', marginTop: '2vh' }} justifyContent="center">

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Nombre del Equipo' name='nombreEquio' value={equipoSeleccionado && equipoSeleccionado.nombreEquio} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Numero de Inventario' name='numInventario' value={equipoSeleccionado && equipoSeleccionado.numInventario} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Modelo' name='modelo' value={equipoSeleccionado && equipoSeleccionado.modelo} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Num. de Serie' name='numSerie' value={equipoSeleccionado && equipoSeleccionado.numSerie} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Voltaje' name='voltaje' value={equipoSeleccionado && equipoSeleccionado.voltaje} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Corriente' name='corriente' value={equipoSeleccionado && equipoSeleccionado.corriente} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Watts' name='watts' value={equipoSeleccionado && equipoSeleccionado.watts} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Temperatura' name='temperatura' value={equipoSeleccionado && equipoSeleccionado.temperatura} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='HP' name='hp' value={equipoSeleccionado && equipoSeleccionado.hp} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='HZ' name='hz' value={equipoSeleccionado && equipoSeleccionado.hz} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Peso' name='peso' value={equipoSeleccionado && equipoSeleccionado.peso} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Volumen' name='volumen' value={equipoSeleccionado && equipoSeleccionado.volumen} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='RPM' name='rpm' value={equipoSeleccionado && equipoSeleccionado.rpm} />
            </Grid>


            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Capacidad' name='capacidad' value={equipoSeleccionado && equipoSeleccionado.capacidad} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Capacidad' name='cantidadEquipos' type='number' value={equipoSeleccionado && equipoSeleccionado.cantidadEquipos} />
            </Grid>


            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField
                id="outlined-select-currency"
                select
                label="Periodo Mantenimiento"
                value={equipoSeleccionado && equipoSeleccionado.numPeriodo}
                // onChange={handleChange}
                // placeholder='Seleccionar'
                helperText="Seleccione el periodo de mantenimiento"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {/* <TextField label='Mantenimiento por:' name='numPeriodo' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.numPeriodo} /> */}
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='No. de Meses/año: ' type='number' name='numMes' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.numMes} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DesktopDatePicker onChange={handleFechas} label="Inicio de Mantenimiento" name='inicioMantenimiento' inputFormat="dd/MM/yyyy" value={equipoSeleccionado && equipoSeleccionado.inicioMantenimiento}
                    renderInput={(params) => <TextField {...params} disabled />}
                  />
                </Stack>
              </LocalizationProvider>
              {/* <TextField label='Inicio de mantenimiento' name='inicioMantenimiento' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.inicioMantenimiento} /> */}
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '95%' }}  >
              <TextField
                id="standard-multiline-static"
                multiline
                rows={4}
                label='Observaciones'
                name='observaciones'
                // onChange={handleInputChange}
                value={equipoSeleccionado && equipoSeleccionado.observaciones} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '90%' }} >
              <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}  >
                <Stack spacing={3}>
                  <DesktopDatePicker onChange={handleFechas} label='Proximo Mantenimiento:' inputFormat="dd/MM/yyyy" value={equipoSeleccionado && equipoSeleccionado.proximoMantenimiento} disabled focused
                    renderInput={(params) => <TextField {...params} disabled />}
                  />
                </Stack>
              </LocalizationProvider>
              {/* <TextField id="outlined-basic"  label="" variant="outlined" disabled name='proximoMantenimiento' value={proximoMantenimiento} onChange={handleFechas} /> */}
            </Grid>


            <Button
              variant="outlined"
              sx={{ width: '50%', margin: '2vh', backgroundColor: '', color: '#002F6C', borderRadius: '5vh', fontFamily: 'Monserrat, sans-serif', fontStyle: 'regular' }}
              onClick={() => abrirCerrarModalVer()} >Aceptar</Button>
          </Grid>
        </Paper>
      </Grid>

    </>
  )


  return (
    <>
      <Paper sx={{ borderRadius: '20px', margin: '2vh' }} elevation={10} >
        {rowData.map(equipo => {
          if (moment(equipo.proximoMantenimiento).isSame(value)) {
            return <Card key={equipo.id} variant="outlined" sx={{ display: 'flex', borderRadius: '20px', marginTop:'2vh' , marginBottom:'2vh'}}  >
              <Grid
                container
                direction='row'
                justifyContent="space-between"
                alignItems="center"
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="body2">
                      El {equipo.nombreEquio} requiere mantenimiento
                    </Typography>

                  </CardContent>
                </Box>
                <CardActions sx={{ marginRight: '5vh' }}>
                  <Button variant="outlined" sx={{ margin: '2vh' }} onClick={() => seleccion(equipo)} >Ver</Button>
                  {/* <Button variant="outlined" color='error' >Eliminar</Button> */}
                </CardActions>
                {/* </Grid> */}
              </Grid>
            </Card>
          }
        })
        }

      </Paper>
      <Modal
        open={modalVisualizar}
        onClose={abrirCerrarModalVer}>
        {bodyVisualizar}
      </Modal>


    </>
  )
}
export default EquiposNotificaciones;
