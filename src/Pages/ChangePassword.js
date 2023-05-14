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

const ChangePassword = () => {
  const [currentPassword, setcurrentPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [reenteredNewPassword, setReenteredNewPassword] = React.useState('')
  const [errors, setErrors] = React.useState({
    currentPasswordError: null,
    newPasswordError: null,
    reenteredNewPasswordError: null,
  })

  const storedToken = localStorage.getItem('token')
  const authHeader = {
    headers: { Authorization: `Bearer ${storedToken}` },
  }

  const navigate = useNavigate()

  React.useEffect(() => {
    console.log('login check use effect called')
    if (!storedToken) {
      navigate('/login')
    }
  }, [])

  React.useEffect(() => {
    if (
      errors.currentPasswordError === false &&
      errors.newPasswordError === false &&
      errors.reenteredNewPasswordError === false
    ) {
      {
          const SIGNIN_URL ='https://journalfornidhi-backend.onrender.com/api/v1/user/changepassword'
        // const SIGNIN_URL = 'http://localhost:5000/api/v1/user/changepassword'
        const postBody = {
          currentPassword: currentPassword,
          newPassword: newPassword,
        }
        axios
          .patch(SIGNIN_URL, postBody, authHeader)
          .then((response) => {
            console.log(response)
            if (response.data.success) {
              navigate('/passwordChangedSuccessfully')
            } else {
              alert(response.data.error)
              setcurrentPassword('')
              setNewPassword('')
              setReenteredNewPassword('')
            }
          })
          .catch((error) => {
            console.log(error.message)
          })
      }
    }
  }, [errors])

  const handlecurrentPasswordChange = (e) => {
    setcurrentPassword(e.target.value)
  }

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const handleReenteredNewPasswordChange = (e) => {
    setReenteredNewPassword(e.target.value)
  }

  const handleBackToApp = () => {
    navigate('/')
  }

  const handlePasswordChange = () => {
    if (reenteredNewPassword !== newPassword) {
      alert('Passwords do not match. Please check again.')
      return null
    }

    setErrors({
      currentPasswordError: currentPassword.trim().length === 0,
      newPasswordError: newPassword.trim().length === 0,
      reenteredNewPasswordError: reenteredNewPassword.trim().length === 0,
    })
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
          title="Change Password"
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
                error={errors.currentPasswordError}
                required
                id="old-password"
                label="Old password"
                autoComplete="old-password"
                type="password"
                value={currentPassword}
                onChange={(e) => handlecurrentPasswordChange(e)}
              />
              <TextField
                required
                value={newPassword}
                error={errors.newPasswordError}
                id="new-password"
                label="New password"
                type="password"
                autoComplete="new-password"
                onChange={(e) => handleNewPasswordChange(e)}
              />
              <TextField
                required
                value={reenteredNewPassword}
                error={errors.reenteredNewPasswordError}
                id="reenter-new-password"
                label="Re-enter new password"
                type="password"
                autoComplete="reenter-new-password"
                onChange={(e) => handleReenteredNewPasswordChange(e)}
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
                onClick={() => handleBackToApp()}
              >
                Back To App
              </Button>
            </Box>
            <Box width={'45%'}>
              <Button
                variant="contained"
                size="small"
                fullWidth
                sx={{ fontSize: '12px' }}
                onClick={() => handlePasswordChange()}
              >
                Update
              </Button>
            </Box>
          </Stack>
        </CardActions>
      </Card>
    </Stack>
  )
}

export default ChangePassword
