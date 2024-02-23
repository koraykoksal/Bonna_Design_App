import React from 'react'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material'


const DesignData_Table = ({ designData, info, setInfo, delHandleOpen, handleOpen }) => {

    console.log(JSON.stringify(designData))

    const dataGrid_Columns = [
        // {
        //     field: "id",
        //     headerName: "ID",
        //     minWidth: 150,
        //     headerAlign: "center",
        //     align: "center",
        //     flex: 1,
        // },
        {
            field: "collectionName",
            headerName: "Collection Name",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "designName",
            headerName: "Design Name",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "options",
            headerName: "Options",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "imageKeyWords",
            headerName: "KeyWords ",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "imgUrl",
            headerName: "Image ",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => (
                <img loading='lazy' src={params.value} alt="" style={{ width: '85px', height: 'auto',objectFit:'cover'}} />
              ),
        },
        {
            field: "imageOwner",
            headerName: "Designer",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },


        {
            field: "actions",
            headerName: "Action",
            minWidth: 120,
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({ id,
                row: {
                    is_merkezi,
                    yogunluk,
                    nozzlecap,
                    kasetsicaklik,
                    tankbasinc,
                    astarkalinlik,
                    astarlamayapankisi,
                    aciklama,
                    redkabul,
                    urun_kodu,
                } }) => {
                return [
                    <GridActionsCellItem
                        key={"edit"}
                        icon={<AiFillEdit size={25} style={{ color: '#0802A3' }} cursor='pointer' />}
                        label="Edit"
                        onClick={() => {
                            handleOpen()
                            setInfo({
                                id,
                                type: 'Astarlama',
                                is_merkezi,
                                yogunluk,
                                nozzlecap,
                                kasetsicaklik,
                                tankbasinc,
                                astarkalinlik,
                                astarlamayapankisi,
                                aciklama,
                                redkabul,
                                urun_kodu,
                            })
                        }}

                    />,
                    <GridActionsCellItem
                        key={"delete"}
                        icon={<MdDelete size={25} style={{ color: '#D80032' }} cursor='pointer' />}
                        label="Delete"
                        onClick={() => {
                            delHandleOpen()
                            setInfo({ id, type: 'Astarlama' })
                        }}

                    />,
                ]
            },
        },

    ];


    return (
        <div>
            <Box sx={{ mt: 5 }}>
                <DataGrid
                    columns={dataGrid_Columns}
                    rows={designData}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10, 25, 50, 75, 100]}
                    slots={{ toolbar: GridToolbar }}
                    disableRowSelectionOnClick
                    sx={{
                        boxShadow: 4,
                    }}
                />
            </Box>

        </div>
    )
}

export default DesignData_Table