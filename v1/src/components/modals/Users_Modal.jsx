import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, CardActionArea, CardHeader, Container, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useSelector } from 'react-redux';
import { editModalStyle } from '../../styles/globalStyle';
import { LuUserPlus } from "react-icons/lu";
import { LuUserCog } from "react-icons/lu";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

import Switch from '@mui/material/Switch';


const Users_Modal = ({ open, handleClose, info, setInfo, handleChange, handleSubmit }) => {


    const [showPassword, setShowPassword] = useState(false);

    const [checkInfo, setcheckInfo] = useState({
        admin: false,
        controller: false
    })

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleIsCheck = (e, param) => {

        const { checked } = e.target

        if (param == 'admin') {
            setcheckInfo({ ...checkInfo, admin: checked })
            setInfo(prev => ({ ...prev, isAdmin: checked }))
        }
        else if (param == 'controller') {
            setcheckInfo({ ...checkInfo, controller: checked })
            setInfo(prev => ({ ...prev, isController: checked }))
        }
    }

    const handleReset = () => {
        setcheckInfo({
            admin: false,
            controller: false
        })
        setInfo({ ...info, isAdmin: false, isController: false })
    }

    

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={editModalStyle}>

                    <Box display={'flex'} flexDirection={'column'} gap={1}>

                        <CloseIcon sx={{ float: 'right', color: '#C70039', fontSize: 28, mr: 1, '&:hover': { cursor: 'pointer', color: '#900C3F' } }} onClick={handleClose} />



                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


                            {
                                info.id ? <LuUserCog size={40} /> : <LuUserPlus size={40} />
                            }

                            <Typography variant='subtitle1' letterSpacing={5} align='center' p={1} fontFamily={'Catamaran'} >
                                {
                                    info.id ? 'Update User' : 'New User'
                                }
                            </Typography>
                        </Box>
                    </Box>


                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} flexWrap={'wrap'} gap={5} p={3} component={'form'} onSubmit={handleSubmit}>

                        <Grid display={'flex'} justifyContent={'center'} gap={5} alignItems={'center'} flexWrap={'wrap'}>

                            <TextField
                                required
                                fullWidth
                                type='text'
                                name='name'
                                id='name'
                                label='Name'
                                value={info?.name}
                                onChange={handleChange}
                            />
                            <TextField
                                required
                                fullWidth
                                type='text'
                                name='surname'
                                id='surname'
                                label='Surname'
                                value={info?.surname}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid display={'flex'} justifyContent={'center'} gap={5} alignItems={'center'} flexWrap={'wrap'}>
                            <TextField
                                
                                fullWidth
                                type={showPassword ? 'password' : 'text'}
                                name='password'
                                id='password'
                                label='Password'
                                value={info?.password}
                                onChange={handleChange}

                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={togglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <IoIosEyeOff /> : <IoMdEye />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                required
                                fullWidth
                                type='email'
                                name='email'
                                id='email'
                                label='Email'
                                value={info?.email}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid display={'flex'} justifyContent={'center'} gap={5} alignItems={'center'} flexWrap={'wrap'}>
                            <FormControlLabel
                                control={<Switch
                                    // checked={checkInfo.admin}
                                    checked={info.id ? info.isAdmin : checkInfo.admin}
                                    name='admin'
                                    onChange={(e) => handleIsCheck(e, 'admin')}
                                />
                                } label="Admin"
                            />
                            <FormControlLabel
                                control={<Switch
                                    // checked={checkInfo.controller}
                                    checked={info.id ? info.isController : checkInfo.controller}
                                    name='controller'
                                    onChange={(e) => handleIsCheck(e, 'controller')}
                                />
                                } label="Controller"
                            />
                            <Button variant='contained' size='small' sx={{ textTransform: 'none' }} onClick={handleReset}>
                                Reset
                            </Button>
                        </Grid>


                        <Button variant='contained' type='submit' sx={{ letterSpacing: 5, textTransform: 'none', width: '200px' }}>
                            {
                                info.id ? 'Update' : 'Add'
                            }
                        </Button>


                    </Box>



                </Box>

            </Modal>

        </div>
    )
}

export default Users_Modal