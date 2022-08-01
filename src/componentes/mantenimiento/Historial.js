import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import Typography from '@mui/material/Typography';
import { Paper, Grid, TextField, Stack } from '@mui/material';
import { fetchConToken } from '../../helpers/fetch';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment'; import 'moment-timezone';
import MenuItem from '@mui/material/MenuItem';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import CheckIcon from '@mui/icons-material/Check';
import { materialStartUpdated } from '../../actions/material'
import { materialUsadoStartAddNew } from '../../actions/materialusado'
import { mantenimientoStartAddNew, mantenimientoStartLoaded, mantenimientoStartUpdated, mantenimientoStartDeleted } from '../../actions/mantenimiento'

const tiposMantenimiento = [
  {
    value: 'Preventivo',
    label: 'Preventivo'

  },
  {
    value: 'Correctivo',
    label: 'Correctivo'
  }
];

const tipoServicio = [
  {
    value: 'Interno',
    label: 'Interno'
  },
  {
    value: 'Externo',
    label: 'Externo'
  }
];

const areaDepa = [
  {
    value: 'Sistemas y Computación',
    label: 'Sistemas y Computación'
  },
  {
    value: 'Dpto. de Mantenimiento y Equipo',
    label: 'Dpto. de Mantenimiento y Equipo'
  }
];

const stadoMantenimiento = [
  {
    value: 'Pendiente',
    label: 'Pendiente'
  },
  {
    value: 'Cancelado',
    label: 'Cancelar'
  },
  {
    value: 'Realizado',
    label: 'Finalizar'
  }
];

