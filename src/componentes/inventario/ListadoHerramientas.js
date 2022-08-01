import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import MaterialTable from '@material-table/core';
import Typography from '@mui/material/Typography';
import { Paper, Grid, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { herramientaStartDeleted, herramientaStartLoaded, herramientaStartUpdated } from '../../actions/herramienta'
import { fetchConToken } from '../../helpers/fetch';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment'; import 'moment-timezone';


export const ListadoHerramientas = () => {

  const dispatch = useDispatch();
  const { herramienta } = useSelector(state => state.herramienta);
  const { id, rol } = useSelector(state => state.auth);

  const [rowData, setRowdata] = useState([]);
  const [modalVisualizar, setModalVisualizar] = useState(false);

  const [valueRecepcion, setValueRecepcion] = useState();

  const handleDateRecepcion = (newValue) => {
    setValueRecepcion(newValue);
  }

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

  const [cardSeleccionado, setCardSeleccionado] = useState({
    id: '',
    tipoH: '',
    codigo: '',
    nombreH: '',
    cantidad: '',
    unidad: '',
    descripcion: '',
    obervaciones: '',
    precioCosto: '',
    precioVenta: '',
    precioMayoreo: '',
    precioMinimo: '',
    horaIngreso: '',
    fechaIngreso: '',
    user_id: id,
    rol: rol

  })

  const seleccion = (mat) => {
    setCardSeleccionado(mat)
    abrirCerrarModalVer()
  }

  const obtenerHerra = async () => {

    const resp = await fetchConToken('herramientas');
    const { herramienta } = await resp.json();

    setRowdata(herramienta.map(b => ({
      id: b.id,
      tipoH: b.tipoH,
      codigo: b.codigo,
      nombreH: b.nombreH,
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
      user_id: id,
      numControl: b.usuario.numControl,
      rol: rol,
      role: b.usuario.rol,
      nombre: b.usuario.nombre
    })))
  }

  const abrirCerrarModalVer = () => {
    setModalVisualizar(!modalVisualizar);
    obtenerHerra();
  }

  const handleInputChange = ({ target }) => {
    setCardSeleccionado({
      ...cardSeleccionado,
      [target.name]: target.value
    });
  }

  useEffect(() => {
    dispatch(herramientaStartLoaded());
    obtenerHerra();
    // funciones();

  }, [dispatch])

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
        dispatch(herramientaStartUpdated(cardSeleccionado))
        // dispatch(materialStartUpdated(cardSeleccionado));
        Swal.fire(
          'Actualizado!',
          'El registro ha sido actualizado.',
          'success'
        )
        obtenerHerra();
      }
    })
    abrirCerrarModalVer();
  }

  const handleDelete = (mat) => {

    // dispatch( materialStartDeleted( rowData ) )
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
        dispatch(herramientaStartDeleted(mat.id, mat.rol))
        // dispatch(materialStartDeleted(mat.id))
        Swal.fire(
          'Eliminado!',
          'El registro ha sido borrado.',
          'success'
        )
        obtenerHerra();
      }
    })
  }

  const columnas = [

    {
      title: 'Tipo Heramienta',
      field: 'tipoH',
    },
    {
      title: 'Nombre',
      field: 'nombreH'
    },
    {
      title: 'Cantidad Herramienta',
      field: 'cantidad'
    },
    {
      title: 'Fecha de Ingreso',
      field: 'fechaIngreso',
      type: 'date',
      dateSetting: {
        format: 'DD/MM/YYYY'
      },
    },
    {
      title: 'Numero Control',
      field: 'numControl'
    },
    {
      title: 'Rol de Usuario',
      field: 'role'
    },
    {
      title: 'Nombre',
      field: 'nombre'
    }
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
              Edición de Heramienta
            </Typography>
          </Paper>
        </Grid>
        <Paper className='cntainerPrueba'
          sx={{ width: '100%', margin: '1vh', borderRadius: '20px' }}
          elevation={10}>
          <Grid container item sx={{ marginBottom: '4vh', marginTop: '2vh' }} justifyContent="center">
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Tipo de Herramienta' name='tipoH' onChange={handleInputChange} value={cardSeleccionado && cardSeleccionado.tipoH} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Codigo de Herramienta' name='codigo' onChange={handleInputChange} value={cardSeleccionado && cardSeleccionado.codigo} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Nombre Herramienta' name='nombreH' onChange={handleInputChange} value={cardSeleccionado && cardSeleccionado.nombreH} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Cantidad de Herramienta' name='cantidad' onChange={handleInputChange} type="number" value={cardSeleccionado && cardSeleccionado.cantidad} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Precio costo" variant="outlined" type="number" name='precioCosto' onChange={handleInputChange} value={cardSeleccionado && cardSeleccionado.precioCosto} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Precio venta" variant="outlined" type="number" name='precioVenta' onChange={handleInputChange} value={cardSeleccionado && cardSeleccionado.precioVenta} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Precio mayoreo" variant="outlined" type="number" name='precioMayoreo' onChange={handleInputChange} value={cardSeleccionado && cardSeleccionado.precioMayoreo} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Precio minimo" variant="outlined" type="number" name='precioMinimo' onChange={handleInputChange} value={cardSeleccionado && cardSeleccionado.precioMinimo} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField
                id="standard-multiline-static"
                label="Descripcion"
                multiline
                rows={4} onChange={handleInputChange}
                placeholder="Descripcion"
                name='descripcionM'
                variant="outlined" value={cardSeleccionado && cardSeleccionado.descripcion}
              />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField
                id="standard-multiline-static"
                label="Observaciones"
                multiline
                rows={4}
                onChange={handleInputChange}
                placeholder="Observaciones"
                name='obervacionesM'
                variant="outlined" value={cardSeleccionado && cardSeleccionado.obervaciones}
              />
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
    <>
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

            }}
          >
            Listado de Herramientas en el Almacen
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
          }
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
    </>
  )
}
export default ListadoHerramientas;

