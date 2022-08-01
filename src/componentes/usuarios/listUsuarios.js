import React, { useEffect, useState } from 'react'
import List from './Components/List';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';
import Swal from 'sweetalert2';
import Modal from '@mui/material/Modal';
import moment from 'moment'; import 'moment-timezone';
import { Container, Stack, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchConToken } from '../../helpers/fetch';

import { usuarioStartUpdated, usuarioStartLoaded, usuarioStartDeleted } from '../../actions/usuarios'
import './Components/MenuBar.css'
import { useInRouterContext } from 'react-router-dom';
import './css/card.css';
// import './css/swiper-bundle.min.css';
import './js/script.js';
// import './js/swiper-bundle.min.js';

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

export const ListUsuarios = () => {
  const rutaImg = "/img/LOGO-IT-CHILPANCINGO.jpg";
  const dispatch = useDispatch();


  const styleCard = {
    borderRadius: '25px',
    boxShadow: ' 0 4px 8px  #1E477A, 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
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
    height: 'auto',
    // display: 'block'
  };


  const [cardData, setCardData] = useState([]);
  const { id, rol } = useSelector(state => state.auth);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [modalDeleted, setModalDeleted] = useState(false);
  const [currency, setCurrency] = React.useState('');
  const [role, setRole] = React.useState('');




  const [cardSeleccionado, setCardSeleccionado] = useState({
    id: '',
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    numControl: '',
    sexo: '',
    email: '',
    estado: '',
    // password: '',
    rol: '',
    rolUsu: rol
  })
  const [carDeleted, setCardDeleted] = useState({
    id: '',
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    numControl: '',
    sexo: '',
    email: '',
    estado: '',
    // password: '',
    rol: '',
    rolUsu: rol
  })


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrency(value);
    setCardSeleccionado({ ...cardSeleccionado, sexo: value })

    // console.log(value)
  };

  const handleRol = (event) => {
    const {
      target: { value },
    } = event;
    setRole(value);
    setCardSeleccionado({ ...cardSeleccionado, rol: value })
    // console.log(value)
  };


  const getUser = async () => {
    const resp = await fetchConToken('events');
    const { usuarios } = await resp.json();
    setCardData(usuarios.map(user => ({
      id: user.id,
      nombre: user.nombre,
      apellidoP: user.apellidoP,
      apellidoM: user.apellidoM,
      numControl: user.numControl,
      sexo: user.sexo,
      email: user.email,
      // password: user.password,
      rol: user.rol,
      estado: user.estado,
      rolUsu: rol
    })))

    // console.log(usuarios)
  }
  const abrirCerrarModalVer = () => {
    setModalVisualizar(!modalVisualizar);
    getUser();
  }

  const abrirCerrarModalDeleted = () => {
    setModalDeleted(!modalDeleted);
    getUser();
  }
  const seleccion = (mat) => {
    setCardSeleccionado(mat)
    abrirCerrarModalVer()
  }
  const selecDeleted = (use) => {
    console.log('first')
    setCardDeleted({ ...use, estado: 'Baja' });
    abrirCerrarModalDeleted();
    // console.log(cardSeleccionado)
  }



  const handleInputChange = ({ target }) => {
    setCardSeleccionado({
      ...cardSeleccionado,
      [target.name]: target.value
    });
  }

  useEffect(() => {
    dispatch(usuarioStartLoaded());
    getUser()

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
        dispatch(usuarioStartUpdated(cardSeleccionado))
        getUser();

        // console.log(cardSeleccionado)
        // setCardData(cardSeleccionado)
        Swal.fire(
          'Actualizado!',
          'El registro ha sido actualizado.',
          'success'
        )

      }
    })
    abrirCerrarModalVer();
  }



  const handleDelete = () => {
    abrirCerrarModalDeleted()
    // console.log(usuario)
    // setCardData({...user,estado:'Baja'})

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
        dispatch(usuarioStartUpdated(carDeleted))
        // dispatch(usuarioStartDeleted(user))

        Swal.fire(
          'Eliminado!',
          'El registro ha sido borrado.',
          'success'
        )
        getUser();

      }
    })
    // console.log('ROW: ', equipoSeleccionado)
  }


  const bodyDeleted = (
    <>
      <Grid
        container
        direction='row'
        className='gridPrin'
        sx={{ ...style, marginTop: '1vh', marginBottom: '2vh' }}
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Paper
          className='cntainerPrueba'
          sx={{ width: '100%', margin: '0.2vh', borderRadius: '20px', marginBottom: '4vh', marginTop: '2vh' }}
          elevation={10}
        >
          <Grid container item sx={{ marginBottom: '5vh', marginTop: '5vh', width: '100%' }} justifyContent="center"
            className="TextField-without-border-radius">

            <Grid className='elementosForm' item sx={{ width: '60%' }}>
              <TextField id="outlined-basic" label="Nombre" name='nombre' variant="outlined" size='small' value={carDeleted && carDeleted.nombre} onChange={handleInputChange} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '60%' }}>
              <TextField id="outlined-basic" label="Apellido Paterno :" name='apellidoP' variant="outlined" size='small' value={carDeleted && carDeleted.apellidoP} onChange={handleInputChange} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '60%' }}>
              <TextField id="outlined-basic" label="Apellido Materno" name='apellidoM' variant="outlined" size='small' value={carDeleted && carDeleted.apellidoM} onChange={handleInputChange} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '60%' }}>
              <TextField id="outlined-basic" label="Numero de control" name='numControl' variant="outlined" size='small' value={carDeleted && carDeleted.numControl} onChange={handleInputChange} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '60%' }}>
              <TextField
                id="outlined-select-currency"
                select
                label="Sexo"
                name='sexo'
                value={carDeleted && carDeleted.sexo}
                onChange={handleChange}
                size='small'
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
              <TextField id="outlined-basic" label="Email" name='email' variant="outlined" size='small' value={carDeleted && carDeleted.email} />
            </Grid>

            {/* <Grid className='elementosForm' item sx={{ width: '60%' }}>
              <TextField id="outlined-basic" label="Contraseña" name='password'
                variant="outlined" size='small' type='password' value={cardSeleccionado && cardSeleccionado.password} />
            </Grid> */}

            <Grid className='elementosForm' item sx={{ width: '60%' }}>
              <TextField
                id="outlined-select-currency"
                select
                label="Seleccione un Rol de usuario"
                value={carDeleted && carDeleted.rol}
                onChange={handleRol}
                size='small'
                name='rol'
              // placeholder='Seleccionar'
              // helperText="Seleccione el periodo de mantenimiento"
              >
                {roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {/* <TextField id="outlined-basic" label="Nombre :" name='tipoH' variant="outlined" size='small'/> */}
            </Grid>
            <Button variant="outlined" size='large' className='btnGC' onClick={() => handleDelete()}
              sx={{
                marginTop: '4vh',
                color: '#002F6C', borderRadius: '5vh',
                // fontWeight: 560, 
                letterSpacing: '0.5vh',
                fontFamily: 'Monserrat, sans-serif',
                fontStyle: 'regular'
              }}>Dar de baja usuarios</Button>

          </Grid>
        </Paper>

      </Grid>

    </>
  )

  const bodyVisualizar = (
    <>
      <Grid
        container
        direction='row'
        className='gridPrin'
        sx={{ ...style, marginTop: '1vh', marginBottom: '2vh' }}
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Paper
          className='cntainerPrueba'
          sx={{ width: '100%', margin: '0.2vh', borderRadius: '20px', marginBottom: '4vh', marginTop: '2vh' }}
          elevation={10}
        >
          <Grid container item sx={{ marginBottom: '5vh', marginTop: '5vh', width: '100%' }} justifyContent="center"
            className="TextField-without-border-radius">

            <Grid className='elementosForm' item sx={{ width: '60%' }}>
              <TextField id="outlined-basic" label="Nombre" name='nombre' variant="outlined" size='small' value={cardSeleccionado && cardSeleccionado.nombre} onChange={handleInputChange} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '60%' }}>
              <TextField id="outlined-basic" label="Apellido Paterno :" name='apellidoP' variant="outlined" size='small' value={cardSeleccionado && cardSeleccionado.apellidoP} onChange={handleInputChange} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '60%' }}>
              <TextField id="outlined-basic" label="Apellido Materno" name='apellidoM' variant="outlined" size='small' value={cardSeleccionado && cardSeleccionado.apellidoM} onChange={handleInputChange} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '60%' }}>
              <TextField id="outlined-basic" label="Numero de control" name='numControl' variant="outlined" size='small' value={cardSeleccionado && cardSeleccionado.numControl} onChange={handleInputChange} />
            </Grid>

            <Grid className='elementosForm' item sx={{ width: '60%' }}>
              <TextField
                id="outlined-select-currency"
                select
                label="Sexo"
                name='sexo'
                value={cardSeleccionado && cardSeleccionado.sexo}
                onChange={handleChange}
                size='small'
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
              <TextField id="outlined-basic" label="Email" name='email' variant="outlined" size='small' value={cardSeleccionado && cardSeleccionado.email} />
            </Grid>

            {/* <Grid className='elementosForm' item sx={{ width: '60%' }}>
              <TextField id="outlined-basic" label="Contraseña" name='password'
                variant="outlined" size='small' type='password' value={cardSeleccionado && cardSeleccionado.password} />
            </Grid> */}

            <Grid className='elementosForm' item sx={{ width: '60%' }}>
              <TextField
                id="outlined-select-currency"
                select
                label="Seleccione un Rol de usuario"
                value={cardSeleccionado && cardSeleccionado.rol}
                onChange={handleRol}
                size='small'
                name='rol'
              // placeholder='Seleccionar'
              // helperText="Seleccione el periodo de mantenimiento"
              >
                {roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {/* <TextField id="outlined-basic" label="Nombre :" name='tipoH' variant="outlined" size='small'/> */}
            </Grid>
            <Button variant="outlined" size='large' className='btnGC' onClick={() => funciones()}
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


    </>
  )

  return (
    <>




      <Grid
        // className='ccontentCard'
        container
        direction="row"
        justifyContent="center"
        spacing={4}
        sx={{
          borderRadius: '20px', width: '100%', marginTop: '4vh',
          marginLeft: 'auto', marginRight: 'auto'
        }}
      >
        <Paper
          sx={{ borderRadius: '20px', width: '100%' }}
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
            }}>
            Usuarios Registrados
          </Typography>
          <Divider variant="middle" />
          <Grid
            container
            direction="row"
            justifyContent="center"
            spacing={4}
            sx={{ marginTop: '4vh', marginBottom: '4vh' }}
          >
            {cardData.map(user => {
              if (user.estado == 'Activo') {
                return <Card key={user.id} variant='outlined'
                  sx={{
                    ...styleCard, marginLeft: '4vh', marginTop: '4vh', marginBottom: '4vh',
                    ':hover': { boxShadow: 20, cursor: 'pointer' }
                  }}>

                  <CardMedia
                    sx={{ maxHeight: '90%', maxWidth: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '2vh', marginBottom: 'auto' }}
                    component="img"
                    height='210'
                    image={rutaImg}
                  />

                  <CardContent sx={{ marginLeft: '10%', marginRight: '10%' }}>
                    <Typography variant='h1' sx={{
                      fontFamily: 'Monserrat, sans-serif',
                      fontWeight: 400,
                      fontSize: '2.5vh',
                      color: '#002F6C',
                      fontStyle: 'regular',
                    }} >
                      {user.nombre} <br /> {user.apellidoP} {user.apellidoM} </Typography>
                  </CardContent>
                  <CardContent sx={{ marginLeft: '10%', marginRight: '10%' }}>
                    <Typography sx={{
                      fontFamily: 'Monserrat, sans-serif',
                      fontWeight: 400,
                      fontSize: '3vh',
                      color: '#002F6C',
                      fontStyle: 'regular',
                    }}>
                      {user.rol} </Typography>
                  </CardContent >
                  <Grid>
                    <CardActions sx={{ marginRight: '4vh', marginLeft: '' }}>
                      <Button variant="outlined" sx={{ margin: '2vh' }} onClick={() => seleccion(user)} >Editar</Button>
                      <Button variant="outlined" color='error' onClick={() => selecDeleted(user)} >Dar de baja</Button>
                    </CardActions>
                  </Grid>
                </Card>

              }

            })
            }
          </Grid>
        </Paper>
      </Grid >


      <Modal
        open={modalVisualizar}
        onClose={abrirCerrarModalVer}>
        {bodyVisualizar}
      </Modal>

      <Modal
        open={modalDeleted}
        onClose={abrirCerrarModalDeleted}>
        {bodyDeleted}
      </Modal>
    </>
  )
}

export default ListUsuarios;