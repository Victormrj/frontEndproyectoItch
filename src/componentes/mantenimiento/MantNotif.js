import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export const MantNotif = () => {
  return (
    <>

      <Paper sx={{ borderRadius: '20px', margin: '2vh' }} elevation={10} >
        <Card variant="outlined" sx={{ display: 'flex', borderRadius: '20px' }}  >
          <Grid
            container
            direction='row'
            justifyContent="space-between"
            alignItems="center"
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="body2">
                  El edificio V-2 requiere atención
                </Typography>

              </CardContent>
            </Box>
            {/* <CardContent sx={{ flex: '0 1 auto' }}>
              <Typography variant="body2">
                  Quedan 5 píezas
                </Typography>
              </CardContent> */}

            {/* <Grid> */}
            <CardActions sx={{ marginRight: '5vh' }}>
              <Button variant="outlined" sx={{ margin: '2vh' }} >Ver</Button>
              <Button variant="outlined" color='error' >Eliminar</Button>
            </CardActions>
            {/* </Grid> */}
          </Grid>
        </Card>

      </Paper>


    </>
  )
}

export default MantNotif;
