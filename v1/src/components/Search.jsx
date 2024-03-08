import { Box, Container, TextField, Typography } from '@mui/material'
import React from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import useBonnaDesign from '../hooks/useBonnaDesign';

const Search = ({ info, handleChange, handleSubmit, handleKeyDown }) => {



    return (
        <div>

            <Container sx={{ display: 'flex', flexDirection: 'column' }} maxWidth='sm'>

                <Paper
                    component="form"
                    sx={{ p: '2px', display: 'flex', alignItems: 'center', width: '100%' }}
                    onSubmit={handleSubmit}
                    onKeyDown={handleKeyDown}
                >

                    <TextField
                        fullWidth
                        required
                        placeholder='enter keyword here..'
                        variant="outlined"
                        autoFocus
                        type='text'
                        name='keywords'
                        id='keywords'
                        value={info.keywords}
                        onChange={handleChange}
                        sx={{
                            "& fieldset": { border: 'none' },
                        }}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>

                <Typography variant='subtitle2' style={{padding:3}} color={'#ADC4CE'}>Example : MOSAIC BRUSH FLOWER</Typography>

            </Container>

        </div>
    )
}

export default Search