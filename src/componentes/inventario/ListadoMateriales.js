import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';

import MaterialTable from '@material-table/core';
import Typography from '@mui/material/Typography';
import { Paper, Grid, Stack, TextField } from '@mui/material';
import './Tablas.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { material, materialStartLoaded, usuariosMaterial, materialStartUpdated, materialStartDeleted, materialStartUpdate } from '../../actions/material';
import { fetchConToken } from '../../helpers/fetch';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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

export const ListadoMateriales = () => {

  const dispatch = useDispatch();

  const { material } = useSelector(state => state.material);
  const { id, rol } = useSelector(state => state.auth);

  const [rowData, setRowdata] = useState([]);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [valueRecepcion, setValueRecepcion] = useState();
  const [unidadMedid, setUnidadMedid] = useState();
  const [tipoMater, setTipoMater] = useState();


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
    tipoM: '',
    codigoM: '',
    nombreM: '',
    cantidadM: '',
    unidadM: '',
    descripcionM: '',
    obervacionesM: '',
    precioCosto: '',
    precioVenta: '',
    precioMayoreo: '',
    precioMinimo: '',
    horaIngreso: '',
    fechaIngreso: '',
    precioAdquisicion: '',
    numeroRequisicion: '',
    numeroFactura: '',
    numeroSisat: '',
    nombreVendedor: '',
    user_idm: id,
    rol: rol,
    tipoDesc: ''
  })

  const handleUnidadMedida = (event) => {
    const {
      target: { value },
    } = event;
    setUnidadMedid(value)
    setCardSeleccionado({ ...cardSeleccionado, unidadMedid: value })
  }
  const handleTipoMater = (event) => {
    const {
      target: { value },
    } = event;
    setTipoMater(value);
    setCardSeleccionado({ ...cardSeleccionado, tipoM: value })
  }

  const seleccion = (mat) => {
    setCardSeleccionado(mat)
    abrirCerrarModalVer()
  }

  const obtenerMate = async () => {

    const resp = await fetchConToken('materiales');
    const { material } = await resp.json();

    setRowdata(material.map(b => ({
      id: b.id,
      tipoM: b.tipoM,
      codigoM: b.codigoM,
      nombreM: b.nombreM,
      cantidadM: b.cantidadM,
      unidadM: b.unidadM,
      descripcionM: b.descripcionM,
      obervacionesM: b.obervacionesM,
      precioCosto: b.precioCosto,
      precioVenta: b.precioVenta,
      precioMayoreo: b.precioMayoreo,
      precioMinimo: b.precioMinimo,
      horaIngreso: b.horaIngreso,
      fechaIngreso: b.fechaIngreso,
      precioAdquisicion: b.precioAdquisicion,
      numeroRequisicion: b.numeroRequisicion,
      numeroFactura: b.numeroFactura,
      numeroSisat: b.numeroSisat,
      nombreVendedor: b.nombreVendedor,
      user_idm: id,
      numControl: b.usuario.numControl,
      role: b.usuario.rol,
      nombre: b.usuario.nombre,
      rol: rol,
      tipoDesc: ''
    })))



    //   material.map(b => {

    //   // console.log(b

    //   if(b.cantidadM<5){
    //     console.log('Menor de 5:',b.nombreM)
    //   }
    //   // console.log(b.Usuario)
    // })


  }
  const abrirCerrarModalVer = () => {
    obtenerMate();
    setModalVisualizar(!modalVisualizar);
    obtenerMate();

  }
  const handleInputChange = ({ target }) => {
    setCardSeleccionado({
      ...cardSeleccionado,
      [target.name]: target.value
    });
  }

  useEffect(() => {
    obtenerMate();
    dispatch(materialStartLoaded());
    // funciones();

  }, [dispatch])

  const funciones = () => {
    obtenerMate();
    Swal.fire({
      title: '¿Guardar los cambios que realizó?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar cambios'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(materialStartUpdated(cardSeleccionado));
        Swal.fire(
          'Actualizado!',
          'El registro ha sido actualizado.',
          'success'
        )
        obtenerMate();
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
        dispatch(materialStartDeleted(mat.id, mat.rol))
        Swal.fire(
          'Eliminado!',
          'El registro ha sido borrado.',
          'success'
        )
        obtenerMate();

      }
    })
    // console.log('ROW: ', mat.id)
    // dispatch(materialStartLoaded());


  }

  const columnas = [

    {
      title: 'Tipo Material',
      field: 'tipoM',
    },
    {
      title: 'Nombre',
      field: 'nombreM'
    },
    {
      title: 'Cantidad Material',
      field: 'cantidadM'
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
    // {
    //   title: 'Nombre',
    //   field: 'nombre'
    // },
    {
      title: 'Precio Adquisicion',
      field: 'precioAdquisicion'
    },
    {
      title: 'Requisición',
      field: 'numeroRequisicion'
    },
    {
      title: 'Numero SISAT',
      field: 'numeroFactura'
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
              width: '100%', borderRadius: '20px',
              margin: '2vh',
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
              <TextField id="outlined-select-currency" select label="Tipo de Material" value={cardSeleccionado && cardSeleccionado.tipoM} onChange={handleTipoMater} name='sexo'>
                {tipoMat.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {/* <TextField label='Tipo de Material' name='tipoM' onChange={handleInputChange} value={cardSeleccionado && cardSeleccionado.tipoM} /> */}
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Codigo de Material' name='codigoM' onChange={handleInputChange} value={cardSeleccionado && cardSeleccionado.codigoM} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Nombre Material' name='nombreM' onChange={handleInputChange} value={cardSeleccionado && cardSeleccionado.nombreM} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField label='Cantidad de Material' name='cantidadM' onChange={handleInputChange} type="number" value={cardSeleccionado && cardSeleccionado.cantidadM} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }} >
              <TextField id="outlined-select-currency" select label="Unidad de Medida" value={cardSeleccionado && cardSeleccionado.unidadM} onChange={handleUnidadMedida} name='unidadM'>
                {unidadMedida.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {/* <TextField id="outlined-basic" label="Unidad de medida" variant="outlined" name='unidadM' onChange={handleInputChange} value={cardSeleccionado && cardSeleccionado.unidadM} /> */}
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}>
              <TextField id="outlined-basic" label="Precio costo" variant="outlined" type="number" name='precioCosto' onChange={handleInputChange} value={cardSeleccionado && cardSeleccionado.precioCosto} />
            </Grid>
            <Grid className='elementosForm' sx={{ width: '48%' }} item>
              <TextField id="outlined-basic" label="Precion de Adquisición" variant="outlined" type='number' name='precioAdquisicion' value={cardSeleccionado && cardSeleccionado.precioAdquisicion} onChange={handleInputChange} />
            </Grid>
            <Grid className='elementosForm' sx={{ width: '48%' }} item>
              <TextField id="outlined-basic" label="Numero de Requisición" variant="outlined" name='numeroRequisicion' value={cardSeleccionado && cardSeleccionado.numeroRequisicion} onChange={handleInputChange} />
            </Grid>
            <Grid className='elementosForm' sx={{ width: '48%' }} item>
              <TextField id="outlined-basic" label="Numero de Factura" variant="outlined" name='numeroFactura' value={cardSeleccionado && cardSeleccionado.numeroFactura} onChange={handleInputChange} />
            </Grid>
            <Grid className='elementosForm' sx={{ width: '48%' }} item>
              <TextField id="outlined-basic" label="Numero de Sisat" variant="outlined" name='numeroSisat' value={cardSeleccionado && cardSeleccionado.numeroSisat} onChange={handleInputChange} />
            </Grid>
            <Grid className='elementosForm' sx={{ width: '96%' }} item>
              <TextField id="outlined-basic" label="Nombre del Vendedor" variant="outlined" name='nombreVendedor' value={cardSeleccionado && cardSeleccionado.nombreVendedor} onChange={handleInputChange} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '96%' }}>
              <TextField
                id="standard-multiline-static"
                label="Descripcion"
                multiline
                rows={4} onChange={handleInputChange}
                placeholder="Descripcion"
                name='descripcionM'
                variant="outlined" value={cardSeleccionado && cardSeleccionado.descripcionM}
              />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '96%' }}>
              <TextField
                id="standard-multiline-static"
                label="Observaciones"
                multiline
                rows={4}
                onChange={handleInputChange}
                placeholder="Observaciones"
                name='obervacionesM'
                variant="outlined" value={cardSeleccionado && cardSeleccionado.obervacionesM}
              />
            </Grid>
            <Button
              variant="outlined"
              sx={{
                width: '50%', margin: '2vh', backgroundColor: '', color: '#002F6C', borderRadius: '5vh',
                fontFamily: 'Monserrat, sans-serif', fontStyle: 'regular'
              }}
              onClick={() => funciones()} >Aceptar</Button>
          </Grid>
        </Paper>
      </Grid>

    </>
  )

  return (
    <>
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

              }}
            >
              Listado de Materiales en el Almacen
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

      </div>
      <Modal
        open={modalVisualizar}
        onClose={abrirCerrarModalVer}>
        {bodyVisualizar}
      </Modal>

    </>
  )
}
export default ListadoMateriales;

