import React from 'react'
import Modal from '@mui/material/Modal';
import { Typography, Grid, TextField, Button } from "@mui/material"
import { Box, Container } from "@mui/material"
import { FaWindowClose } from "react-icons/fa";
import useBonnaDesign from '../../hooks/useBonnaDesign';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 525,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};


const DeleteModal = ({ delHandleClose, delOpen, info }) => {

    const {getRealTime_dataFromDb,removeDesignFileData,removeDesignData,deleteUsers} = useBonnaDesign()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (info.id && info.type=='images') {
            removeDesignFileData(info.fileName) // storage den sil
            removeDesignData(info.id)   // realtime db den sil
            getRealTime_dataFromDb()    // güncel datayı çek
        }
        else if(info.id && info.type=='users'){
            deleteUsers('users',info)
        }
        
        delHandleClose()
    }

    console.log(info)

    return (
        <div>
            <Modal
                open={delOpen}
                onClose={delHandleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>

                    <FaWindowClose size={25} color='red' cursor={'pointer'} onClick={delHandleClose} />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>

                        {/* <Typography align='center' variant='h5'>{info}</Typography> */}

                        <Typography align='center' variant='h5'>Kayıt Silinecek Emin Misiniz ?</Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', gap: 3 }}>

                            <Button variant='contained' color='success' onClick={handleSubmit}>Evet</Button>

                            <Button variant='outlined' color='error' onClick={delHandleClose}>Hayır</Button>
                        </Box>
                    </Box>

                </Box>


            </Modal>

        </div>
    )
}

export default DeleteModal