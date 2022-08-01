import React, { useEffect, useState }  from 'react';
import MaterialTable from '@material-table/core';
import Typography from '@mui/material/Typography';
import { Paper, Grid } from '@mui/material';
import { equipoStartLoadedDeleted } from '../../actions/equipos'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchConToken } from '../../helpers/fetch';


export const EquipoBajas = () => {
  const dispatch = useDispatch();

  const [rowData, setRowdata] = useState([]);
  const { id, rol } = useSelector(state => state.auth);



  const obtenerEquipos = async () => {

    const resp = await fetchConToken('bajasEquipos');
    const { equipo } = await resp.json();

    setRowdata(equipo.map(b => ({
      id: b.id,
      nombreEquio: b.nombreEquio,
      numInventario: b.numInventario,
      modelo: b.modelo,
      numSerie: b.numSerie,
      voltaje: b.voltaje,
      corriente: b.corriente,
      watts: b.watts,
      temperatura: b.temperatura,
      hp: b.hp,
      hz: b.hz,
      peso: b.peso,
      presion: b.presion,
      volumen: b.volumen,
      rpm: b.rpm,
      fechaIngreso: b.fechaIngreso,
      capacidad: b.capacidad,
      cantidadEquipos: b.cantidadEquipos,
      observaciones: b.observaciones,
      numPeriodo: b.numPeriodo, //HACER REFERENCIA A MES O A AÑO          
      numMes: b.numMes,
      inicioMantenimiento: b.inicioMantenimiento,
      proximoMantenimiento: b.proximoMantenimiento,
      estadoEquipo: b.estadoEquipo,
      user_idE: id,
      // numControl: b.Usuario.numControl,
      rol: rol,
      fechaBaja: b.fechaBaja,
      // nombre: b.Usuario.nombre
    })))   

    // console.log(equipo)
  }
  useEffect(() => {
    // dispatch(equipoStartLoaded());
    obtenerEquipos();
    // funciones();

  }, [dispatch]);

  const columnas = [
    { title: 'Nombre del equipo', field: 'nombreEquio' },
    { title: 'No. de Inventario', field: 'numInventario' },
    // { title: 'Modelo', field: 'modelo' },
    { title: 'No. de Serie', field: 'numSerie' },
    {
      title: 'Fecha de Baja', field: 'fechaBaja', type: 'date', dateSetting: {
        format: 'DD/MM/YYYY'
      },
    },
    // { title: 'Cantidad disponible', field: 'cantidadEquipos' },
    { title: 'Disponibilidad', field: 'estadoEquipo' }
  ];
  return (

    <div>
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
          <Typography variant='h2' component='div' align='center'
            sx={{
              fontFamily: 'Monserrat, sans-serif',
              fontWeight: 400,
              fontStyle: 'regular',
              color: '#706c6c',
              fontSize: '2.5rem',
              letterSpacing: '1vh',
              marginTop: '2vh',
              marginBottom: '2vh',

            }}
          >
            Equipos dados de Baja
          </Typography>
        </Paper>

      </Grid>


      <MaterialTable
        title=''
        columns={columnas}
        data={rowData}
        // actions={[
        //   {
        //     icon: 'edit',
        //     tooltip: 'Editar',
        //     onClick: (event, rowData) => alert('Has presioando editar compa' + rowData.artista)
        //   },
        //   {
        //     icon: 'delete',
        //     tooltip: 'Eliminar',
        //     onClick: (event, rowData) => window.confirm('Seguro que deseas eliminarlo a: ' + rowData.artista + '?')
        //   }
        // ]}
        options={{
          actionsColumnIndex: -1,
          searchFieldStyle: {
            // width: '90vh'
            marginLeft: '60%'
          },
        }}
        localization={{
          header: {
            actions: 'Acciones'
          }
        }}
      />
    </div>

  )
}

export default EquipoBajas;
