import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Paper, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';
// import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import PublicRoute from '../../componentes/router/PublicRoute';
import PrivateRoute from '../../componentes/router/PrivateRoute';

import { editInfoUser } from '../../actions/usuarios'
import { startLogout } from '../../actions/auth';
import { Login } from '../auth/Login';


const currencies = [
  {
    value: 'Femenino',
    label: 'Femenino',
  },
  {
    value: 'Masculino',
    label: 'Masculino',
  }
];

const roles = [
  {
    value: 'Administrador',
    label: 'Administrador'
  },
  {
    value: 'servicio social',
    label: 'Servicio Social'
  }
]


export const MiPerfil = () => {

  const [currency, setCurrency] = React.useState('');
  const [role, setRole] = React.useState('');

  const dispatch = useDispatch();
  const { id, nombre, apellidoP, apellidoM, numControl, sexo, rol } = useSelector(state => state.auth);

  const [formPerfil, setFormPerfil] = useState({
    id: id,
    nombre: nombre,
    apellidoP: apellidoP,
    apellidoM: apellidoM,
    numControl: numControl,
    rol: rol,
    sexo: sexo
  })

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrency(value);
    setFormPerfil({ ...formPerfil, sexo: value })

    console.log(value)
  };
  const handleRol = (event) => {
    const {
      target: { value },
    } = event;
    setRole(value);

    console.log(value)
  };

  const handleInputChange = ({ target }) => {
    setFormPerfil({
      ...formPerfil,
      [target.name]: target.value
    });
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    dispatch(editInfoUser(formPerfil));
    console.log(formPerfil);
  }

  const handleEditUser = () => {
    Swal.fire({
      title: '¿Guardar los cambios que realizó en su perfil?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar cambios'
    }).then((result) => {
      if (result.isConfirmed) {
        // handleSet(equipo)
        // console.log(equipBajas)
        dispatch(editInfoUser(formPerfil));
        dispatch(startLogout());
     

        // dispatch(materialStartUpdated(cardSeleccionado));
        Swal.fire(
          'Actualizado!',
          'El registro ha sido actualizado.',
          'success'
        )
        // obtenerEquipos();

      }
    })
  }

  useEffect(() => {
    // console.log(formPerfil)

  }, [])



  return (
    <>
      <form className='cardList' >
        <Grid
          container
          direction='row'
          className='gridPrin'
          sx={{ marginTop: '0.5vh', marginBottom: '2vh', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}
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
              Mi Perfil
            </Typography>
            <Divider variant="middle" />

            <Grid container sx={{ marginBottom: '8vh', marginTop: '8vh' }}
              justifyContent='center' alignItems='center'
              direction='column' className="TextField-without-border-radius"
            >
              <Grid className='elementosForm' item sx={{ width: '60%' }} >
                <TextField id="outlined-size-small" label="Nombre del Usuario" variant="outlined" size='small' focused name='nombre' value={formPerfil.nombre} onChange={handleInputChange} />
              </Grid>
              <Grid className='elementosForm' item sx={{ width: '60%', marginTop: '3vh' }} >
                <TextField id="outlined-size-small" label="Apellido Paterno" variant="outlined" size='small' focused name='apellidoP' value={formPerfil.apellidoP} onChange={handleInputChange} />
              </Grid>
              <Grid className='elementosForm' item sx={{ width: '60%', marginTop: '3vh' }} >
                <TextField id="outlined-size-small" label="Apellido Materno" variant="outlined" size='small' focused name='apellidoM' value={formPerfil.apellidoM} onChange={handleInputChange} />
              </Grid>
              <Grid className='elementosForm' item sx={{ width: '60%', marginTop: '3vh' }} >
                <TextField id="outlined-size-small" label="Numero de control" variant="outlined" size='small' focused name='numControl' value={formPerfil.numControl} onChange={handleInputChange} />
              </Grid>
              <Grid className='elementosForm' item sx={{ width: '60%', marginTop: '3vh' }} >
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Sexo"
                  value={formPerfil.sexo}
                  onChange={handleChange}
                  focused
                  name='sexo'
                  size='small'
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid className='elementosForm' item sx={{ width: '60%', marginTop: '3vh' }} >
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Rol de Usuario"
                  value={rol}
                  onChange={handleRol}
                  focused
                  size='small'
                  disabled
                  name='rol'
                // placeholder='Seleccionar'
                // helperText="Sexo"
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Button variant="outlined" size='large' className='btnGC' onClick={() => { handleEditUser() }}
                sx={{
                  marginTop: '4vh',
                  color: '#002F6C', borderRadius: '5vh',
                  // fontWeight: 560, 
                  letterSpacing: '0.5vh',
                  fontFamily: 'Monserrat, sans-serif',
                  fontStyle: 'regular'
                }}>Guardar Cambios</Button>
            </Grid>
          </Paper>
        </Grid>
      </form>


    </>
  )
}
export default MiPerfil;

