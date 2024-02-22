import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useState } from 'react'
import ImageDetail_Modal from './modals/ImageDetail_Modal';

const Images = ({ designData }) => {

    const [selectedData, setSelectedData] = useState([]);

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    }

    const handleCardClick = (data) => {
        setSelectedData(data)
        setOpen(true)
    }

    return (
        <div>

            <Box display={'flex'} justifyContent={'center'} gap={3} flexWrap={'wrap'}>

                {
                    designData?.map((item, id) => (

                        <CardActionArea key={id} style={{ maxWidth: 500, margin: "auto", marginTop: "3.5rem", marginBottom: "3.5rem" }}>


                            <CardMedia
                                loading='lazy'
                                component="img"
                                height="450"
                                src={item.imgUrl}
                                sx={{ borderRadius: '0.5rem', height: 'auto', backgroundColor: 'transparent' }}
                                onClick={() => handleCardClick(item)}
                            />


                            {/* <CardContent sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                                <Typography variant='subitle2'>Collection : {item?.collectionName}</Typography>
                                <Typography variant='subitle2'>Designer : {item?.imageOwner}</Typography>
                            </CardContent> */}

                        </CardActionArea>
                    ))
                }

            </Box>

            <ImageDetail_Modal open={open} handleClose={handleClose} selectedData={selectedData} />

        </div>
    )
}

export default Images