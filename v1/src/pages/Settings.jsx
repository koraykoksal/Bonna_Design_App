import { Box, Typography } from '@mui/material'
import React from 'react'
import useBonnaDesign from '../hooks/useBonnaDesign'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DesignData_Table from '../components/tables/DesignData_Table'
import DeleteModal from '../components/delete/DeleteModal'


const Settings = () => {

  const { getFile_and_Image_data, getRealTime_dataFromDb } = useBonnaDesign()
  const { designData } = useSelector((state) => state.bonnadesign)

  const [info, setInfo] = useState([])

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
  }

  const [delOpen, setdelOpen] = React.useState(false);
  const delHandleOpen = () => setdelOpen(true);
  const delHandleClose = () => setdelOpen(false);


  useEffect(() => {
    getRealTime_dataFromDb()
  }, [])


  useEffect(() => {
    
    const result = designData.map(item=>{
      return{
        id:item.id,

      }
    })

  }, [designData])
  

  console.log(designData)

  return (
    <div>


      <Box display={'flex'} flexDirection={'column'} gap={3} p={3}>

        <Typography color={'#000000'} align='center' mt={10} letterSpacing={5}>Settings</Typography>

        <DesignData_Table
          designData={designData}
          handleOpen={handleOpen}
          delHandleOpen={delHandleOpen}
          info={info}
          setInfo={setInfo}
        />

        <DeleteModal delOpen={delOpen} delHandleClose={delHandleClose} info={info} />

      </Box>

    </div>
  )
}

export default Settings