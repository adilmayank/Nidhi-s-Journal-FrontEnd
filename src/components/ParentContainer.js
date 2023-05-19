import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Container, Grid } from '@mui/material'
import withAuth from './HOC/withAuth'
import MainContainer from './MainContainer'
import Login from './Authentication/Login'
import Signup from './Authentication/SignUp'
import ChangePassword from '../Pages/ChangePassword'
import PasswordChangedSuccessfully from './Common/PasswordChangedSuccessfully'
import PageNotFound from './Common/PageNotFound'

const MainWithAuth = withAuth(MainContainer)

const ParentContainer = () => {
  return (
    <BrowserRouter>
      <section className="parent-container">
        <Container maxWidth="xs" sx={{ marginBlock: '20px 40px' }}>
          <Grid container>
            <Routes>
              <Route path="/" Component={MainWithAuth} />
              <Route path="/login" Component={Login} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/changePassword" element={<ChangePassword />} />
              <Route path="/passwordChangedSuccessfully" element={<PasswordChangedSuccessfully />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Grid>
        </Container>
      </section>
    </BrowserRouter>
  )
}

export default ParentContainer
