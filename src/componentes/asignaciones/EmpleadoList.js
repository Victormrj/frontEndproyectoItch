import React, { useEffect, useState } from 'react'
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
import MaterialTable from '@material-table/core';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Collapse from '@mui/material/Collapse';
import { usuarioStartUpdated, usuarioStartLoaded, usuarioStartDeleted } from '../../actions/usuarios'
// import './Components/MenuBar.css'
import { useInRouterContext } from 'react-router-dom';
import EmpleadoAdd from './EmpleadoAdd';
import { personalStartUpdated, personalStartDeleted } from '../../actions/personal'
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];
const ITEM_HEIGHT = 48;


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

export const EmpleadoList = () => {
  const rutaImg = "/img/LOGO-IT-CHILPANCINGO.jpg";
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [rowData, setRowData] = useState([]);

  const [cardData, setCardData] = useState([]);
  const { id, rol } = useSelector(state => state.auth);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDeleted, setModalDeleted] = useState(false);
  const [role, setRole] = React.useState('');
  const [sexoEmpleado, setSexoEmpleado] = useState();
  const [personalSelect, setPersonalSelect] = useState({
    id: '',
    nombre: '',
    apellidoM: '',
    apellidoP: '',
    sexo: '',
    rol: rol
  })



  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSexoEmpleado(value);
    // setCardSeleccionado({ ...cardSeleccionado, sexo: value })
  };
  const abrirCerrarModalVer = () => {
    setModalVisualizar(!modalVisualizar);
    getPersonal()
    // getUser();
  }
  const abrirCerrarModalEdit = () => {
    setModalEdit(!modalEdit);
    getPersonal()
  }
  const body = (
    <>
      <EmpleadoAdd />
      getPersonal()
    </>
  );
  const modal = () => {
    abrirCerrarModalVer()
    console.log('first')
  }

  const column = [
    {
      title: 'Nombre',
      field: 'nombre'
    },
    {
      title: 'Apellido Paterno',
      field: 'apellidoP'
    },
    {
      title: 'Apellido Materno',
      field: 'apellidoM'
    },
    {
      title: 'Sexo',
      field: 'sexo'
    }
  ]
  const handleInputChange = ({ target }) => {

    setPersonalSelect({
      ...personalSelect,
      [target.name]: target.value
    });
  }
  const getPersonal = async () => {
    const resp = await fetchConToken('personal');
    const { personal } = await resp.json();

    setRowData(personal.map(b => ({
      id: b.id,
      nombre: b.nombre,
      apellidoP: b.apellidoP,
      apellidoM: b.apellidoM,
      sexo: b.sexo
    })))
  }
  useEffect(() => {
    getPersonal()
  }, [])

  const seleccion = (personal) => {
    setPersonalSelect(personal);
    abrirCerrarModalEdit();
  }
  const funciones = () => {
    Swal.fire({
      target: document.getElementById('personal-edit'),
      title: '¿Guardar los cambios que realizó?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar cambios'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(personalStartUpdated(personalSelect))
        getPersonal()
        Swal.fire(
          'Actualizado!',
          'El registro ha sido actualizado.',
          'success'
        )
        getPersonal()
        // obtenerEquipos();

      }
    })
    // abrirCerrarModalVer();

  }

  const handleDelete = (personal) => {
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
        dispatch(personalStartDeleted(personal))
        getPersonal()
        Swal.fire(
          'Eliminado!',
          'El registro ha sido borrado.',
          'success'
        )
        getPersonal()
      }
    })
  }

  const bodyVisualizar = (
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
              Edición de Personal
            </Typography>
          </Paper>
        </Grid>


        <Grid container direction='row' sx={{
          marginTop: '1vh', marginBottom: '2vh', width: '100%',
          marginLeft: 'auto', marginRight: 'auto'
        }} justifyContent="space-around"
          alignItems="flex-start" >
          <Paper sx={{ width: '100%', margin: '0.2vh', width: '100%' }} elevation={10} >
            <Grid container item sx={{ marginBottom: '5vh', marginTop: '1vh', width: '100%' }} justifyContent='center' >

              <Grid className='elementosForm' item sx={{ width: '60%' }}>
                <TextField label="Nombre" name='nombre' variant="outlined" onChange={handleInputChange} value={personalSelect && personalSelect.nombre} />
              </Grid>
              <Grid className='elementosForm' item sx={{ width: '60%' }}>
                <TextField label="Apellido Paterno" name='apellidoP' variant="outlined" onChange={handleInputChange} value={personalSelect && personalSelect.apellidoP} />
              </Grid>
              <Grid className='elementosForm' item sx={{ width: '60%' }}>
                <TextField label="Apellido Materno" name='apellidoM' variant="outlined" onChange={handleInputChange} value={personalSelect && personalSelect.apellidoM} />
              </Grid>
              <Grid className='elementosForm' item sx={{ width: '60%' }}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Sexo"
                  name='sexo'
                  onChange={handleChange}
                  value={(personalSelect && personalSelect.sexo == null) ? '' : personalSelect && personalSelect.sexo}>
                  {sexEmpleado.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

              </Grid>
              <Button variant="outlined" size='large' className='btnGC' onClick={() => funciones()}
                sx={{
                  marginTop: '4vh',
                  color: '#002F6C', borderRadius: '5vh',
                  // fontWeight: 560, 
                  letterSpacing: '0.5vh',
                  fontFamily: 'Monserrat, sans-serif',
                  fontStyle: 'regular'
                }}>Guaradr Cambios</Button>

            </Grid>

          </Paper>

        </Grid>

      </Grid>

    </>
  );

  return (
    <>
      <Grid container direction='row' justifyContent='center' spacing={4}
        sx={{ borderRadius: '20px', width: '100%', marginTop: '2vh', marginLeft: 'auto', marginRight: 'auto' }} >
        <Paper sx={{ borderRadius: '20px', width: '100%' }} elevation={10} >
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
            Personal Registrado
          </Typography>
          <Divider variant="middle" />
          <Grid container direction='row' justifyContent='center' spacing={4} sx={{ marginTop: '4vh', marginBottom: '4vh' }} >
            <Paper sx={{ width: 'auto', borderRadius: '10px' }}  >
              <Button variant="outlined" sx={{ borderRadius: '10px' }} onClick={() => modal()}>Agregar personal</Button>
            </Paper>

          </Grid>
          <MaterialTable
            title=''
            columns={

              column

            }
            data={rowData}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Editar',
                onClick: (event, rowData) => seleccion(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Eliminar',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: AddCommentIcon,
                tooltip: 'Realizar asignación',
                onClick: (event, rowData) => console.log('HOLA')
              }
            ]}
            options={{
              
              exportMenu: [
                {
                  label: "Export PDF",
                  //// You can do whatever you wish in this function. We provide the
                  //// raw table columns and table data for you to modify, if needed.
                  // exportFunc: (cols, datas) => console.log({ cols, datas })
                  exportFunc: (cols, datas) => ExportPdf(cols, datas, "myPdfFileName"),
                },
              ],
              exportButton: true,
              search: true,
              actionsColumnIndex: -1,
              searchFieldStyle: {
                marginLeft: '60%'
              },
              headerStyle: {
                backgroundColor: '#01579b',
                color: '#FFF',
              },
              cellStyle: {
                backgroundColor: '#EEE',
                color: 'black',
              }

            }}
            localization={{
              header: {
                actions: 'Acciones',
              },

            }}
          />
        </Paper>

      </Grid>
      {/* <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu> */}

      <Modal
        id='personal-add'
        open={modalVisualizar}
        onClose={abrirCerrarModalVer}>
        {body}
      </Modal>
      <Modal
        id='personal-edit'
        open={modalEdit}
        onClose={abrirCerrarModalEdit}>
        {bodyVisualizar}

      </Modal>


    </>
  )
}
export default EmpleadoList