import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField, Stack } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fetchConToken } from '../../helpers/fetch';
import MenuItem from '@mui/material/MenuItem';


const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,

  borderRadius: '20px'
};
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

export const PendientesMantenimiento = () => {
  const [cardData, setCardData] = useState([]);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [cardSeleccionado, setCardSeleccionado] = useState();
  const [value, setValue] = React.useState(new Date());
  const [valueRecepcion, setValueRecepcion] = React.useState(new Date());

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
    console.log(value)
  };
  const handleChangeTipoSer = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value)
  };
  const handleChangeAreaDep = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value)
  };

  const seleccion = (mat) => {
    setCardSeleccionado(mat)
    abrirCerrarModalVer()
  }

  const obtenMantenimientos = async () => {

    const resp = await fetchConToken('mantenimiento');
    const { mantenimiento } = await resp.json();

    setCardData(mantenimiento.map(b => ({
      id: b.id,
      tipoMante: b.tipoMante,
      servicio: b.servicio,
      areaDepart: b.areaDepart,
      tipoServ: b.tipoServ,
      asignado: b.asignado,
      fechaRealizacion: b.fechaRealizacion,
      trabajoRealizdo: b.trabajoRealizdo,
      realizadoPor: b.realizadoPor,
      verificadoLiberadoPor: b.verificadoLiberadoPor,
      vistoBuenoSolicitante: b.vistoBuenoSolicitante,
      user_idM: b.user_idM,
      status: b.status,
    })))
  }

  const abrirCerrarModalVer = () => {
    setModalVisualizar(!modalVisualizar);
  }

  useEffect(() => {
    obtenMantenimientos()
  }, [])

  const bodyVerMantenimiento = (
    <>
      <Grid
        container
        direction='row'
        className='gridPrin'
        sx={{ ...style, marginTop: '0.5vh', marginBottom: '2vh' }}
        justifyContent="space-around"
        alignItems='center'
      >
        <Paper
          className='cntainerPrueba'
          sx={{ width: '50%', margin: '0.2vh', borderRadius: '20px', width: '100%' }}
          elevation={10}
        >
          <Grid container item sx={{ marginBottom: '4vh', marginTop: '1.5vh' }} justifyContent='center' alignItems='center'>
            <Grid className='elementosForm' item sx={{ width: '90%' }} >
              <TextField
                id="outlined-select-currency"
                select
                label="Mantenimiento"
                value={(cardSeleccionado && cardSeleccionado.tipoMante == null) ? '' : cardSeleccionado && cardSeleccionado.tipoMante}
                // onChange={handleChangeTipoMan}
                disabled
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
                value={(cardSeleccionado && cardSeleccionado.servicio == null) ? '' : cardSeleccionado && cardSeleccionado.servicio}
                // onChange={handleChangeTipoSer}
                disabled
              >
                {tipoServicio.map((option) => (
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
                label="Área o Departamento"
                value={(cardSeleccionado && cardSeleccionado.areaDepart == null) ? '' : cardSeleccionado && cardSeleccionado.areaDepart}
                // onChange={handleChangeAreaDep} 
                disabled
              >
                {areaDepa.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '90%' }} >
              <TextField id="outlined-basic" label="Tipo de Servicio" variant="outlined" name='tipoServ' value={(cardSeleccionado && cardSeleccionado.tipoServ == null) ? '' : cardSeleccionado && cardSeleccionado.tipoServ} disabled />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '90%' }} >
              <TextField id="outlined-basic" label="Asignado a:" variant="outlined" name='asignado' value={(cardSeleccionado && cardSeleccionado.asignado == null) ? '' : cardSeleccionado && cardSeleccionado.asignado} disabled />
            </Grid>
          </Grid>
          <Button variant="outlined" className='btnAgregarMaterial' onClick={()=>abrirCerrarModalVer()}
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
    </>
  );
  return (
    <>
      <Paper sx={{ borderRadius: '20px', margin: '2vh' }} elevation={10} >
        {cardData.map(mantenim => {
          if (mantenim.status == 'Pendiente') {
            return <Card key={mantenim.id} variant="outlined" sx={{ display: 'flex', borderRadius: '20px', marginTop: '2vh', marginBottom: '2vh', marginLeft: '2vh', marginRight: '2vh' }}  >
              <Grid
                container
                direction='row'
                justifyContent="space-between"
                alignItems="center"
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="body2">
                      Esta pendiente el mantenimiento de {mantenim.areaDepart}
                    </Typography>

                  </CardContent>
                </Box>
                <CardActions sx={{ marginRight: '5vh' }}>
                  <Button variant="outlined" sx={{ margin: '2vh' }} onClick={() => seleccion(mantenim)} >Ver</Button>
                  {/* <Button variant="outlined" color='error' >Eliminar</Button> */}
                </CardActions>
              </Grid>
            </Card>
          }
        })
        }
      </Paper>

      <Modal
        open={modalVisualizar}
        onClose={abrirCerrarModalVer}>
        {bodyVerMantenimiento}
      </Modal>


    </>
  )
}
export default PendientesMantenimiento;
