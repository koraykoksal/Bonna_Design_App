import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { NotFound } from '../pages/NotFound'
import { BrowserRouter } from 'react-router-dom'
import { PrivateRouter } from './PrivateRouter'
import Dashboard from '../pages/Dashboard'
import ImageUpload from '../pages/ImageUpload'



export const AppRouter = () => {
  return (

    <>
      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Login />} />

          <Route path='bonnadesign' element={<PrivateRouter />}>
            <Route path='' element={<Dashboard />}>
              <Route index element={<Home />} />
              <Route path='imageupload' element={<ImageUpload/>}/>
            </Route>

          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}
