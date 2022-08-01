
import React, { useEffect, useState } from 'react'
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



const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  
  borderRadius: '20px'
};
export const Notificaciones = () => {

  const [cardData, setCardData] = useState([]);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [cardSeleccionado, setCardSeleccionado] = useState({
    nombreM: ''
  })

  const [value, setValue] = React.useState(new Date());

  const [valueRecepcion, setValueRecepcion] = React.useState(new Date());

  const handleFechas = (newValue) => {
    setValue(newValue);
  };

  const handleDateRecepcion = (newValue) => {
    setValueRecepcion(newValue);
  }

  const seleccion = (mat) => {
    setCardSeleccionado(mat)
    abrirCerrarModalVer()
  }


  const obtenerMateriales = async () => {
    const resp = await fetchConToken('materiales');
    const { material } = await resp.json();

    setCardData(material.map(b => ({
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
      user_idm: b.user_idm
    })))
  }

  const abrirCerrarModalVer = () => {
    setModalVisualizar(!modalVisualizar);
  }

  useEffect(() => {
    obtenerMateriales()

  }, [])


  const bodyVisualizar = (
    <>
      <Grid
        sx={{ ...style, marginTop: '1vh', marginBottom: '2vh' }}
        container
        direction='row'
        justifyContent='space-around'
        alignItems='flex-start'
      >
        <Paper className='cntainerPrueba'
          sx={{ width: '100%', margin: '2vh', borderRadius: '20px' }}
          elevation={10}>
          <Grid container item sx={{ marginBottom: '4vh', marginTop: '1.5vh' }} justifyContent="center">

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField disabled label='Nombre Material' name='nombreM' value={cardSeleccionado && cardSeleccionado.nombreM} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField disabled label='Tipo de Material'  name='nombreM' value={cardSeleccionado && cardSeleccionado.tipoM} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField disabled label='Cantidad de Material'  name='nombreM' value={cardSeleccionado && cardSeleccionado.cantidadM} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField disabled label='Codigo de Material'  name='nombreM' value={cardSeleccionado && cardSeleccionado.codigoM} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '80%' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    disabled
                    label="Fecha de recepción:"
                    inputFormat="dd/MM/yyyy"
                    value={cardSeleccionado&&cardSeleccionado.fechaIngreso}
                    onChange={handleDateRecepcion}
                    renderInput={(paramsR) => <TextField {...paramsR} disabled />}
                  />
                </Stack>
              </LocalizationProvider>
              {/* <TextField id="outlined-basic" label="Fechad de recepción" variant="outlined" /> */}
            </Grid>

            <Button variant="outlined" 
            sx={{
              width:'50%',
              margin: '2vh',
              backgroundColor: '', color: '#002F6C', borderRadius: '5vh',
              fontFamily: 'Monserrat, sans-serif',
              fontStyle: 'regular'
            }} onClick={() => abrirCerrarModalVer()} >Regresar</Button>

          </Grid>

        </Paper>

      </Grid>


    </>
  )



  return (
    <>
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
            Material por agotarse
          </Typography>
        </Paper>
      </Grid>

      {cardData.map(mate => {
        // console.log(mate)
        if (mate.cantidadM < 5) {
          return <Card key={mate.id} variant="outlined"
            sx={{ display: 'flex', borderColor: 'red', borderRadius: '20px', marginTop: '2vh', marginLeft: '2vh', marginRight: '2vh' }}  >
            <Grid
              container
              direction='row'
              justifyContent="space-between"
              alignItems="center"
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ marginLeft: '10vh' }}>
                  <Typography variant="body2">
                    {mate.nombreM}
                  </Typography>
                </CardContent>
              </Box>
              <CardContent >
                <Typography variant="body2">
                  Quedan {mate.cantidadM} piezas
                </Typography>
              </CardContent>

              <Grid>
                <CardActions sx={{ marginRight: '5vh' }}>
                  <Button variant="outlined" sx={{ margin: '2vh' }} onClick={() => seleccion(mate)} >Ver</Button>
                  <Button variant="outlined" color='error' >Eliminar</Button>
                </CardActions>
              </Grid>
            </Grid>
          </Card>

        }
      })}

      <Modal
        open={modalVisualizar}
        onClose={abrirCerrarModalVer}>
        {bodyVisualizar}
      </Modal>

    </>
  );
}
export default Notificaciones;
