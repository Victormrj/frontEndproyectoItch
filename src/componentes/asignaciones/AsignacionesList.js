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

import { usuarioStartUpdated, usuarioStartLoaded, usuarioStartDeleted } from '../../actions/usuarios'
// import './Components/MenuBar.css'
import { useInRouterContext } from 'react-router-dom';
export const AsignacionesList = () => {
  return (
   <>
   {/* <Grid container direct ></Grid> */}
   </>
  )
}

export default AsignacionesList;