import React from 'react'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, Container } from '@mui/material';
import { homePageBgStyle } from '../styles/globalStyle';
import Search from '../components/Search';
import useBonnaDesign from '../hooks/useBonnaDesign';
import Images from '../components/Images';


export const Home = () => {


  const { getAllImageData } = useBonnaDesign()

  const [imgkeys, setImgkeys] = useState([])
  const [info, setInfo] = useState({
    keywords: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setInfo({ ...info, [name]:value })
  }



  //! search butonu çalıştır
  const handleSubmit = (e) => {
    e.preventDefault()
    keywordControl(info)
  }


  //! enter tuşlanırsa çalıştır
  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      keywordControl(info)

      getAllImageData(imgkeys)
    }
  }


  //! regex işlemi ile info içerisindeki '.' ve '   ' fazladan boşluk karakterlerini kaldırır
  function keywordControl(data) {

    //?* split(' ) işlemi ile string verisini split içinde belirtilen ayıraç ile ayırarak bir array formatı oluşturulur
    const newStr = data?.keywords.replace(/[. ]+/g, ' ').toUpperCase().split(' ')
    setImgkeys(newStr)
   
  }


  return (

    <div style={homePageBgStyle}>

      <Box sx={{ display: 'flex', flexDirection: 'column', pt: 10, gap: 5 }}>

        <Typography align='center' color={'#000000'} letterSpacing={5} fontFamily={'Calibri'}>Search Image</Typography>

        <Search info={info} setInfo={setInfo} handleChange={handleChange} handleSubmit={handleSubmit} handleKeyDown={handleKeyDown} />

        <Images />

      </Box>

    </div>


  )
}
