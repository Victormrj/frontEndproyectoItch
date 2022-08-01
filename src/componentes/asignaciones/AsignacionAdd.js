import React, { useState, useEffect } from 'react'
import { Container, Grid, Paper, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'; import 'moment-timezone';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';


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
export const AsignacionAdd = () => {

    const [selectMaterial, setSelectMaterial] = useState({
        idMaterial:'',
        nombreM:''
    });

  return (
    <>
    </>
  )
}
