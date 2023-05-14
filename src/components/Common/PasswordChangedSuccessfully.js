import { Stack, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PasswordChangedSuccessfully = () => {
  const [countdown, setCountdown] = React.useState(5)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  React.useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  React.useEffect(() => {
    localStorage.removeItem('token')

    const countdownInterval = setInterval(() => {
      setCountdown((countdown) => countdown - 1)
    }, 1000)

    if (countdown === 0) {
      clearInterval(countdownInterval)
      navigate('/login')
    }

    return () => {
      clearInterval(countdownInterval)
    }
  }, [countdown])

  return (
    <Stack minWidth={'100%'} marginY={'5rem'} paddingY={'1rem'}>
      <Card>
        <CardContent
          sx={{ display: 'grid', rowGap: '0.8rem', padding: '16px !important' }}
        >
          <Typography display={'flex'} justifyContent={'center'}>
            Password changed successfully.
          </Typography>
          <Typography display={'flex'} justifyContent={'center'}>
            Redirecting to login page in {countdown} seconds.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default PasswordChangedSuccessfully
