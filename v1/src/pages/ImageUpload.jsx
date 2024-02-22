import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useCallback } from 'react'
import { useState, useEffect } from 'react';
import { uploadPageBgStyle } from '../styles/globalStyle';
import { useSelector } from 'react-redux';
import useBonnaDesign from '../hooks/useBonnaDesign';
import { toastWarnNotify } from '../helper/ToastNotify';


const ImageUpload = () => {

    const { currentUser } = useSelector((state) => state.auth)
    const { fileUpload_Loading } = useSelector((state) => state.bonnadesign)

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

            setInfo(prevInfo => ({
                ...prevInfo, fileName: file.name
            }))
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


    // Sürükle-bırak işlemleri için event handlerlar
    const handleDragOver = (event) => {
        event.preventDefault(); // Default davranışı engelle
    };


    // Sürükle bırak işleminde resim dosyası bırakıldığı zaman yapılacak işlem
    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {

            handleFiles(e.dataTransfer.files);
        }

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


  

    return (
        <div style={uploadPageBgStyle}>

            <Box sx={{ display: 'flex', flexDirection: 'column', pt: 10, gap: 5 }}>

                <Typography align='center' color={'#000000'} letterSpacing={5} fontFamily={'Calibri'}>Upload Image</Typography>


                <Container sx={{ display: 'flex', flexDirection: 'column', gap: 5, pb: 10 }} maxWidth={'md'} component={'form'} onSubmit={handleSave}>

                    <TextField
                        fullWidth
                        type='text'
                        name='imageCode'
                        id='imageCode'
                        label='Image Code'
                        value={info.imageCode}
                        onChange={handleChangeInfo}
                    />
                    <TextField
                        required
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
                        label='Options'
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
                        required
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
                        style={{ border: '2px dashed #ccc', padding: '20px', marginBottom: '10px', borderRadius: 5, height: 130, position: 'relative' }}
                    >

                        <Typography color={'#bebebe'} align='center'>
                            {
                                info.fileName ? info.fileName : 'Image Move Here'
                            }
                        </Typography>

                        <input
                            id='fileInput'
                            onChange={handleChangeFileName}
                            style={{ bottom: 10, position: 'absolute' }}
                            type='file'
                            accept='.png , .jpeg , .jpg'
                        />
                    </div> */}

                    {
                        fileUpload_Loading ?
                            (
                                <Button className='loader' sx={{ margin: 'auto' }}></Button>
                            )
                            :
                            (
                                <Button variant='contained' type='submit' sx={{ letterSpacing: 5, textTransform: 'none' }}>Save</Button>
                            )
                    }




                </Container>

            </Box>
        </div>
    )
}

export default ImageUpload