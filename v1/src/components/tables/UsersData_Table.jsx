import React from 'react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material'


const UsersData_Table = ({ users, handleOpen, info, setInfo, delHandleOpen, editHandleOpen }) => {

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
            field: "name",
            headerName: "Name",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "surname",
            headerName: "Surname",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "isAdmin",
            headerName: "Admin",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "isController",
            headerName: "Controller",
            minWidth: 100,
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
                    name,
                    surname,
                    password,
                    isAdmin,
                    isController,
                    email,
                }
            }) => {
                return [
                    <GridActionsCellItem
                        key={"edit"}
                        icon={<MdEdit size={25} style={{ color: '#FAA300' }} cursor='pointer' />}
                        label="Edit"
                        onClick={() => {
                            handleOpen()
                            setInfo({
                                id,
                                name,
                                surname,
                                password,
                                isAdmin,
                                isController,
                                email,
                            })
                        }}

                    />,
                    <GridActionsCellItem
                        key={"delete"}
                        icon={<MdDelete size={25} style={{ color: '#D80032' }} cursor='pointer' />}
                        label="Delete"
                        onClick={() => {
                            delHandleOpen()
                            setInfo({
                                id,
                                name,
                                surname,
                                password,
                                isAdmin,
                                isController,
                                email,
                                type: "users"
                            })
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
                    rows={users}
                    getRowId={(row) => row._id}
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

export default UsersData_Table