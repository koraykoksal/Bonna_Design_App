import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useCallback } from 'react'
import { useState, useEffect } from 'react';
import { uploadPageBgStyle } from '../styles/globalStyle';
import { useSelector } from 'react-redux';


const ImageUpload = () => {

    const { currentUser } = useSelector((state) => state.auth)

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


    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    }

    //* string değerlerin bilgisini alan fonksiyon
    const handleChangeInfo = (e) => {
        const { value } = e.target
        setInfo({ ...info, [e.target.name]: value.toUpperCase() })
    }

    //* dosya ismini alan fonksiyon
    const handleChangeFileName = (e) => {

        const file = e.target.files[0]
        if (file) {
            setInfo(prevInfo => ({
                ...prevInfo, fileName: file.name
            }))
        }

    }

    //* key word bilgilerini alan ve dizi içine kayıt eden fonksiyon
    const handleImageKeyWordChange = (index) => (e) => {
        const { value } = e.target

        setInfo(prevInfo => ({
            ...prevInfo,
            imageKeyWords: [...prevInfo.imageKeyWords.map((item, idx) => idx == index ? value.toUpperCase() : item.toUpperCase())]
        }))
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

    // Dosya seçici input üzerinden dosyaları ele alma
    const handleInputChange = (event) => {
        handleFiles(event.target.files);
    };

    // Sürükle-bırak işlemleri için event handlerlar
    const handleDragOver = (event) => {
        event.preventDefault(); // Default davranışı engelle
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if(files.length > 0){

        }
        handleFiles(event.dataTransfer.files);
    };



    //* kayıt işlemini yapan fonksiyon
    const handleSave = (e) => {
        e.preventDefault()

    }


    console.log(info)


    return (
        <div style={uploadPageBgStyle}>

            <Box sx={{ display: 'flex', flexDirection: 'column', pt: 10, gap: 5 }}>

                <Typography align='center' color={'#000000'} letterSpacing={5} fontFamily={'Calibri'}>Upload Image</Typography>


                <Container sx={{ display: 'flex', flexDirection: 'column', gap: 5, pb: 10 }} maxWidth={'md'} >

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

                    <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        style={{ border: '2px dashed #ccc', padding: '20px', marginBottom: '10px' }}
                    >
                        Dosyayı buraya sürükleyip bırakın veya seçmek için tıklayın
                    </div>
                    <input
                        type="file"
                        onChange={handleChangeFileName}
                        style={{ display: 'none' }} // Dosya input'unu gizle
                        id="fileInput" // Input'a bir id atayarak label ile ilişkilendir
                    />
                    <input
                        type="text"
                        value={info.fileName} // Seçilen dosyanın ismini göster
                        placeholder="Dosya ismi burada görünecek"
                        readOnly // Kullanıcının değeri manuel olarak değiştirmesini engelle
                    />
                    <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                        Dosya Seç
                    </label>

                    <Button variant='contained' sx={{ letterSpacing: 5, textTransform: 'none' }} onClick={handleSave}>Save</Button>


                </Container>

            </Box>
        </div>
    )
}

export default ImageUpload