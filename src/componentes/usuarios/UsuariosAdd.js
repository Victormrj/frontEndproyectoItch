import React, { useState, useEffect } from 'react'
import { Container, Grid, Paper, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'; import 'moment-timezone';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import { usuarioStartAddNew } from '../../actions/usuarios';
import './Components/MenuBar.css'

const currencies = [
  {
    value: 'Masculino',
    label: 'Masculino',
  },
  {
    value: 'Femenino',
    label: 'Femenino',
  }
];

const roles = [
  {
    value: 'Administrador',
    label: 'Administrador',
  },
  {
    value: 'servicio social',
    label: 'Servicio Social',
  }
];



export const UsuariosAdd = () => {

  const dispatch = useDispatch();

  const [currency, setCurrency] = React.useState('');
  const [role, setRole] = React.useState('');
  const { rol } = useSelector(state => state.auth);


  const [formUser, setFormUser] = useState({
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    numControl: '',
    sexo: '',
    email: '',
    password: '',
    rol: '',
    estado: 'Activo',
    role: rol

  })

  const { nombre,
    apellidoP,
    apellidoM,
    numControl,
    email,
    password,
  } = formUser;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrency(value);

    setFormUser({ ...formUser, sexo: value })
    // console.log(value)
  };

  const handleRol = (event) => {
    const {
      target: { value },
    } = event;
    setRole(value);
    setFormUser({ ...formUser, rol: value })

    // console.log(value)
  };

  const handleInputChange = ({ target }) => {
    setFormUser({
      ...formUser,
      [target.name]: target.value
    });
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    dispatch(usuarioStartAddNew(formUser));
    console.log(formUser);

  }


  return (
    <>
      <Grid
      >
        <Grid
          container
          direction='row'
          justifyContent='space-around'
          alignItems='center'

        >
          <Paper sx={{
            width: '100%', margin: '2vh', borderRadius: '15px',
            alignItems: 'center', justifyContent: 'space-around'
          }} elevation={10}>
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
              Alta de Usuario
            </Typography>
          </Paper>
        </Grid>


        <form className='userAdd' onSubmit={handleSubmitForm}>
          <Grid
            container
            direction='row'
            className='gridPrin'
            sx={{
              marginTop: '1vh', marginBottom: '2vh', width: '60%',
              marginLeft: 'auto', marginRight: 'auto'
            }}
            justifyContent="space-around"
            alignItems="flex-start">
            <Paper
              className='cntainerPrueba'
              sx={{ width: '100%', margin: '0.2vh', borderRadius: '20px' }}
              elevation={10}
            >
              <Grid container item sx={{ marginBottom: '5vh', marginTop: '5vh', width: '100%' }} 
              justifyContent="center" className="TextField-without-border-radius">

                <Grid className='elementosForm' item sx={{ width: '60%' }}>
                  <TextField label="Nombre" name='nombre' variant="outlined" size='small' value={nombre} onChange={handleInputChange} />
                </Grid>

                <Grid className='elementosForm' item sx={{ width: '60%' }}>
                  <TextField label="Apellido Paterno :" name='apellidoP' variant="outlined" size='small' value={apellidoP} onChange={handleInputChange} />
                </Grid>

                <Grid className='elementosForm' item sx={{ width: '60%' }}>
                  <TextField label="Apellido Materno" name='apellidoM' variant="outlined" size='small' value={apellidoM} onChange={handleInputChange} />
                </Grid>

                <Grid className='elementosForm' item sx={{ width: '60%' }}>
                  <TextField label="Numero de control" name='numControl' variant="outlined" size='small' value={numControl} onChange={handleInputChange} />
                </Grid>

                <Grid className='elementosForm' item sx={{ width: '60%' }}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Sexo"
                    value={currency}
                    onChange={handleChange}
                    size='small'
                    name='sexo'
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {/* <TextField id="outlined-basic" label="Nombre :" name='tipoH' variant="outlined" size='small'/> */}
                </Grid>

                <Grid className='elementosForm' item sx={{ width: '60%' }}>
                  <TextField label="Email" name='email' variant="outlined" size='small' value={email} onChange={handleInputChange} />
                </Grid>

                <Grid className='elementosForm' item sx={{ width: '60%' }}>
                  <TextField label="Contraseña" name='password' variant="outlined" size='small' type='password' value={password} onChange={handleInputChange} />
                </Grid>

                <Grid className='elementosForm' item sx={{ width: '60%' }}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Seleccione un Rol de usuario"
                    value={role}
                    onChange={handleRol}
                    size='small'
                    name='rol'>
                    {roles.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Button variant="outlined" type='submit' size='large' className='btnGC'
                  sx={{
                    marginTop: '4vh',
                    color: '#002F6C', borderRadius: '5vh',
                    // fontWeight: 560, 
                    letterSpacing: '0.5vh',
                    fontFamily: 'Monserrat, sans-serif',
                    fontStyle: 'regular'
                  }}>Agregar Usuario</Button>
              </Grid>
            </Paper>
          </Grid>
        </form>
      </Grid>
    </>
  )
}

export default UsuariosAdd;