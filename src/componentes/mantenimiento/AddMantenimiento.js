import { Container, Grid, Paper, Stack, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../inventario/Menu.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { mantenimientoStartAddNew } from '../../actions/mantenimiento'

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) == -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

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
export const AddMantenimiento = () => {
  const rutaImg = "/img/encabezado.jpg";
  const rutaImgDos = "/img/piePagina.jpg";


  const theme = useTheme();
  const dispatch = useDispatch();

  const [personName, setPersonName] = React.useState([]);
  const [tipoMantenimiento, setTipoMantenimiento] = useState('');
  const [servic, setServic] = useState('');
  const [areaDepartamento, setAreaDepartamento] = useState('');
  //FECHAS

  const [value, setValue] = React.useState(new Date());
  const [valueRecepcion, setValueRecepcion] = React.useState(new Date());
  const { id, rol } = useSelector(state => state.auth);

  const [formMantenimiento, setFormMantenimiento] = useState({
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
    user_idM: id,
    rol: rol,
    status: 'Pendiente'
  })

  const { tipoMante,
    servicio,
    areaDepart,
    tipoServ,
    asignado } = formMantenimiento;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value == 'string' ? value.split(',') : value,
    );
  };
  const handleFechas = (newValue) => {
    setValue(newValue);
  };

  const handleDateRecepcion = (newValue) => {
    setValueRecepcion(newValue);
  }

  const handleChangeTipoMan = (event) => {
    const {
      target: { value },
    } = event;
    setTipoMantenimiento(value);
    setFormMantenimiento({ ...formMantenimiento, tipoMante: value })
    console.log(value)
  };
  const handleChangeTipoSer = (event) => {
    const {
      target: { value },
    } = event;
    setServic(value);
    setFormMantenimiento({ ...formMantenimiento, servicio: value })
    console.log(value)
  };
  const handleChangeAreaDep = (event) => {
    const {
      target: { value },
    } = event;
    setAreaDepartamento(value);
    setFormMantenimiento({ ...formMantenimiento, areaDepart: value })
    console.log(value)
  };
  const handleInputChange = ({ target }) => {
    setFormMantenimiento({
      ...formMantenimiento,
      [target.name]: target.value
    });
  }
  const limpiaCampos = () => {
    setFormMantenimiento({
      tipoMante: '',
      servicio: '',
      areaDepart: '',
      tipoServ: '',
      asignado: '',
      user_idM: id,
      rol: rol,
      status: 'Pendiente'
    })
    setTipoMantenimiento('')
    setServic('')
    setAreaDepartamento('')


  }


  const handleSubmitForm = (e) => {
    e.preventDefault();

    dispatch(mantenimientoStartAddNew(formMantenimiento));
    generatePDF(formMantenimiento)
    // console.log('PRUEBA',formMantenimiento.tipoMante)
    limpiaCampos();
    // console.log(formEquipos);
  }
  const generatePDF = (valor) => {
    const { tipoMante, servicio, areaDepart, tipoServ, asignado, fechaRealizacion,
      trabajoRealizdo,
      materialUtilizado,
      realizadoPor,
      verificadoLiberadoPor,
      vistoBuenoSolicitante } = valor

    let x = 0;
    let y = 0;

    const doc = new jsPDF('p', 'mm', 'letter');

    var logo = new Image();
    logo.src = "../img/encabezado.JPG";
    doc.addImage(logo, 'JPEG', 30, 10, 150, 20)
    doc.text("ORDEN DE TRABAJO DE MANTENIMIENTO", 50, 40);

    const tableColumn = [{ title: "", dataKey: 'reporteM' }];
    const reporte = [
      { reporteM: `Mantenimiento: ${tipoMante}` },
      { reporteM: `Servicio: ${servicio}` },
      { reporteM: `Área o Departamento: ${areaDepart} ` },
      { reporteM: `Tipo de Servicio: ${tipoServ}` },
      { reporteM: `Asignado a: ${asignado}` },
      { reporteM: `Fecha de Realización: ${fechaRealizacion}` },
      { reporteM: `Trabajo Realizado: ${trabajoRealizdo}` },
      { reporteM: `Materiales utilizados ${materialUtilizado}` },
      { reporteM: `Realizó: ${'VICTOR MANUEL ROMERO JUAREZ'}`, },
      { reporteM: `Verificado y Liberado por:${verificadoLiberadoPor}`, },
      { reporteM: `Vo. Bo. Solicitante:${vistoBuenoSolicitante}`, p: `Firma                             ` },
    ]
    doc.autoTable(tableColumn, reporte, {
      startY: 50,
      theme: 'grid',
      columnStyles: {
        0: { cellWidth: '50%' },
        1: { cellWidth: '50%', cellHeight: '40' }
      },
      headerStyles: { fillColor: 'red' },
      styles: { overflow: 'linebreak', cellWidth: '50%', font: 'arial', fontSize: 10, cellPadding: 4, overflowColumns: 'linebreak', halign: 'left' },
    });

    var piePag = new Image();
    piePag.src =  "../img/piePagina.JPG";
    doc.addImage(piePag, 'JPEG', 20, 240, 180, 40)

    doc.save(`reporte.pdf`);
    console.log('METODO', tipoMante, servicio, areaDepart, tipoServ, asignado)
  }
  return (
    <>
      <Paper className='bodyPaper' elevation={0} >

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
              }}
            >
              Nuevo Mantenimiento
            </Typography>
          </Paper>
        </Grid>

        <form onSubmit={handleSubmitForm} >
          <Grid
            container
            direction='row'
            className='gridPrin'
            sx={{ marginTop: '0.5vh', marginBottom: '2vh' }}
            justifyContent="space-around"
            alignItems='center'
          >
            <Paper
              className='cntainerPrueba'
              sx={{ width: '50%', margin: '0.2vh', borderRadius: '20px' }}
              elevation={10}
            >
              <Grid container item sx={{ marginBottom: '4vh', marginTop: '1.5vh' }} justifyContent='center' alignItems='center'>
                <Grid className='elementosForm' item sx={{ width: '90%' }} >
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Mantenimiento"
                    value={tipoMantenimiento}
                    onChange={handleChangeTipoMan}
                  // placeholder='Seleccionar'
                  // helperText="Seleccione el periodo de mantenimiento"
                  >
                    {tiposMantenimiento.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid className='elementosForm' item sx={{ width: '90%' }} >
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Servicio"
                    value={servic}
                    onChange={handleChangeTipoSer}>
                    {tipoServicio.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid className='elementosForm' item sx={{ width: '90%' }} >
                <TextField id="outlined-basic" label="Area o departamento" variant="outlined" name='areaDepart' value={areaDepart} onChange={handleInputChange} />

                  {/* <TextField
                    id="outlined-select-currency"
                    select
                    label="Área o Departamento"
                    value={areaDepartamento}
                    onChange={handleChangeAreaDep}>
                    {areaDepa.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField> */}
                </Grid>
                <Grid className='elementosForm' item sx={{ width: '90%' }} >
                  <TextField id="outlined-basic" label="Tipo de Servicio" variant="outlined" name='tipoServ' value={tipoServ} onChange={handleInputChange} />
                </Grid>
                <Grid className='elementosForm' item sx={{ width: '90%' }} >
                  <TextField id="outlined-basic" label="Asignado a:" variant="outlined" name='asignado' value={asignado} onChange={handleInputChange} />
                </Grid>
              </Grid>
              <Button variant="outlined" className='btnAgregarMaterial' type='submit'
                sx={{
                  width: '50%',
                  marginLeft: '25%', marginRight: '25%',
                  marginBottom: '4vh',
                  // margin: '2vh',
                  backgroundColor: '', color: '#002F6C', borderRadius: '5vh',
                  fontFamily: 'Monserrat, sans-serif',
                  fontStyle: 'regular'
                }}>Aceptar</Button>
            </Paper>
          </Grid>
        </form>

      </Paper>
    </>
  )
}
export default AddMantenimiento;