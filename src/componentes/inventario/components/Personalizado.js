import React from 'react'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import styled from 'styled-components'

export const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#1E477A',
      color: 'white',
      // backgroundColor: theme.palette.common.white,
      // color: "rgba(0, 0, 0, 0.87)",
      boxShadow: 3,
      fontFamily: 'Monserrat, sans-serif',
      fontSize: 18
    }
  }));