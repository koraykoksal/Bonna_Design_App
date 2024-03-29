import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useState } from 'react'
import ImageDetail_Modal from './modals/ImageDetail_Modal';
import { useSelector } from 'react-redux';

const Images = ({ searchData }) => {

    const { search_Loading } = useSelector((state) => state.bonnadesign)
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

                {/* <div className='imgLoader' style={{ margin: 'auto', marginTop: 50 }}></div> */}

                {

                    search_Loading ?
                        (
                            <div className='imgLoader' style={{ margin: 'auto' }}></div>
                        )
                        :
                        (
                            searchData?.map((item, id) => (

                                <CardActionArea key={id} style={{ maxWidth: 400, margin: "auto", marginTop: "3.5rem", marginBottom: "3.5rem" }}>


                                    <CardMedia
                                        loading='lazy'
                                        component="img"
                                        height="450"
                                        src={item.imgUrl}
                                        sx={{ borderRadius: '1.2rem', height: 'auto', backgroundColor: 'transparent', p: 2 }}
                                        onClick={() => handleCardClick(item)}
                                    />

                                </CardActionArea>
                            ))
                        )

                }

            </Box>

            <ImageDetail_Modal open={open} handleClose={handleClose} selectedData={selectedData} />



        </div>
    )
}

export default Images