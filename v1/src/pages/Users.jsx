import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { usersPageButton } from '../styles/globalStyle'
import { useState, useEffect } from 'react'
import Users_Modal from '../components/modals/Users_Modal'
import useBonnaDesign from '../hooks/useBonnaDesign'
import { useSelector } from 'react-redux'
import UsersData_Table from '../components/tables/UsersData_Table'
import DeleteModal from '../components/delete/DeleteModal'
import { useNavigate } from 'react-router-dom'
import { NotFound } from './NotFound'

const Users = () => {

    const { getUsers } = useBonnaDesign()
    const { users } = useSelector((state) => state.bonnadesign)
    const { userInfo } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [info, setInfo] = useState({
        name: "",
        surname: "",
        password: "",
        isAdmin: false,
        isController: false,
        email: "",
    })


    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false) }

    const [delOpen, setdelOpen] = React.useState(false);
    const delHandleOpen = () => setdelOpen(true);
    const delHandleClose = () => setdelOpen(false);

    const [editOpen, setEditOpen] = React.useState(false);
    const editHandleOpen = () => setEditOpen(true);
    const editHandleClose = () => setEditOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target
        setInfo({ ...info, [name]: value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()

    }


    useEffect(() => {
        getUsers('users')
    }, [])



    return (

        <div>

            {
                userInfo?.user?.isAdmin ?
                    (
                        <Box display={'flex'} flexDirection={'column'} gap={3} p={3}>

                            <Box display={'flex'} flexDirection={'column'} gap={3} p={3}>

                                <Typography color={'#000000'} align='center' mt={10} letterSpacing={5}>Users</Typography>

                                <Button variant='outlined' sx={usersPageButton} onClick={handleOpen}>Add User</Button>
                            </Box>


                            <UsersData_Table
                                users={users}
                                handleOpen={handleOpen}
                                info={info}
                                setInfo={setInfo}
                                delHandleOpen={delHandleOpen}
                                editHandleOpen={editHandleOpen}
                            />


                            <DeleteModal delOpen={delOpen} delHandleClose={delHandleClose} info={info} />

                            <Users_Modal open={open} handleClose={handleClose} info={info} setInfo={setInfo} handleChange={handleChange} handleSubmit={handleSubmit} />

                        </Box>
                    )
                    :
                    (
                        <NotFound />
                    )
            }

        </div>
    )
}

export default Users