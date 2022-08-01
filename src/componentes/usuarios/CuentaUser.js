import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Paper, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { fetchConToken } from '../../helpers/fetch';

import './Components/MenuBar.css'


export const CuentaUser = () => {
  const { id } = useSelector(state => state.auth);
  const [user, setUser] = useState({
    email:'',
    password:''
  })


  const getInfo = async () => {
    const resp = await fetchConToken(`events/${id}`);
    const { usuario } = await resp.json();
    setUser(usuario);

    console.log(usuario)
  }
  useEffect(() => {
    getInfo()
    // dispatch(herramientaStartLoaded());
    // obtenerHerra();
    // funciones();

  }, [])


  return (
    <>
      <form className='formCuenta'>
        <Grid
          container
          direction='row'
          className='cuentUser'
          sx={{ marginTop: '0.5vh', marginBottom: '2vh', width: '70%',
        marginLeft:'auto', marginRight:'auto' }}
          justifyContent='space-around'
          alignItems='flex-start'
        >
          <Paper
            sx={{ width: '100%', margin: '0.2vh', borderRadius: '20px' }}
            elevation={10}
          >
            <Typography variant='h1' component='div' align='center'
              sx={{
                fontFamily: 'Monserrat, sans-serif',
                fontWeight: 400,
                fontStyle: 'regular',
                color: '#002F6C',
                fontSize: '2rem',
                letterSpacing: '1vh',
                marginTop: '2vh',
                marginBottom: '2vh',
              }}
            >
              Mi Cuenta
            </Typography>
            <Divider variant="middle" />

            <Grid container sx={{ marginBottom: '8vh', marginTop: '8vh' }} justifyContent='center' alignItems='center'
              direction='column' className="TextField-without-border-radius"
            >
              <Grid container  item sx={{ width: '80%' }} direction='column'>
                <Typography sx={{ fontFamily: 'Monserrat, sans-serif', fontWeight: 400, fontStyle: 'regular', color: '#002F6C', fontSize: '2.5vh', marginBottom: '1vh' }}>
                  Correo electronico
                </Typography>
                <TextField id="outlined-basic" variant="outlined" size='small' name='email' focused disabled value={user.email} />
              </Grid>

              <Grid sx={{ width: '80%' }} container direction='column' justifyContent="right" alignItems="right">

                <Typography sx={{ fontFamily: 'Monserrat, sans-serif', fontWeight: 400, fontStyle: 'regular', color: '#002F6C', fontSize: '2.5vh' }}>
                  Contraseña
                </Typography>

                {/* <Grid direction='row' justifyContent='center' alignItems='center'> */}
                <Grid item sx={{ width: '100%' }}>
                  <TextField id="outlined-size-small" variant="outlined" size='small' focused type='password' name='password' disabled value={user.password} />
                </Grid>
                <Grid item >
                  <Button variant="outlined" type='submit' size='large'
                    sx={{
                      fontSize: '2vh',
                      marginTop: '1vh',
                      marginBottom: '1vh',
                      color: '#002F6C', borderRadius: '5vh',
                      // fontWeight: 560, 
                      // letterSpacing: '0.5vh',
                      fontFamily: 'Monserrat, sans-serif',
                      fontStyle: 'regular'
                    }}>Cambiar Contraseña</Button>
                </Grid>
                {/* </Grid> */}
              </Grid>


            </Grid>
          </Paper>
        </Grid>

      </form>

    </>
  )
}
export default CuentaUser;
