import React from 'react';
import MaterialTable from '@material-table/core';
import Typography from '@mui/material/Typography';
import { Paper, Grid } from '@mui/material';


export const ListaEquiposMant = () => {



  const columnas = [
    {
      title: 'Artista',
      field: 'artista',
    },
    {
      title: 'Pais de Origen',
      field: 'pais',
    },
    {
      title: 'Genero musical',
      field: 'genero',
    },
    {
      title: 'Ventas estimadas',
      field: 'ventas',
      type: 'numeric',
    }
  ];

  const data = [
    { artista: 'The beatles', pais: 'Reino Unido', genero: 'Rock, pop', ventas: 1000 },
    { artista: 'Elvis Presly', pais: 'Estados Unidos', genero: 'Rock and roll, country', ventas: 15024 },
    { artista: 'Madona', pais: 'Estados Unidos', genero: 'Pop, rock', ventas: 400 },
    { artista: 'Elton Jhon', pais: 'Reino Unido', genero: 'Pop, rock', ventas: 500 }
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
            Listado de Equipos
          </Typography>
        </Paper>

      </Grid>


      <MaterialTable
        title=''
        columns={columnas}
        data={data}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar',
            onClick: (event, rowData) => alert('Has presioando editar compa' + rowData.artista)
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar',
            onClick: (event, rowData) => window.confirm('Seguro que deseas eliminarlo a: ' + rowData.artista + '?')
          }
        ]}
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

export default ListaEquiposMant;