import React, { useState, useEffect } from 'react'
import { Container, Grid, Paper, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'; import 'moment-timezone';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';


import { usuarioStartAddNew } from '../../actions/usuarios';
import { personalStartAddNew } from '../../actions/personal'
// import { modalClose } from '../asignaciones/EmpleadoList'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
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
const sexEmpleado = [
  {
    value: 'Masculino',
    label: 'Masculino'
  },
  {
    value: 'Femenino',
    label: 'Femenino'
  }
]
export const EmpleadoAdd = () => {
  const dispatch = useDispatch();

  const { rol } = useSelector(state => state.auth);
  const [sexoEmpleado, setSexoEmpleado] = useState();
  // const [rowData, setRoeData] = useState([]);
  const [personalSelect, setPersonalSelect] = useState()
  const [formEmpleado, setFormEmpleado] = useState({
    nombre:'',
    apellidoM:'',
    apellidoP:'',
    sexo:''
  })
  const { nombre, apellidoP, apellidoM, sexo } = formEmpleado;


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSexoEmpleado(value);
    setFormEmpleado({...formEmpleado, sexo: value})
    // console.log(value)
    // setCardSeleccionado({ ...cardSeleccionado, sexo: value })
  };

  const handleInputChange = ({target}) => {
    setFormEmpleado({
      ...formEmpleado,
      [target.name]: target.value
    });
  }
  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch( personalStartAddNew(formEmpleado) )
    // modalClose(true)
    console.log(formEmpleado)
    camposVacios()
  }

  const camposVacios = () => {
    setFormEmpleado({ 
      nombre:'',
      apellidoM:'',
      apellidoP:'',
      sexo:''
    })
    setSexoEmpleado('')
  }

  

  return (
    <>
      <Grid sx={{ ...style }} >
        <Grid container direction='row' justifyContent='center' spacing={4}
          sx={{ borderRadius: '20px', width: '100%', marginTop: '0.5vh', marginLeft: 'auto', marginRight: 'auto' }} >
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
              }}>
              Alta de Personal
            </Typography>
          </Paper>
        </Grid>

        <form onSubmit={handleSubmitForm} >
          <Grid container direction='row' sx={{
            marginTop: '1vh', marginBottom: '2vh', width: '100%',
            marginLeft: 'auto', marginRight: 'auto'
          }} justifyContent="space-around"
            alignItems="flex-start" >
            <Paper sx={{ width: '100%', margin: '0.2vh', width: '100%' }} elevation={10} >
              <Grid container item sx={{ marginBottom: '5vh', marginTop: '1vh', width: '100%' }} justifyContent='center' >

                <Grid className='elementosForm' item sx={{ width: '60%' }}>
                  <TextField label="Nombre" name='nombre' variant="outlined" onChange={handleInputChange} value={nombre} />
                </Grid>
                <Grid className='elementosForm' item sx={{ width: '60%' }}>
                  <TextField label="Apellido Paterno" name='apellidoP' variant="outlined" onChange={handleInputChange} value={apellidoP} />
                </Grid>
                <Grid className='elementosForm' item sx={{ width: '60%' }}>
                  <TextField label="Apellido Materno" name='apellidoM' variant="outlined" onChange={handleInputChange} value={apellidoM} />
                </Grid>
                <Grid className='elementosForm' item sx={{ width: '60%' }}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Sexo"
                    name='sexo'
                    onChange={handleChange}
                    value={(sexoEmpleado == null) ? '' : sexoEmpleado}>
                    {sexEmpleado.map((option) => (
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
                  }}>Agregar Personal</Button>

              </Grid>

            </Paper>

          </Grid>
        </form>

      </Grid>
    </>
  )

}


export default EmpleadoAdd;