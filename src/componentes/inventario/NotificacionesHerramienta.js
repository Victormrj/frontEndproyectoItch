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


export const NotificacionesHerramienta = () => {

  const [cardData, setCardData] = useState([]);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [cardSeleccionado, setCardSeleccionado] = useState({
    nombreH: ''
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
    console.log(mat.id)
    abrirCerrarModalVer()
  }

  const obtenerHerramientas = async () => {
    const resp = await fetchConToken('herramientas');
    const { herramienta } = await resp.json();

    setCardData(herramienta.map(b => ({
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
      user_id: b.user_id
    })))
  }

  const abrirCerrarModalVer = () => {
    setModalVisualizar(!modalVisualizar);
  }

  useEffect(() => {
    obtenerHerramientas()

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
              <TextField disabled label='Nombre Herramienta' name='nombreH' value={cardSeleccionado && cardSeleccionado.nombreH} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField disabled label='Tipo de Herramienta' name='tipoH' value={cardSeleccionado && cardSeleccionado.tipoH} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField disabled label='Cantidad de Herramienta' name='cantidad' value={cardSeleccionado && cardSeleccionado.cantidad} />
            </Grid>
            <Grid className='elementosForm' item sx={{ width: '48%' }}  >
              <TextField disabled label='Codigo de Herramienta' name='codigo' value={cardSeleccionado && cardSeleccionado.codigo} />
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
                width: '50%',
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
      <Paper sx={{ borderRadius: '20px', margin: '2vh' }} elevation={10} >
        <Grid container
          direction='row'
          justifyContent='space-around'
          alignItems='center'
          sx={{ paddingBottom: '2vh' }}
        >

          {cardData.map(mate => {
            // console.log(mate)
            if (mate.cantidad <= 5) {
              return <Card key={mate.id} variant="outlined"
                sx={{ display: 'flex', borderRadius: '20px', borderColor: 'red', marginTop: '2vh', marginBottom: '2vh', width: '90%' }}  >
                <Grid
                  container
                  direction='row'
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}  >
                      <Typography variant="body2"
                        sx={{
                          fontFamily: 'Monserrat, sans-serif',
                          fontWeight: 400,
                          fontStyle: 'regular',
                          color: '#002F6C',
                          fontSize: '1.5rem',
                          letterSpacing: '1vh',
                          textTransform: 'uppercase'
                          // marginTop: '2vh',
                          // marginBottom: '2vh',

                        }}>
                        {mate.nombreH}

                      </Typography>

                    </CardContent>
                  </Box>
                  <CardContent sx={{ flex: '0 1 auto' }}>
                    <Typography variant="body2"
                      sx={{
                        fontFamily: 'Monserrat, sans-serif',
                        fontWeight: 600,
                        fontStyle: 'regular',
                        color: '#002F6C',
                        fontSize: '1.5rem',
                        letterSpacing: '1vh',
                        textTransform: 'uppercase'

                        // marginTop: '2vh',
                        // marginBottom: '2vh',

                      }}>
                      Quedan {mate.cantidad} píezas
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
        </Grid>


      </Paper>

      <Modal
        open={modalVisualizar}
        onClose={abrirCerrarModalVer}>
        {bodyVisualizar}
      </Modal>



    </>
    // <div>AlmacenNotificaciones</div>
  )
}
export default NotificacionesHerramienta;
