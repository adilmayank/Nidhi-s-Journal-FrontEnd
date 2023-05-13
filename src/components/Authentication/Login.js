import {
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  CardActions,
  Button,
  CardHeader,
} from '@mui/material'
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import withPublicOnly from '../HOC/withPublicOnly'

const Login = () => {
  const [username, setUsername] = React.useState('')
  const [usernameError, setUsernameError] = React.useState(false)
  const [passwordError, setPasswordError] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate()

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSignUp = () => {
    alert('This feature is coming soon.')
  }

  const handleLogin = () => {
    if (username.trim().length === 0) {
      setUsernameError(true)
    } else {
      setUsernameError(false)
    }
    if (password.trim().length === 0) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }

    if (!usernameError && !passwordError) {
      const SIGNIN_URL = 'https://journalfornidhi-backend.onrender.com/api/v1/user/signin'
      // const SIGNIN_URL = 'http://localhost:5000/api/v1/user/signin'
      const postBody = {
        username: username,
        password: password,
      }
      axios
        .post(SIGNIN_URL, postBody)
        .then((response) => {
          if (response.data.success) {
            const token = response.data.bearerToken
            localStorage.setItem('token', token)
            navigate('/')
          } else {
            alert('Invalid Credentials')
            setUsername('')
            setPassword('')
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  }

  return (
    <Stack minWidth={'100%'} marginY={'5rem'} paddingY={'1rem'}>
      <Card sx={{ minHeight: '100px' }}>
        <CardHeader
          title="User Login 😊"
          titleTypographyProps={{ color: '#000', fontWeight: '500' }}
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
                sx={{fontSize: "12px"}}
                onClick={handleSignUp}
              >
                Create Account
              </Button>
            </Box>
            <Box width={'45%'}>
              <Button
                variant="contained"
                size="small"
                fullWidth
                sx={{fontSize: "12px"}}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Box>
          </Stack>
        </CardActions>
      </Card>
    </Stack>
  )
}

export default withPublicOnly(Login)
