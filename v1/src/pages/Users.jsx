import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { usersPageButton } from '../styles/globalStyle'
import { useState, useEffect } from 'react'
import Users_Modal from '../components/modals/Users_Modal'

const Users = () => {


    const [info, setInfo] = useState({
        name:"",
        surname:"",
        password:"",
        isAdmin:false,
        isController:false,
        email:"",
    })


    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    }

    const handleChange=(e)=>{
        const {name,value} = e.target
        setInfo({...info,[name]:value})
    }

    
    const handleSubmit=(e)=>{
        e.preventDefault()

    }



    return (
        <div>

            <Box display={'flex'} flexDirection={'column'} gap={3} p={3}>

                <Typography color={'#000000'} align='center' mt={10} letterSpacing={5}>Users</Typography>

                <Button variant='outlined' sx={usersPageButton} onClick={handleOpen}>Add User</Button>
            </Box>

            <Users_Modal open={open} handleClose={handleClose} info={info} setInfo={setInfo} handleChange={handleChange} handleSubmit={handleSubmit}/>

        </div>
    )
}

export default Users