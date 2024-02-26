import React from 'react'
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, CardActionArea, CardHeader, Container, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useSelector } from 'react-redux';
import { editModalStyle } from '../../styles/globalStyle';



const ImageEdit_Modal = ({ info, editOpen, editHandleClose, handleChangeInfo, handleChangeFileName, handleImageKeyWordChange, handleUpdate }) => {

    const { fileUpload_Loading } = useSelector((state) => state.bonnadesign)

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


                    <Box display={'flex'} flexDirection={'column'} gap={3} alignItems={'center'} p={1} component={'form'} onSubmit={(e) => handleUpdate(e)}>

                        <img
                            style={{ maxWidth: '200px', objectFit: 'contain', margin: 'auto', display: 'block', borderRadius: 3 }}
                            src={imgUrl} loading='lazy'
                        />
                        <Typography align='center'>{collectionName}</Typography>

                        <TextField
                            required
                            fullWidth
                            type='text'
                            name='imageCode'
                            id='imageCode'
                            label='Image Code'
                            value={imageCode}
                            onChange={handleChangeInfo}
                        />
                        <TextField
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


                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>


                            {
                                Object.values(imageKeyWords)?.map((item, index) => (
                                    <TextField
                                        key={index}

                                        fullWidth
                                        type='text'
                                        name='imageKeyWords'
                                        id='imageKeyWords'
                                        label={'Key Word ' + index}
                                        value={item}
                                        sx={{ width: '245px' }}
                                        onChange={handleImageKeyWordChange(index)}
                                    />
                                ))
                            }
                        </Box>


                        <TextField
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
                            type='file'
                            name='fileName'
                            id='fileName'
                            onChange={handleChangeFileName}
                            inputProps={{
                                accept: '.png , .jpeg , .jpg'
                            }}


                        />


                        {
                            fileUpload_Loading ?
                                (
                                    <Button className='loader' sx={{ margin: 'auto' }}></Button>
                                )
                                :
                                (
                                    <Button fullWidth variant='contained' type='submit' sx={{ letterSpacing: 5, textTransform: 'none' }}>Update</Button>
                                )
                        }


                    </Box>





                </Box>

            </Modal>

        </div>
    )
}

export default ImageEdit_Modal