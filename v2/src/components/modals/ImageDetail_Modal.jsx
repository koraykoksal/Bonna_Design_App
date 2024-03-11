import React from 'react'
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CardActionArea, CardHeader, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useSelector } from 'react-redux';
import { imageDetailModal } from '../../styles/globalStyle';
import { useState, useEffect } from 'react';
import { FaCloudDownloadAlt } from "react-icons/fa";


const ImageDetail_Modal = ({ open, handleClose, selectedData }) => {

    const [imgLocation, setImgLocation] = useState("")

    //imageCode ifadesine göre lokasyon bilgisini göster
    useEffect(() => {
        const data = selectedData?.imageCode || ""
        const info = data[0] == 'P' && 'Pazaryeri' || data[0] == 'B' && 'Çayırova' || 'Null'
        setImgLocation(info)
    }, [selectedData])



    const handleDownload = (e) => {

        fetch(selectedData?.imgUrl)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = selectedData?.fileName; // İndirilecek dosyanın adı
                document.body.appendChild(a); // <a> etiketini geçici olarak DOM'a ekler
                a.click(); // İndirme işlemini tetikler
                window.URL.revokeObjectURL(url); // Kullanımdan kaldırılan URL'yi temizler
                document.body.removeChild(a); // <a> etiketini DOM'dan kaldırır
            })
            .catch(error => console.error('Dosya indirme hatası:', error));

    }

    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={imageDetailModal}>

                    <CloseIcon sx={{ float: 'right', color: '#C70039', fontSize: 28, mr: 1, '&:hover': { cursor: 'pointer', color: '#900C3F' } }} onClick={handleClose} />

                    <CardHeader
                        title={`Image Code : ${selectedData?.imageCode}`}
                        subheader={`Design Location : ${imgLocation}`}
                        avatar={

                            <FaCloudDownloadAlt size={25} cursor={'pointer'} onClick={handleDownload} />

                        }
                    />

                    <CardMedia
                        component="img"
                        height="90%"
                        image={selectedData?.imgUrl}
                        // style={{ padding: 2, }}
                        style={{ borderRadius: '0.8rem', objectFit: 'contain', backgroundColor: 'transparent' }}
                    />


                </Box>

            </Modal>


        </div>
    )
}

export default ImageDetail_Modal