import React from 'react'
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, CardActionArea, CardHeader, Container, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useSelector } from 'react-redux';
import { editModalStyle } from '../../styles/globalStyle';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: '90%',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    // bgcolor: 'background.paper',
    bgcolor: 'red',
    overflow: 'auto'

};


const ImageEdit_Modal = ({ info, setInfo, editOpen, editHandleClose }) => {

    const {
        collectionName,
        designName,
        fileName,
        imageCode,
        imageKeyWords,
        imageOwner,
        options,
        imgUrl
    } = info || {}


    //?* türkçe karakterleri engelleyen fonksiyon
    function turkishCharacterControl(chracter) {
        return chracter.replace(/[çğşüöÇĞİŞÜÖ]/g, '')
    }


    //* string değerlerin bilgisini alan fonksiyon
    const handleChangeInfo = (e) => {
        const { value } = e.target
        //?* TÜRKÇE KARAKTERLERİ TESPİT ET VE SİL
        const index = turkishCharacterControl(value)

        setInfo({ ...info, [e.target.name]: index.toUpperCase() })
    }


    //* dosya ismini alan fonksiyon
    const handleChangeFileName = (e) => {

        const file = e.target.files[0]

        if (file) {
            setFiles(file)

            setInfo(prevInfo => ({
                ...prevInfo, fileName: file.name
            }))
        }

    }


    return (
        <div>


            <Modal
                open={editOpen}
                onClose={editHandleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={editModalStyle}>

                    <CloseIcon sx={{ float: 'right', color: '#C70039', fontSize: 28, mr: 1, '&:hover': { cursor: 'pointer', color: '#900C3F' } }} onClick={editHandleClose} />


                    <Box display={'flex'} flexDirection={'column'} gap={3} alignItems={'center'} p={1}>

                        <img
                            style={{ maxWidth: '200px', objectFit: 'contain', margin: 'auto', display: 'block', borderRadius: 3 }}
                            src={imgUrl} loading='lazy'
                        />
                        <Typography align='center'>{collectionName}</Typography>

                        <TextField
                            fullWidth
                            type='text'
                            name='imageCode'
                            id='imageCode'
                            label='Image Code'
                            value={imageCode}
                            onChange={handleChangeInfo}
                        />
                        <TextField
                            required
                            fullWidth
                            type='text'
                            name='collectionName'
                            id='collectionName'
                            label='Collection Name'
                            value={collectionName}
                            onChange={handleChangeInfo}
                        />
                        <TextField
                            fullWidth
                            type='text'
                            name='designName'
                            id='designName'
                            label='Design Name'
                            value={designName}
                            onChange={handleChangeInfo}
                        />
                        <TextField
                            fullWidth
                            type='text'
                            name='options'
                            id='options'
                            label='Options'
                            value={options}
                            onChange={handleChangeInfo}
                        />


                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>


                            {
                                Object.values(imageKeyWords)?.map((item, index) => (
                                    <TextField
                                        key={index}
                                        required
                                        fullWidth
                                        type='text'
                                        name='imageKeyWords'
                                        id='imageKeyWords'
                                        label={'Key Word ' + index}
                                        value={item}
                                    // onChange={handleImageKeyWordChange(0)}
                                    />
                                ))
                            }
                        </Box>


                        <TextField
                            required
                            fullWidth
                            type='text'
                            name='imageOwner'
                            id='imageOwner'
                            label='Owner'
                            value={imageOwner}
                            onChange={handleChangeInfo}
                        />


                        <TextField
                        fullWidth
                            required
                            type='file'
                            name='fileName'
                            id='fileName'
                            onChange={handleChangeFileName}
                            inputProps={{
                                accept: '.png , .jpeg , .jpg'
                            }}


                        />

                        <Button fullWidth variant='contained' type='submit' sx={{ letterSpacing: 5, textTransform: 'none' }}>Update</Button>


                    </Box>





                </Box>

            </Modal>

        </div>
    )
}

export default ImageEdit_Modal