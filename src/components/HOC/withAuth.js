import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { Card, CardContent, Stack, Typography } from '@mui/material'
import Loading from '../Common/Loading'

const withAuth = (Component) => {
  const AuthRoute = () => {
    const storedToken = localStorage.getItem('token')
    const [authenticated, setAuthenticated] = React.useState(
      storedToken ? true : false
    )
    const [isLoading, setIsLoading] = React.useState(true)

    useEffect(() => {
      const fetchAuth = async () => {
        try {
          if (storedToken) {
            const AUTHENTICATE_URL = 'https://journalfornidhi-backend.onrender.com/api/v1/user/authenticate'
            // const AUTHENTICATE_URL =
            //   'http://localhost:5000/api/v1/user/authenticate'
            const response = await axios.get(AUTHENTICATE_URL, {
              headers: { Authorization: `Bearer ${storedToken}` },
            })
            if (response.data.success) {
              setAuthenticated(true)
            } else {
              localStorage.removeItem("token")
              alert(`${response.data.error}. Please login to continue.`)
              setAuthenticated(false)
            }
          } else {
            setAuthenticated(false)
          }
          setIsLoading(false)
        } catch (error) {
          console.log(error)
          setAuthenticated(false)
          setIsLoading(false)
        }
      }
      fetchAuth()
    }, [])
    if (isLoading) {
      return <Loading />
    }
    if (!authenticated) {
      return <Navigate to="/login" />
    }

    return <Component />
  }

  return AuthRoute
}

export default withAuth
