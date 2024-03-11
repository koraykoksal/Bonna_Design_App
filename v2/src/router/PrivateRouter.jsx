import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

export const PrivateRouter = () => {

  const {currentUser} = useSelector((state)=>state.auth)

  // const currentUser = true

  return currentUser ? <Outlet/> : <Navigate to='/' replace/>
}
