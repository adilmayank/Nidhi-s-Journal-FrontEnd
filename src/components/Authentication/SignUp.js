import {
  Stack,
  Card,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Button,
  Box,
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import withPublicOnly from '../HOC/withPublicOnly'
import axios from 'axios'

const Signup = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [reenteredPassword, setReenteredPassword] = React.useState('')
  const [usernameError, setUsernameError] = React.useState(false)
  const [passwordError, setPasswordError] = React.useState(false)
  const [reenterPasswordError, setReenteredPasswordError] =
    React.useState(false)
  const [isSigningUp, setIsSigningUp] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (
      isSigningUp &&
      !usernameError &&
      !passwordError &&
      !reenterPasswordError
    ) {
      const SIGNUP_URL = 'https://journalfornidhi-backend.onrender.com/api/v1/user/signup'
      // const SIGNUP_URL = 'http://localhost:5000/api/v1/user/signup'
      const postBody = {
        username: username,
        password: password,
        reenteredPassword: reenteredPassword,
      }
      axios.post(SIGNUP_URL, postBody)
        .then((response) => {
          if (response.data.success) {
            const token = response.data.bearerToken
            localStorage.setItem('token', token)
            navigate('/')
          } else {
            alert(response.data.error)
            setUsername('')
            setPassword('')
            setReenteredPassword('')
            setUsernameError(false)
            setPasswordError(false)
            setReenteredPasswordError(false)
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
        .finally(() => {
          setIsSigningUp(false)
        })
    }
  }, [isSigningUp])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleReenteredPasswordChange = (e) => {
    setReenteredPassword(e.target.value)
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handleSignup = () => {
    if (username.trim().length === 0) {
      setUsernameError(true)
    }
    if (password.trim().length === 0) {
      setPasswordError(true)
    }
    if (reenteredPassword.trim().length === 0) {
      setReenteredPasswordError(true)
    }

    if (password !== reenteredPassword) {
      alert('Password do not match. Please try again')
      return null
    }

    // setting isSigningUp true to kick off an effect that will call the external API to sign up.
    setIsSigningUp(true)
  }

  return (
    <Stack minWidth={'100%'} marginY={'5rem'} paddingY={'1rem'}>
      <Card
        sx={{
          minHeight: '100px',
          backdropFilter: 'blur(8px)',
        }}
      >
        <CardHeader
          title="Create User Account"
          titleTypographyProps={{
            display: 'flex',
            justifyContent: 'center',
            fontFamily: '"Poppins"',
            color: '#000',
            fontWeight: '500',
          }}
        />
        <CardContent sx={{ marginBlock: '1rem' }}>
          <Box component={'form'}>
            <Stack rowGap={2}>
              <TextField
                error={usernameError}
                required
                id="outlined-required"
                label="User Name"
                value={username}
                onChange={(e) => handleUsernameChange(e)}
              />
              <TextField
                required
                value={password}
                error={passwordError}
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => handlePasswordChange(e)}
              />
              <TextField
                required
                value={reenteredPassword}
                error={reenterPasswordError}
                id="outlined-reenter-password-input"
                label="Re-enter Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => handleReenteredPasswordChange(e)}
              />
            </Stack>
          </Box>
        </CardContent>
        <CardActions sx={{ marginBlock: '2.5rem 1rem' }}>
          <Stack
            display={'flex'}
            direction={'row'}
            justifyContent={'space-between'}
            rowGap={2}
            width={'100%'}
            paddingX={'0.5rem'}
          >
            <Box width={'45%'}>
              <Button
                variant="outlined"
                fullWidth
                size="small"
                sx={{ fontSize: '12px' }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Box>
            <Box width={'45%'}>
              <Button
                variant="contained"
                size="small"
                fullWidth
                sx={{ fontSize: '12px' }}
                onClick={handleSignup}
              >
                Create Account
              </Button>
            </Box>
          </Stack>
        </CardActions>
      </Card>
    </Stack>
  )
}

export default withPublicOnly(Signup)
