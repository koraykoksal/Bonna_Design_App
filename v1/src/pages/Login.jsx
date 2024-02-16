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

export const Login = () => {


  const [info, setInfo] = useState({
      username:"",
      password:""
  })

  const { login,get_managerPersonels, twiserLogin } = useAuthCall()

  const handleChange=(e)=>{
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const handleSubmit=(e)=>{

    e.preventDefault()

    //login işlemi için çalıştırılan hook
    login(info)

    //login sonrası yöneticiye bağlı personellerin litesini çekmek için çalıştırılan hook
    get_managerPersonels(info)

    // twiser sisteminde login talebi gönder
    twiserLogin()


    setInfo({
      username:"",
      password:""
    })
  }



  return (


    <Container sx={{ mt:15 }}>

      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          alignItems:'center',
          p: 2,
          gap:5,
        }}
      >


        <Grid item xs={10} sm={8} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

   
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} component='form' onSubmit={handleSubmit}>
            <TextField
            required
              label="Kullanıcı Adı"
              name="username"
              id="username"
              type="text"
              variant="outlined"
              value={info.username}
              onChange={handleChange}
            />
            <TextField
            required
              label="Parola"
              name="password"
              id="password"
              type="password"
              variant="outlined"
              value={info.password}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit" sx={{letterSpacing:5,textTransform:'none'}}>
              Giriş
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

  )

}
