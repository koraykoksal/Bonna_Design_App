import React from 'react'
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CardActionArea, CardHeader, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useSelector } from 'react-redux';
import { imageDetailModal } from '../../styles/globalStyle';
import { useState,useEffect } from 'react';

const ImageDetail_Modal = ({ open, handleClose, selectedData }) => {

    const [imgLocation, setImgLocation] = useState("")

    //imageCode ifadesine göre lokasyon bilgisini göster
    useEffect(() => {  
        const data = selectedData?.imageCode || ""
        const info = data[0] == 'P' && 'Pazaryeri' || data[0] == 'B' && 'Çayırova' || 'Null'
        setImgLocation(info)
    }, [selectedData])
    

    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={imageDetailModal}>

                    <CloseIcon sx={{ float:'right',color: '#C70039', fontSize: 28, mr: 1, '&:hover': { cursor: 'pointer', color: '#900C3F' } }} onClick={handleClose} />

                    <CardHeader
                        
                        title={`Image Code : ${selectedData?.imageCode}`}
                        subheader={`Design Location : ${imgLocation}`}
                    />
                    <CardMedia
                        component="img"
                        height="90%"
                        image={selectedData?.imgUrl}
                        style={{ padding:2,objectFit:'contain'}}
                    />


                </Box>

            </Modal>


        </div>
    )
}

export default ImageDetail_Modal