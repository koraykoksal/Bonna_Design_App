import React from 'react'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, Container } from '@mui/material';
import { homePageBgStyle } from '../styles/globalStyle';


export const Home = () => {


  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
  }



  return (

    <div style={homePageBgStyle}>

      <Box sx={{ display: 'flex', flexDirection: 'column', pt: 10, gap: 5 }}>

        <Typography align='center' color={'#ffffff'} letterSpacing={5} fontFamily={'Calibri'}>Home Page</Typography>

      </Box>

    </div>


  )
}
