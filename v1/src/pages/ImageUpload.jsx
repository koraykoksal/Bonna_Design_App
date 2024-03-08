import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useCallback } from 'react'
import { useState, useEffect } from 'react';
import { uploadPageBgStyle } from '../styles/globalStyle';
import { useSelector } from 'react-redux';
import useBonnaDesign from '../hooks/useBonnaDesign';
import { toastWarnNotify } from '../helper/ToastNotify';
import { NotFound } from './NotFound';
import { useNavigate } from 'react-router-dom';
import { testData } from '../helper/data'
import { element } from 'prop-types';

const ImageUpload = () => {

    const { currentUser, userInfo } = useSelector((state) => state.auth)
    const { fileUpload_Loading } = useSelector((state) => state.bonnadesign)
    const [imgDrops, setImgDrops] = useState([])
    const { postImageDataToFirebase } = useBonnaDesign()
    const [files, setFiles] = useState("")
    const [info, setInfo] = useState({
        imageCode: "",
        collectionName: "",
        designName: "",
        options: "",
        fileName: "",
        imageKeyWords: Array(5).fill(''), // Başlangıçta 5 boş string ile doldurulmuş bir dizi
        imageOwner: "",
        createdUser: currentUser,
        createYear: new Date().getFullYear(),
        createMonth: new Date().getMonth() + 1,
        createDate: new Date().getDate(),
        createTime: new Date().getHours() + ":" + new Date().getMinutes()
    })
    const [fileNames, setFileNames] = useState([])
    const [imgFile, setImgFile] = useState([])

    const navigate = useNavigate()

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


    //* key word bilgilerini alan ve dizi içine kayıt eden fonksiyon
    const handleImageKeyWordChange = (index) => (e) => {
        const { value } = e.target
        const newChracters = turkishCharacterControl(value)
        setInfo(prevInfo => ({
            ...prevInfo,
            imageKeyWords: [...prevInfo.imageKeyWords.map((item, idx) => idx == index ? newChracters.toUpperCase() : item.toUpperCase())]
        }))
    }



    //* dosya ismini alan fonksiyon
    const handleChangeFileName = (e) => {

        const file = e.target.files[0]

        if (file) {
            setFiles(file)
            setInfo({ ...info, fileName: file.name })
        }

    }


    // Dosya sürükle-bırak ve seçme işlemini ele alacak fonksiyon
    const handleFiles = useCallback((files) => {
        const file = files[0]; // Örnek olarak, sadece ilk dosyayı alıyoruz
        if (file && file.type.startsWith('image/')) {
            setInfo(prevInfo => ({
                ...prevInfo,
                fileName: file.name
            }));
        }
    }, []);


    // Sürükle bırak işleminde resim dosyası bırakıldığı zaman yapılacak işlem
    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;

        //! [key, value] burada kullanılan köşeli parantez işleminde destructuring assignment işlemi kullanılmıştır.Bu sayede files içerisindeki datanın value değerine doğrudan ulaşılabilir.
        const uploadFileName = Object.entries(files).map(([key, value]) => value.name);

        // toplu yüklenen resimlerin isimlerini yakala ve state bilgisini gönder
        setFileNames(uploadFileName)

        // yüklenecen resim dosyalarını yakala ve statee gönder
        const img = (Object.entries(files).map(([key, value]) => value))
        setImgFile(img)


        if (files.length > 0) {

            handleFiles(e.dataTransfer.files);
        }

    };

    // Sürükle-bırak işlemleri için event handlerlar
    const handleDragOver = (event) => {
        event.preventDefault(); // Default davranışı engelle
    };



    //! kayıt işlemini yapan fonksiyon
    const handleSave = (e) => {

        e.preventDefault()

        postImageDataToFirebase(files, info)

        setInfo({
            imageCode: "",
            collectionName: "",
            designName: "",
            options: "",
            fileName: "",
            imageKeyWords: Array(5).fill(''), // Başlangıçta 5 boş string ile doldurulmuş bir dizi
            imageOwner: ""
        })

    }


    const topluGonder = (data) => {

        // resim dosyalarının image key değerlerini bir array içerisinde göster exp:['key1','key2']
        //* excelden gelen data
        const imgInfo = data.map(item => {
            return {
                ...item, imageKeyWords: item.imageKeyWords.split('-')
            }
        });

        const sonuc = imgFile.map(element => {
            // eşleştirme yap
            const info = imgInfo.find(element2 => element.name === element2.fileName)
            const newInfo = {
                ...info,
                createdUser: currentUser,
                createYear: new Date().getFullYear(),
                createMonth: new Date().getMonth() + 1,
                createDate: new Date().getDate(),
                createTime: new Date().getHours() + ":" + new Date().getMinutes()
            }
            postImageDataToFirebase(element, newInfo)

        })


    }


    return (
        <div style={uploadPageBgStyle}>

            {
                userInfo?.user?.isController ?
                    (
                        <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, gap: 5 }}>

                            <Typography align='center' color={'#000000'} letterSpacing={5} fontFamily={'Calibri'} mt={10}>Upload Image</Typography>


                            <Container sx={{ display: 'flex', flexDirection: 'column', gap: 5, pb: 10 }} maxWidth={'md'} component={'form'} onSubmit={handleSave}>

                                <TextField
                                    required
                                    fullWidth
                                    type='text'
                                    name='imageCode'
                                    id='imageCode'
                                    label='Image Code'
                                    value={info.imageCode}
                                    onChange={handleChangeInfo}
                                />
                                <TextField
                                    fullWidth
                                    type='text'
                                    name='collectionName'
                                    id='collectionName'
                                    label='Collection Name'
                                    value={info.collectionName}
                                    onChange={handleChangeInfo}
                                />
                                <TextField
                                    fullWidth
                                    type='text'
                                    name='designName'
                                    id='designName'
                                    label='Design Name'
                                    value={info.designName}
                                    onChange={handleChangeInfo}
                                />
                                <TextField
                                    fullWidth
                                    type='text'
                                    name='options'
                                    id='options'
                                    label='Application'
                                    value={info.options}
                                    onChange={handleChangeInfo}
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>

                                    <TextField
                                        required
                                        fullWidth
                                        type='text'
                                        name='imageKeyWords'
                                        id='imageKeyWords'
                                        label='Key Word 1'
                                        value={info.imageKeyWords[0]}
                                        onChange={handleImageKeyWordChange(0)}
                                    />
                                    <TextField
                                        fullWidth
                                        type='text'
                                        name='imageKeyWords'
                                        id='imageKeyWords'
                                        label='Key Word 2'
                                        value={info.imageKeyWords[1]}
                                        onChange={handleImageKeyWordChange(1)}
                                    />
                                    <TextField
                                        fullWidth
                                        type='text'
                                        name='imageKeyWords'
                                        id='imageKeyWords'
                                        label='Key Word 3'
                                        value={info.imageKeyWords[2]}
                                        onChange={handleImageKeyWordChange(2)}
                                    />
                                    <TextField
                                        fullWidth
                                        type='text'
                                        name='imageKeyWords'
                                        id='imageKeyWords'
                                        label='Key Word 4'
                                        value={info.imageKeyWords[3]}
                                        onChange={handleImageKeyWordChange(3)}
                                    />
                                    <TextField
                                        fullWidth
                                        type='text'
                                        name='imageKeyWords'
                                        id='imageKeyWords'
                                        label='Key Word 5'
                                        value={info.imageKeyWords[4]}
                                        onChange={handleImageKeyWordChange(4)}
                                    />
                                </Box>



                                <TextField
                                    fullWidth
                                    type='text'
                                    name='imageOwner'
                                    id='imageOwner'
                                    label='Owner'
                                    value={info.imageOwner}
                                    onChange={handleChangeInfo}
                                />

                                <TextField
                                    required
                                    type='file'
                                    name='fileName'
                                    id='fileName'
                                    onChange={handleChangeFileName}
                                    inputProps={{
                                        accept: '.png , .jpeg , .jpg'
                                    }}
                                />

                                {/* <div
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    style={{ border: '2px dashed #ccc', padding: '20px', marginBottom: '10px', borderRadius: 5, height: 130, position: 'relative', overflow: 'auto' }}
                                >

                                    {
                                        fileNames.length > 0 ? fileNames.map((item, index) => (
                                            <Typography key={index} color={'#bebebe'} align='center'>{item}</Typography>
                                        ))
                                            :
                                            <Typography color={'#bebebe'} align='center'>Image Move Here</Typography>
                                    }

                                </div>

                                <Button variant='outlined' onClick={() => topluGonder(testData)}>Send</Button> */}

                                {
                                    fileUpload_Loading ?
                                        (
                                            <div className='loader' style={{margin:'auto'}}></div>
                                        )
                                        :
                                        (
                                            <Button variant='contained' type='submit' sx={{ letterSpacing: 5, textTransform: 'none' }}>Save</Button>
                                        )
                                }




                            </Container>

                        </Box>
                    )
                    :
                    (
                        <NotFound />
                    )
            }


        </div>
    )
}

export default ImageUpload