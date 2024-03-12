import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useState } from 'react'
import ImageDetail_Modal from './modals/ImageDetail_Modal';
import { useSelector } from 'react-redux';
import { FaRegHeart } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';

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

                                // <CardActionArea key={id} style={{ maxWidth: 400, margin: "auto", marginTop: "3.5rem", marginBottom: "3.5rem" }}>


                                //     <CardMedia
                                //         loading='lazy'
                                //         component="img"
                                //         height="450"
                                //         src={item.imgUrl}
                                //         sx={{ borderRadius: '0.6rem', height: 'auto', backgroundColor: 'transparent'}}
                                //         onClick={() => handleCardClick(item)}

                                //     />

                                // </CardActionArea>
                                <Card key={id} style={{ maxWidth: 400, margin: "auto", marginTop: "3.5rem", marginBottom: "3.5rem", backgroundColor: 'transparent', cursor: 'pointer',position:'relative' }}>
                                    <CardMedia
                                        loading='lazy'
                                        component="img"
                                        height="450"
                                        src={item.imgUrl}
                                        sx={{borderRadius: '0.6rem', height: 'auto', backgroundColor: 'transparent' }}
                                        onClick={() => handleCardClick(item)}

                                    />
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            top: 0, // Bu değerleri ihtiyacınıza göre ayarlayın
                                            left: 0, // Bu değerleri ihtiyacınıza göre ayarlayın
                                            // color: 'primary.main', // İkonun rengi
                                            // backgroundColor: 'rgba(255, 255, 255, 0.7)', // İkonun arka plan rengi, saydamlık için rgba kullanıldı
                                            // borderRadius: '50%', // Yuvarlak kenarlar için
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.4)', // İkonun üzerine gelindiğinde arka plan rengi
                                            }
                                        }}
                                    >
                                        <FaRegHeart size={18}/>
                                    </IconButton>
                                </Card>
                            ))
                        )

                }

            </Box>

            <ImageDetail_Modal open={open} handleClose={handleClose} selectedData={selectedData} />



        </div>
    )
}

export default Images