export const Historial = () => {

  const dispatch = useDispatch();
  const { id, rol } = useSelector(state => state.auth);
  const [rowData, setRowdata] = useState([]);
  const [rowMatUsado, setRowMatUsado] = useState([]);
  const [rowMateriales, setRowMateriales] = useState([]);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [modalAltaMatUsado, setModalAltaMatUsado] = useState(false);
  const [fechaMantRealizacion, setFechaMantRealizacion] = useState();
  const [tipoMantenimiento, setTipoMantenimiento] = useState('');
  const [statusMant, setStatusMant] = useState('');
  const [servic, setServic] = useState('');
  // const [servic, setServic] = useState('');
  const [areaDepartamento, setAreaDepartamento] = useState('');
  const [valueRecepcion, setValueRecepcion] = React.useState(new Date());
  const [textoError, setTextoError] = React.useState('');
  const [errorCampo, setErrorCampo] = React.useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
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
  const styleDos = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    // pb: 3,
    borderRadius: '20px',
    overflow: 'auto',
    height: '90%',
    // display: 'block'
  };
  const [mantenimientoSeleccionado, setMantenimientoSeleccionado] = useState({
    id: '',
    tipoMante: '',
    servicio: '',
    areaDepart: '',
    tipoServ: '',
    asignado: '',
    fechaRealizacion: '',
    trabajoRealizdo: '',
    materialUtilizado: '',
    realizadoPor: '',
    verificadoLiberadoPor: '',
    vistoBuenoSolicitante: '',
    user_idM: '',
    status: '',
    rol: rol,
    tipoDesc:''
  })
  const [material, setMaterial] = useState({
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
    user_idm: '',
    rol: rol,
    descuento: '',
    tipoDesc:''
  })
  const { descuento } = material
  const [matUsado, setMatUsado] = useState({
    id_mantenimiento: '',
    id_material: '',
    cantidadUsada: '',
    tipoDesc:'mantenimiento'

  })
  const { cantidadUsada } = matUsado;
  const { status } = mantenimientoSeleccionado;

  const {
    fechaRealizacion,
    trabajoRealizdo,
    materialUtilizado,
    realizadoPor,
    verificadoLiberadoPor,
    vistoBuenoSolicitante } = mantenimientoSeleccionado;

  const seleccion = (mantenimiento) => {
    setMantenimientoSeleccionado(mantenimiento);
    setMatUsado({ ...matUsado, id_mantenimiento: mantenimiento.id })
    abrirCerrarModalVer();
    console.log(mantenimiento.id)
  }


  const getMantenimientos = async () => {
    const resp = await fetchConToken('mantenimiento');
    const { mantenimiento } = await resp.json();
    setRowdata(mantenimiento.map(b => ({
      id: b.id,
      tipoMante: b.tipoMante,
      servicio: b.servicio,
      areaDepart: b.areaDepart,
      tipoServ: b.tipoServ,
      asignado: b.asignado,
      fechaRealizacion: b.fechaRealizacion,
      trabajoRealizdo: b.trabajoRealizdo,
      materialUtilizado: b.materialUtilizado,
      realizadoPor: b.realizadoPor,
      verificadoLiberadoPor: b.verificadoLiberadoPor,
      vistoBuenoSolicitante: b.vistoBuenoSolicitante,
      status: b.status,
      user_idM: b.user_idM,
      // status:b.status
      rol: rol
    })))
  }

  const getMaterialUsado = async (id) => {
    // id = 2;
    const resp = await fetchConToken('materialUsados');
    const { materialUsado } = await resp.json();

    setRowMatUsado(materialUsado.filter(mus => mus.id_mantenimiento == id).map(mus => ({
      id: mus.id,
      id_mantenimiento: mus.id_mantenimiento,
      id_material: mus.id_material,
      cantidadUsada: mus.cantidadUsada,
      tipoM: mus.materiale.tipoM,
      codigoM: mus.materiale.codigoM,
      nombreM: mus.materiale.nombreM
    })))
  }

  const getMateriales = async () => {
    const resp = await fetchConToken('materiales');
    const { material } = await resp.json();

    setRowMateriales(material.filter(mat => mat.cantidadM >= 5).map(mat => ({
      id: mat.id,
      tipoM: mat.tipoM,
      codigoM: mat.codigoM,
      nombreM: mat.nombreM,
      cantidadM: mat.cantidadM,
      unidadM: mat.unidadM,
      descripcionM: mat.descripcionM,
      obervacionesM: mat.obervacionesM,
      precioCosto: mat.precioCosto,
      precioVenta: mat.precioVenta,
      precioMayoreo: mat.precioMayoreo,
      precioMinimo: mat.precioMinimo,
      horaIngreso: mat.horaIngreso,
      fechaIngreso: mat.fechaIngreso,
      user_idm: id,
      rol: rol,
      tipoDesc:'mantenimiento'
    })))
  }
  const abrirModal = () => {
    abrirCerrarModalMu();
    console.log('DATA', matUsado)
  }

  const abrirCerrarModalMu = () => {
    setModalAltaMatUsado(!modalAltaMatUsado);
    //OBTENER LISTA DE MATERIALES
  }

  const abrirCerrarModalVer = () => {
    setModalVisualizar(!modalVisualizar);
    getMantenimientos();
  }
  const handleFechaMantRealizados = (value) => {
    setFechaMantRealizacion(value);
  }
  const handleChangeTipoMan = (event) => {
    const {
      target: { value },
    } = event;
    setTipoMantenimiento(value);
    setMantenimientoSeleccionado({ ...mantenimientoSeleccionado, tipoMante: value })
    console.log(value)
  };
  const handleEstadoMantenimiento = (event) => {
    const {
      target: { value },
    } = event;
    setStatusMant(value)
    setMantenimientoSeleccionado({ ...mantenimientoSeleccionado, status: value })
  }
  const handleChangeTipoSer = (event) => {
    const {
      target: { value },
    } = event;
    setServic(value);
    setMantenimientoSeleccionado({ ...mantenimientoSeleccionado, servicio: value })
    console.log(value)
  };
  const handleChangeAreaDep = (event) => {
    const {
      target: { value },
    } = event;
    setAreaDepartamento(value);
    setMantenimientoSeleccionado({ ...mantenimientoSeleccionado, areaDepart: value })
    console.log(value)
  };
  const handleDateRecepcion = (newValue) => {
    setValueRecepcion(newValue);
    setMantenimientoSeleccionado({ ...mantenimientoSeleccionado, fechaRealizacion: newValue })
  }
  const selecMat = (materiales) => {
    setMaterial(materiales)
    console.log('PP', materiales)
    setMatUsado({ ...matUsado, nombreM: materiales.nombreM, id_material: materiales.id, cantidadM: materiales.cantidadM })
    // setRowdata({...rowData,})
  }
  const handleValidation = (value) => {
    const { cantidadM } = matUsado;
    setMatUsado({ ...matUsado, cantidadUsada: value })
  }
  const ingMatRest = (usada) => {
    console.log(usada)
    const { cantidadM } = material
    let total = cantidadM - usada
    setMaterial({ ...material, cantidadM: total })
    console.log('total', total)
  }
  const datosText = (usada) => {
    abrirCerrarModalMu()
    const { cantidadUsada, cantidadM } = matUsado;
    setMaterial({ ...material, descuento: cantidadUsada, tipoDesc: 'mantenimiento' })
    // setRowMateriales({...rowMateriales,cantidadM: cantidadM-usada})

    console.log('USADA', usada)
    if (rol == 'Administrador') {
      if (cantidadUsada == cantidadM) {
        Swal.fire({
          target: document.getElementById('body-mantenimiento'),
          title: '¿Se quedará sin suministros en el álmacen?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Guardar cambios'
        }).then((result) => {
          if (result.isConfirmed) {
            // set
            console.log('DESC', material)
            dispatch(materialUsadoStartAddNew(matUsado))
            dispatch(materialStartUpdated(material))
            console.log('USADO', matUsado)
            setMatUsado({
              ...matUsado,
              id_material: '',
              cantidadUsada: ''
            })
            Swal.fire({
              target: document.getElementById('body-mantenimiento'),
              title: 'El registro ha sido actualizado.',
              icon: 'success'
            }
            )
          }
        })
      }
      if (cantidadUsada < cantidadM) {
        console.log(cantidadM)
        Swal.fire({
          target: document.getElementById('body-mantenimiento'),
          title: 'El registro ha sido actualizado.',
          icon: 'warning',
          // showCancelButton: true,
          confirmButtonColor: '#3085d6',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }
        ).then((result) => {
          if (result.isConfirmed) {            // setMaterial({ ...material, cantidadM: total })
            getMateriales();
            dispatch(materialUsadoStartAddNew(matUsado))
            dispatch(materialStartUpdated(material))
            getMateriales();
            setMatUsado({
              ...matUsado,
              id_material: '',
              cantidadUsada: ''
            })
            // Swal.fire({
            //   target: document.getElementById('body-mantenimiento'),
            //   // 'Actualizado!',
            //   title: 'El registro ha sido actualizado.',
            //   icon: 'success'
            // }
            // )
          }
        })
      }
      if (cantidadUsada > cantidadM) {
        Swal.fire(
          {
            title: 'No existe la cantidad solicitada.',
            icon: 'error'
          }
        )
      }
      getMateriales()
    } else if (rol == 'servicio social') {
      Swal.fire(
        {
          target: document.getElementById('body-asignacion'),
          // 'Error',
          title: 'Necesitas permiso de administrador',
          icon: 'error'
        }
      )
      console.log('Necesitas permiso de administrador')
    }


    console.log('MATERIAL SELECCIONADO', matUsado)
  }

  const handleInputChange = ({ target }) => {
    const { cantidadM } = material
    // const {name} = target
    setMantenimientoSeleccionado({
      ...mantenimientoSeleccionado,
      [target.name]: target.value
    });
    setMaterial({ ...material, descuento: target.value })

    setMatUsado({
      ...matUsado,
      [target.name]: target.value
    })

    // console.log(target.value)
    //  const { cantidadM } = matUsado;
  }
  const updateMantenimientoFinalizar = () => {
    Swal.fire({
      target: document.getElementById('body-mantenimiento'),
      title: '¿Guardar los cambios realizados?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar cambios'
    }).then((result) => {
      if (result.isConfirmed) {
        // set
        dispatch(mantenimientoStartUpdated(mantenimientoSeleccionado))

        Swal.fire({
          target: document.getElementById('body-mantenimiento'),
          title: 'El registro ha sido actualizado.',
          icon: 'success'
        }
        )
        abrirCerrarModalVer()
      }
    })
    // setMantenimientoSeleccionado({...mantenimientoSeleccionado, status:'Realizado'});

    console.log('status:', mantenimientoSeleccionado)
  }

  useEffect(() => {
    dispatch(mantenimientoStartLoaded());
    getMantenimientos();
    getMateriales();
  }, [dispatch])

  const funciones = () => {
    Swal.fire({
      target: document.getElementById('body-asignacion'),
      title: '¿Guardar los cambios que realizó?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar cambios'
    }).then((result) => {
      if (result.isConfirmed) {
        // dispatch(herramientaStartUpdated(cardSeleccionado))
        // dispatch(materialStartUpdated(cardSeleccionado));
        Swal.fire(
          'Actualizado!',
          'El registro ha sido actualizado.',
          'success'
        )
        getMantenimientos();
      }
    })
    abrirCerrarModalVer();
  }

  const columnas = [
    {
      title: 'Tipo de Mantenimiento',
      field: 'tipoMante',
    },
    {
      title: 'Servicio',
      field: 'servicio'
    },
    {
      title: 'Area o Departamento',
      field: 'areaDepart'
    },
    {
      title: 'Tipo Servicio',
      field: 'tipoServ'
    },
    {
      title: 'Asignado',
      field: 'asignado'
    },
    {
      title: 'Estado',
      field: 'status'
    }
  ];

  const columMatUsado = [
    {
      title: 'Cantidad Usado(a)',
      field: 'cantidadUsada'
    },
    {
      title: 'Tipo de Material',
      field: 'tipoM'
    },
    {
      title: 'Código Material',
      field: 'codigoM'
    },
    {
      title: 'Nombre del Material',
      field: 'nombreM'
    }
  ];

  const columMateriales = [

    {
      title: 'Tipo Material',
      field: 'tipoM'
    },
    {
      title: 'Código',
      field: 'codigoM'
    },
    {
      title: 'Nombre Material',
      field: 'nombreM'
    },
    {
      title: 'Cantidad',
      field: 'cantidadM'
    }

  ];

  const [expanded, setExpanded] = React.useState(false);
  const [expandedDos, setExpandedDos] = React.useState(false);


  const handleChangeEx = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    // getMaterialUsado()
  };
  const handleChangeExDos = (panel) => (event, isExpanded) => {
    setExpandedDos(isExpanded ? panel : false);
  };

  const bodyAsignacionMateriales = (
    <>
      <Grid
        container
        direction='row'
        className='gridPrin'
        sx={{
          ...styleDos,
          marginTop: '1vh', marginBottom: '2vh', width: '60%',
          marginLeft: 'auto', marginRight: 'auto'
        }}
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Paper
          className='cntainerPrueba'
          sx={{ width: '100%', margin: '0.2vh', borderRadius: '20px' }}
          elevation={10}>
          <Grid container item sx={{ marginBottom: '5vh', marginTop: '5vh', width: '100%' }} justifyContent="center">

            <Grid className='elementosForm' item sx={{ width: '90%' }}>
              <TextField label="Nombre del Material" variant="outlined" size='small' name='nombreM' value={(matUsado && matUsado.nombreM == null) ? '' : matUsado && matUsado.nombreM} onChange={handleInputChange} disabled />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '90%' }}>
              <TextField label="Cantidad de Material" variant="outlined" size='small' name='cantidadUsada' value={(cantidadUsada == null) ? '' : cantidadUsada} onChange={handleInputChange} />
            </Grid>
            {/*AQUI BOTONES*/}
            <Grid sx={{ flexGrow: 1, marginTop: '2vh' }} spacing={2} container direction='column' >
              <Grid item xs={12} >
                <Button variant="outlined" className='btnAgregarMaterial' onClick={() => { datosText(cantidadUsada); getMaterialUsado(); }}
                  sx={{
                    width: '60%', marginLeft: '20%', marginRight: '20%', marginTop: '2vh', backgroundColor: '', color: '#002F6C', borderRadius: '5vh', fontFamily: 'Monserrat, sans-serif',
                    fontStyle: 'regular'
                  }}>Aceptar</Button>
              </Grid>
              <Grid item xs={12} >
                <Button variant="outlined" className='btnAgregarMaterial' onClick={() => { getMaterialUsado(matUsado && matUsado.id_mantenimiento); abrirCerrarModalMu() }}
                  sx={{
                    width: '60%', marginLeft: '20%', marginRight: '20%', marginTop: '2vh', backgroundColor: '', color: '#002F6C', borderRadius: '5vh', fontFamily: 'Monserrat, sans-serif',
                    fontStyle: 'regular'
                  }}>Finalizar</Button>
              </Grid>
            </Grid>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChangeEx('panel2')} sx={{ marginLeft: '2vh', marginRight: '2vh' }} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header">
                <Typography sx={{ width: '33%', flexShrink: 0 }}>Lista de Materiales</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MaterialTable
                  title=''
                  columns={columMateriales}
                  data={rowMateriales}
                  actions={[
                    {
                      icon: CheckIcon,
                      tooltip: 'Editar',
                      onClick: (event, rowData) => { selecMat(rowData) }
                    },
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
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Paper>
      </Grid>
    </>
  );

  const bodyMantenimiento = (
    <>
      <Paper
        sx={{ ...style }}
      >
        <Grid container
          direction='row'
          justifyContent='space-evenly'
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

              }}>
              Edicion Mantenimiento
            </Typography>
          </Paper>
        </Grid>
        <Grid
          container
          direction='row'
          className='gridPrin'
          sx={{ marginTop: '0.5vh', marginBottom: '2vh' }}
          justifyContent='space-around'
          alignItems='flex-start'
        >
          <Paper
            className='cntainerPrueba'
            sx={{ width: '50%', margin: '0.2vh', borderRadius: '20px' }}
            elevation={10}>
            <Grid container item sx={{ marginBottom: '4vh', marginTop: '1.5vh' }} justifyContent='center'  >
              <Grid className='elementosForm' item sx={{ width: '90%' }} >
                <TextField select label="Mantenimiento" name='tipoMantenimiento' value={mantenimientoSeleccionado && mantenimientoSeleccionado.tipoMante}
                  onChange={handleChangeTipoMan}>
                  {tiposMantenimiento.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid className='elementosForm' item sx={{ width: '90%' }} >
                <TextField
                  select
                  label="Servicio"
                  name='servic'
                  value={mantenimientoSeleccionado && mantenimientoSeleccionado.servicio}
                  onChange={handleChangeTipoSer}>
                  {tipoServicio.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid className='elementosForm' item sx={{ width: '90%' }} >
                <TextField
                  // id="outlined-select-currency"
                  select
                  label="Área o Departamento"
                  name='areaDepart'
                  value={mantenimientoSeleccionado && mantenimientoSeleccionado.areaDepart}
                  onChange={handleChangeAreaDep}>
                  {areaDepa.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid className='elementosForm' item sx={{ width: '90%' }} >
                <TextField id="outlined-basic" label="Tipo de Servicio" variant="outlined" name='tipoServ' value={mantenimientoSeleccionado && mantenimientoSeleccionado.tipoServ} onChange={handleInputChange} />
              </Grid>
              <Grid className='elementosForm' item sx={{ width: '90%' }} >
                <TextField id="outlined-basic" label="Asignado a:" variant="outlined" name='asignado' value={mantenimientoSeleccionado && mantenimientoSeleccionado.asignado} onChange={handleInputChange} />
              </Grid>
              <Grid className='elementosForm' item sx={{ width: '90%' }} >
                <TextField
                  select
                  label="Estado del Mantenimiento"
                  name='status'
                  value={mantenimientoSeleccionado && mantenimientoSeleccionado.status}
                  onChange={handleEstadoMantenimiento}>
                  {stadoMantenimiento.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Paper>

          <Paper
            sx={{ width: '45%', margin: '0.2vh', borderRadius: '20px' }} elevation={10} >
            <Grid container sx={{ marginBottom: '4vh', marginTop: '4vh' }} justifyContent='center' >
              <Grid className='elementosForm' item sx={{ width: '96%' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Fecha en que se Realizó:"
                      inputFormat="dd/MM/yyyy"
                      value={(mantenimientoSeleccionado && mantenimientoSeleccionado.fechaRealizacion == null) ? valueRecepcion : mantenimientoSeleccionado && mantenimientoSeleccionado.fechaRealizacion}
                      onChange={handleDateRecepcion}
                      renderInput={(paramsR) => <TextField {...paramsR} disabled />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid className='elementosForms' item sx={{ width: '94%', marginTop: '2vh' }} >
                <TextField
                  id="standard-multiline-static"
                  label="Trabajo realizado"
                  multiline
                  rows={2}
                  name='trabajoRealizdo'
                  value={trabajoRealizdo}
                  onChange={handleInputChange}
                  variant="outlined" />
              </Grid>
              <Grid className='elementosForm' item sx={{ width: '96%' }} >
                <TextField id="outlined-basic" label="Lo Realizó:" variant="outlined" name='realizadoPor' value={realizadoPor} onChange={handleInputChange} />
              </Grid>
              <Grid className='elementosForm' item sx={{ width: '96%' }} >
                <TextField id="outlined-basic" label="Verificado y liberado por:" name='verificadoLiberadoPor' value={verificadoLiberadoPor} variant="outlined" onChange={handleInputChange} />
              </Grid>
              <Button className='btnAgregarMaterial' onClick={() => { abrirModal(); getMateriales(); }}
                sx={{
                  width: '90%', marginLeft: '25%', marginRight: '25%', marginTop: '2vh', backgroundColor: '', color: '#002F6C', borderRadius: '5vh', fontFamily: 'Monserrat, sans-serif',
                  fontStyle: 'regular'
                }}>Seleccionar Materiales</Button>
            </Grid>
            <Divider variant="middle" />

            <Button variant="outlined" className='btnAgregarMaterial' onClick={() => updateMantenimientoFinalizar()}
              sx={{
                width: '60%', marginLeft: '20%', marginRight: '20%', marginTop: '2vh', marginBottom: '2vh', backgroundColor: '', color: '#002F6C', borderRadius: '5vh', fontFamily: 'Monserrat, sans-serif',
                fontStyle: 'regular'
              }}>Terminar Mantenimiento</Button>
          </Paper>
        </Grid>

        <Accordion expanded={expanded === 'panel1'} onChange={handleChangeEx('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Lista de Materiales Utilizados</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MaterialTable
              title=''
              columns={columMatUsado}
              data={rowMatUsado}
              localization={{
                header: {
                  actions: 'Acciones'
                }
              }}
            />
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Modal id='body-asignacion'
        open={modalAltaMatUsado}
        onClose={abrirCerrarModalMu}>
        {bodyAsignacionMateriales}
      </Modal>

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

            }}>
            Listado de Mantenimientos
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
            onClick: (event, rowData) => { seleccion(rowData); getMaterialUsado(rowData.id) }
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          searchFieldStyle: {
            marginLeft: '60%'
          },
          exportMenu: [{
            label: 'Export PDF',
            exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Listado de Mantenimientos')
          }, {
            label: 'Export CSV',
            exportFunc: (cols, datas) => ExportCsv(cols, datas, '')
          }]

        }}
        localization={{
          header: {
            actions: 'Acciones'
          }
        }}
      />
      <Modal id='body-mantenimiento'
        open={modalVisualizar}
        onClose={abrirCerrarModalVer}>
        {bodyMantenimiento}
      </Modal>

    </>
  )
}
export default Historial;
