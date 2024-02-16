import React from 'react'
import Modal from '@mui/material/Modal';
import { Typography, Grid, TextField, Button } from "@mui/material"
import { Box, Container } from "@mui/material"
import usePerformanceCall from '../../hooks/usePerformanceCall';
import { FaWindowClose } from "react-icons/fa";


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


const DeleteModal = ({ HandleClose_delete, Open_delete, info, setInfo, experienceInfo }) => {

    const {
        removeRaiseData,
        get_raiseData,
        get_All_PerformanceData,
        removeMyPerformanceData,
        removeManagerEvaluationData,
        removeExperienceData,
        get_experienceData

    } = usePerformanceCall()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (info.type == "raise") {
            removeRaiseData('raise-data', info.id)
            get_raiseData('raise-data')
        }
        else if (info.type == "my-performance") {
            removeMyPerformanceData('my-performance', info)
            get_All_PerformanceData('my-performance')
        }
        else if (info.type == "manager-evaluation") {
            removeManagerEvaluationData('manager-evaluation', info)
            get_All_PerformanceData('manager-evaluation')
        }

        if (experienceInfo.type == "experience") {
            removeExperienceData('experience-data', experienceInfo.id)
            get_experienceData('experience-data')
        }


        HandleClose_delete()

    }


    return (
        <div>
            <Modal
                open={Open_delete}
                onClose={HandleClose_delete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>

                    <FaWindowClose size={25} color='red' cursor={'pointer'} onClick={HandleClose_delete} />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>

                        <Typography align='center' variant='h5'>Kayıt Silinecek Emin Misiniz ?</Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', gap: 3 }}>

                            <Button variant='contained' color='success' onClick={handleSubmit}>Evet</Button>

                            <Button variant='outlined' color='error' onClick={HandleClose_delete}>Hayır</Button>
                        </Box>
                    </Box>

                </Box>


            </Modal>

        </div>
    )
}

export default DeleteModal