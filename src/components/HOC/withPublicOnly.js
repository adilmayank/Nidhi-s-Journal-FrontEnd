import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Loading from '../Common/Loading'
import React from 'react'

const withPublicOnly = (Component) => {
  const PublicOnlyRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)
    useEffect(() => {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }, [])
    if (!isLoading) {
      if (isAuthenticated) {
        return <Navigate to="/" />
      } else {
        return <Component />
      }
    } else {
      return <Loading />
    }
  }

  return PublicOnlyRoute
}

export default withPublicOnly
