import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import MaterialTable from '@material-table/core';
import Typography from '@mui/material/Typography';
import { Paper, Grid, TextField, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { equipoStartAddNew, equipoStartLoaded, equipoStartUpdated, equipoStartDeleted, equipoStartAddNewDeleted } from '../../actions/equipos'
import { fetchConToken } from '../../helpers/fetch';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale'
import moment from 'moment'; import 'moment-timezone';

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


export const EquiposLista = () => {


  const dispatch = useDispatch();
  const { equipo } = useSelector(state => state.equipo);
  const { id, rol } = useSelector(state => state.auth);

  const [rowData, setRowdata] = useState([]);
  const [modalVisualizar, setModalVisualizar] = useState(false);

  const [valueRecepcion, setValueRecepcion] = useState();
  const [value, setValue] = React.useState(new Date(moment.tz("America/Mexico_City").format('L')));
  const [valueProx, setValueProx] = React.useState();

  const [dateDeleted, setDateDeleted] = React.useState(new Date(moment.tz("America/Mexico_City").format('L')));


  const [currency, setCurrency] = React.useState('');



  const handleDateRecepcion = (newValue) => {
    setValueRecepcion(newValue);
  }

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
  const [equipBajas, setEquipBajas] = useState({
    nombreEquio: '',
    numInventario: '',
    modelo: '',
    numSerie: '',
    fechaIngreso: '',
    cantidadEquipos: '',
    numPeriodo: '',
    numMes: '',
    inicioMantenimiento: value,
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
    rol: rol
  });


  const [equipoSeleccionado, setEquipoSeleccionado] = useState({
    nombreEquio: '',
    numInventario: '',
    modelo: '',
    numSerie: '',
    fechaIngreso: '',
    cantidadEquipos: '',
    numPeriodo: '',
    numMes: '',
    inicioMantenimiento: value,
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

  const obtenerEquipos = async () => {

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
      fechaBaja: dateDeleted,
      // nombre: b.Usuario.nombre
    })))
  }

  // const {inicioMantenimiento} = equipoSeleccionado

  const abrirCerrarModalVer = () => {
    setModalVisualizar(!modalVisualizar);
    obtenerEquipos();
    console.log('HOLA')
    console.log(equipoSeleccionado)
  }

  // const inicioMante = '';


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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrency(value);
    setEquipoSeleccionado({ ...equipoSeleccionado, numPeriodo: value })


  }

  const handleSet = (equipo) => {
    setEquipBajas({ ...equipo })
  }

  useEffect(() => {
    dispatch(equipoStartLoaded());
    obtenerEquipos();

  }, [dispatch]);

  const handleFechas = (newValue) => {
    const { inicioMantenimiento, numMes, numPeriodo } = equipoSeleccionado;
    // const { target: { value } } = newValue;
    setValue(newValue);
    console.log(newValue);
    if(numPeriodo == 'Mes'){
      var new_date = new Date(moment(newValue).add(numMes, 'M').tz("America/Mexico_City").format('L'));
      // console.log('CAMBIO',new_date)
      setValueProx(new_date);
      setEquipoSeleccionado({ ...equipoSeleccionado, inicioMantenimiento: newValue, proximoMantenimiento: new_date })
    }else if(numPeriodo == 'Año'){
      var new_date = new Date(moment(newValue).add(numMes, 'y').tz("America/Mexico_City").format('L'));
      // console.log('CAMBIO',new_date)
      setValueProx(new_date);
      setEquipoSeleccionado({ ...equipoSeleccionado, inicioMantenimiento: newValue, proximoMantenimiento: new_date })
    }
    //AQUI SE CAMBIARA LA FECHA EN EL FORMVALUES 
    // setEquipoSeleccionado({ ...equipoSeleccionado, inicioMantenimiento: newValue })
  };



  const funciones = () => {
    Swal.fire({
      title: '¿Guardar los cambios que realizó?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar cambios'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(equipoStartUpdated(equipoSeleccionado))
        // dispatch(materialStartUpdated(cardSeleccionado));
        Swal.fire(
          'Actualizado!',
          'El registro ha sido actualizado.',
          'success'
        )
        obtenerEquipos();

      }
    })
    abrirCerrarModalVer();

  }



  const handleDelete = (equipo) => {
    Swal.fire({
      title: 'Seguro que desea eliminar este material?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(equipoStartAddNewDeleted(equipo));
        dispatch(equipoStartDeleted(equipo.id, equipo.rol))
        // dispatch(materialStartDeleted(mat.id))
        Swal.fire(
          'Eliminado!',
          'El registro ha sido borrado.',
          'success'
        )
        obtenerEquipos();

      }
    })
    // console.log('ROW: ', equipoSeleccionado)
  }
  const columnas = [
    { title: 'Nombre del equipo', field: 'nombreEquio' },
    { title: 'No. de Inventario', field: 'numInventario' },
    // { title: 'Modelo', field: 'modelo' },
    { title: 'No. de Serie', field: 'numSerie' },
    {
      title: 'Fecha Ingreso', field: 'fechaIngreso', type: 'date', dateSetting: {
        format: 'DD/MM/YYYY'
      },
    },
    // { title: 'Cantidad disponible', field: 'cantidadEquipos' },
    { title: 'Disponibilidad', field: 'estadoEquipo' }
  ];

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
              <TextField label='Nombre del Equipo' name='nombreEquio' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.nombreEquio} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Numero de Inventario' name='numInventario' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.numInventario} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Modelo' name='modelo' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.modelo} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Num. de Serie' name='numSerie' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.numSerie} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Voltaje' name='voltaje' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.voltaje} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Corriente' name='corriente' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.corriente} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Watts' name='watts' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.watts} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Temperatura' name='temperatura' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.temperatura} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='HP' name='hp' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.hp} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='HZ' name='hz' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.hz} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Peso' name='peso' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.peso} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Volumen' name='volumen' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.volumen} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='RPM' name='rpm' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.rpm} />
            </Grid>


            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Capacidad' name='capacidad' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.capacidad} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Capacidad' name='cantidadEquipos' type='number' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.cantidadEquipos} />
            </Grid>


            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField
                id="outlined-select-currency"
                select
                label="Periodo Mantenimiento"
                value={equipoSeleccionado && equipoSeleccionado.numPeriodo}
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
              {/* <TextField label='Mantenimiento por:' name='numPeriodo' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.numPeriodo} /> */}
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='No. de Meses/año: ' type='number' name='numMes' onChange={handleInputChange} value={equipoSeleccionado && equipoSeleccionado.numMes} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DesktopDatePicker label="Inicio de Mantenimiento" name='inicioMantenimiento' inputFormat="dd/MM/yyyy" onChange={handleFechas} value={equipoSeleccionado && equipoSeleccionado.inicioMantenimiento}
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
                onChange={handleInputChange}
                value={equipoSeleccionado && equipoSeleccionado.observaciones} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '90%' }} >
              <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}  >
                <Stack spacing={3}>
                  <DesktopDatePicker label='Proximo Mantenimiento:' inputFormat="dd/MM/yyyy" value={equipoSeleccionado&&equipoSeleccionado.proximoMantenimiento} onChange={handleFechas} disabled focused
                    renderInput={(params) => <TextField {...params} disabled />}
                  />
                </Stack>
              </LocalizationProvider>
              {/* <TextField id="outlined-basic"  label="" variant="outlined" disabled name='proximoMantenimiento' value={proximoMantenimiento} onChange={handleFechas} /> */}
            </Grid>


            <Button
              variant="outlined"
              sx={{ width: '50%', margin: '2vh', backgroundColor: '', color: '#002F6C', borderRadius: '5vh', fontFamily: 'Monserrat, sans-serif', fontStyle: 'regular' }}
              onClick={() => funciones()} >Aceptar</Button>
          </Grid>
        </Paper>
      </Grid>

    </>
  )

  return (
    <div>

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
          <Typography variant='h2' component='div' align='center'
            sx={{
              fontFamily: 'Monserrat, sans-serif',
              fontWeight: 400,
              fontStyle: 'regular',
              color: '#706c6c',
              fontSize: '2.5rem',
              letterSpacing: '1vh',
              marginTop: '2vh',
              marginBottom: '2vh',

            }}>
            Listado de Equipos
          </Typography>
        </Paper>
      </Grid>
      <MaterialTable
        title=''
        columns={columnas}
        data={rowData}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar',
            onClick: (event, rowData) => seleccion(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar',
            onClick: (event, rowData) => handleDelete(rowData)
          },
          // {
          //   icon: 'previewRounded',
          //   tooltip: 'Ver'
          // }
        ]}
        options={{
          actionsColumnIndex: -1,
          searchFieldStyle: {
            // width: '90vh'
            marginLeft: '60%'
          },
        }}
        localization={{
          header: {
            actions: 'Acciones'
          }
        }}
      />
      <Modal
        open={modalVisualizar}
        onClose={abrirCerrarModalVer}>
        {bodyVisualizar}
      </Modal>

    </div>
  )
}
export default EquiposLista;
