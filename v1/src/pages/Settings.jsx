import { Box, Typography } from '@mui/material'
import React from 'react'
import useBonnaDesign from '../hooks/useBonnaDesign'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DesignData_Table from '../components/tables/DesignData_Table'
import DeleteModal from '../components/delete/DeleteModal'
import ImageEdit_Modal from '../components/modals/ImageEdit_Modal'


const Settings = () => {

  const { getRealTime_dataFromDb,updateImageData } = useBonnaDesign()
  const { designData } = useSelector((state) => state.bonnadesign)
  const [files, setFiles] = useState("")
  const [info, setInfo] = useState({
    id: "",
    collectionName: "",
    createdUser: "",
    designName: "",
    fileName: "",
    imageCode: "",
    imageKeyWords: "",
    imageOwner: "",
    imgUrl: "",
    options: "",
    createDate: "",
    createMonth: "",
    createTime: "",
    createYear: "",
  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
  }

  const [delOpen, setdelOpen] = React.useState(false);
  const delHandleOpen = () => setdelOpen(true);
  const delHandleClose = () => setdelOpen(false);

  const [editOpen, setEditOpen] = React.useState(false);
  const editHandleOpen = () => setEditOpen(true);
  const editHandleClose = () => setEditOpen(false);


  useEffect(() => {
    getRealTime_dataFromDb()
  }, [])




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


  //* dosya ismini alan fonksiyon
  const handleChangeFileName = (e) => {

    const file = e.target.files[0]

    if (file) {
      setFiles(file)
      setInfo({...info, updateFileName: file.name || ""})
    }
    // setInfo(prevInfo => ({
    //   ...prevInfo, updateFileName: file.name
    // }))
  

  }


  const handleImageKeyWordChange = (index) => (e) => {
    const { value } = e.target
    const newChracters = turkishCharacterControl(value)
    setInfo(prevInfo => ({
      ...prevInfo,
      imageKeyWords: [...prevInfo.imageKeyWords.map((item, idx) => idx == index ? newChracters.toUpperCase() : item.toUpperCase())]
    }))
  }


  const handleUpdate = (e) => {
    console.log("update func. runn")
    e.preventDefault()
    updateImageData(files, info) //update fonksiyonu
    getRealTime_dataFromDb() //güncellenmiş datayı getir
}


  return (
    <div>


      <Box display={'flex'} flexDirection={'column'} gap={3} p={3}>

        <Typography color={'#000000'} align='center' mt={10} letterSpacing={5}>Settings</Typography>

        <DesignData_Table
          designData={designData}
          handleOpen={handleOpen}
          delHandleOpen={delHandleOpen}
          editHandleOpen={editHandleOpen}
          info={info}
          setInfo={setInfo}
        />

        <DeleteModal delOpen={delOpen} delHandleClose={delHandleClose} info={info} />

        <ImageEdit_Modal editOpen={editOpen} editHandleClose={editHandleClose} info={info} handleChangeInfo={handleChangeInfo} handleChangeFileName={handleChangeFileName} handleImageKeyWordChange={handleImageKeyWordChange} handleUpdate={handleUpdate}/>

      </Box>

    </div>
  )
}

export default Settings