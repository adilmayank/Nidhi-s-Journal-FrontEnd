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
            const response = await axios.get(
              'http://localhost:5000/api/v1/user/authenticate',
              {
                headers: { Authorization: `Bearer ${storedToken}` },
              }
            )
            if (response.data.success) {
              console.log(response.data.success)
              setAuthenticated(true)
              setIsLoading(false)
            }
          } else {
            setAuthenticated(false)
            setIsLoading(false)
          }
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
      }

      fetchAuth()
    }, [])
    if (isLoading) {
      return <Loading />
    }
    if (!authenticated) {
      console.log(`Authenticated? :${authenticated}`)
      return <Navigate to="/login" />
    }

    return <Component />
  }

  return AuthRoute
}

export default withAuth
