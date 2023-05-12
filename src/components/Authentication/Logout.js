import { Box, Stack, IconButton, Button } from '@mui/material'
import { Logout as LogoutIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <Stack>
      <Box display={'flex'} justifyContent={'flex-end'}>
      <Button
        variant="contained"
        sx={{
          color: '#fff',
          width: '100px',
          fontSize: '10px',
        }}
          onClick={handleClick}
          endIcon={<LogoutIcon sx={{scale:"0.8"}} />}
        >
          Logout
        </Button>
      </Box>
    </Stack>
  )
}

export default Logout
