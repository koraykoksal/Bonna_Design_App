import React from 'react'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, Container } from '@mui/material';
import { homePageBgStyle } from '../styles/globalStyle';
import Search from '../components/Search';
import useBonnaDesign from '../hooks/useBonnaDesign';
import Images from '../components/Images';
import { toastWarnNotify } from '../helper/ToastNotify';
import { useSelector } from 'react-redux';


export const Home = () => {

  const { getImageData } = useBonnaDesign()
  const { searchData } = useSelector((state) => state.bonnadesign)
  const [info, setInfo] = useState({
    keywords: ""
  })


  //?* türkçe karakterleri engelleyen fonksiyon
  function turkishCharacterControl(chracter) {
    return chracter.replace(/[çğşüöÇĞİŞÜÖ]/g, '')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const index = turkishCharacterControl(value)
    setInfo({ ...info, [name]: index })
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
    }
  }


  //! regex işlemi ile info içerisindeki '.' ve '   ' fazladan boşluk karakterlerini kaldırır
  function keywordControl(data) {
    //?* split(' ) işlemi ile string verisini split içinde belirtilen ayıraç ile ayırarak bir array formatı oluşturulur
    const newStr = data?.keywords.replace(/[. ]+/g, ' ').toUpperCase().split(' ')
    //! hook tarafındaki resim datasına erişmek için dosyayı bul
    getImageData(newStr)
    return setInfo({ ...info, newStr })
  }




  return (

    <div style={homePageBgStyle}>

      <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, gap: 5 }}>

        <Typography align='center' color={'#000000'} letterSpacing={5} fontFamily={'Calibri'} mt={10}>Search Image</Typography>

        <Search info={info} setInfo={setInfo} handleChange={handleChange} handleSubmit={handleSubmit} handleKeyDown={handleKeyDown} />

        <Images searchData={searchData} />

      </Box>

    </div>


  )
}
