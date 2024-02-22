import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const Images = ({ designData }) => {

    console.log("designData: ", designData)

    return (
        <div>

            <Box display={'flex'} justifyContent={'center'} gap={3} flexWrap={'wrap'}>

                {
                    designData.map((item, id) => (

                        <CardActionArea key={id} sx={{ maxWidth: 500 }} style={{ margin: "auto", marginTop: "3.5rem", marginBottom: "3.5rem" }}>

                            <CardMedia
                                component="img"
                                height="450"
                                src={item.imgUrl}
                                sx={{ borderRadius: '0.5rem', height: 'auto' }}
                            />
                            <CardContent>
                                <Typography variant='subitle2'>Collection : {item?.collectionName}</Typography>
                            </CardContent>
                        </CardActionArea>
                    ))
                }

            </Box>


        </div>
    )
}

export default Images