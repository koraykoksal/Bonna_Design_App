import React from 'react'
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CardActionArea, CardHeader, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // maxWidth: '80%',
    width: '75%',
    // height: 'auto',
    maxHeight:'85%',
    borderRadius: '5px',
    bgcolor: '#dddddd',
    boxShadow: 24,
    p: 4,
    bgcolor: 'background.paper',
    overflow:'auto'

};



const ImageDetail_Modal = ({ open, handleClose, selectedData }) => {

    return (
        <div>

            <Modal
                open={open}
                onClose={() => { handleClose() }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>

                    <CloseIcon sx={{ float:'right',color: '#C70039', fontSize: 28, mr: 1, '&:hover': { cursor: 'pointer', color: '#900C3F' } }} onClick={() => { handleClose() }} />

                    <CardHeader
                        
                        title={selectedData?.collectionName}
                        subheader={selectedData?.imageOwner}
                    />
                    <CardMedia
                        component="img"
                        height="100%"
                        image={selectedData?.imgUrl}
                        // style={{ margin: 'auto' }}
                    />


                </Box>

            </Modal>


        </div>
    )
}

export default ImageDetail_Modal