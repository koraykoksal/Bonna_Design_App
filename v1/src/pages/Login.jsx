import React from 'react'
import Avatar from "@mui/material/Avatar"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import LockIcon from "@mui/icons-material/Lock"
import image from "../assets/result.svg"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import useAuthCall from '../hooks/useAuthCall'
import { useState } from 'react'
import { CardMedia } from '@mui/material'
import { loginPageBgStyle } from '../styles/globalStyle'

export const Login = () => {


  const [info, setInfo] = useState({
    email: "",
    password: ""
  })

  const { login, signIn } = useAuthCall()

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    //login işlemi için çalıştırılan hook

    login(info)
    // signIn(info)

    setInfo({
      email: "",
      password: ""
    })
  }



  return (

    <div style={loginPageBgStyle}>

      <Container sx={{ mt: 15 }}>


        <Typography align='center' variant='h5' p={3} letterSpacing={5} color={'#0B60B0'} fontWeight={700}>Bonna Design Research App</Typography>

        <Grid
          container
          justifyContent="center"
          direction="row-reverse"
          sx={{
            alignItems: 'center',
            p: 2,
            gap: 5,
          }}
        >



          <Grid item xs={10} sm={8} md={6}>

            <Avatar
              sx={{
                backgroundColor: "secondary.light",
                margin:'auto',
                marginBottom:3,
                width: 40,
                height: 40,
              }}
            >
              <LockIcon size="30" color='blue'/>
            </Avatar>


            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} component='form' onSubmit={handleSubmit}>
              <TextField
                required
                label="Email"
                name="email"
                id="email"
                type="email"
                variant="outlined"
                value={info.email}
                onChange={handleChange}
                inputProps={{
                  style: { color: 'black' }
                }}
              />
              <TextField
                required
                label="Password"
                name="password"
                id="password"
                type="password"
                variant="outlined"
                value={info.password}
                onChange={handleChange}
              />
              <Button variant="contained" type="submit" sx={{ letterSpacing: 5, textTransform: 'none' }}>
                Login
              </Button>

            </Box>



          </Grid>

          <Grid item xs={10} sm={8} md={5}>
            <Container>
              <img src={image} alt="img" />
            </Container>
          </Grid>

        </Grid>

      </Container>

    </div>

  )

}
