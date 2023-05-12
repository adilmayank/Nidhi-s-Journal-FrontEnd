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
          size="small"
          onClick={handleClick}
          endIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Box>
    </Stack>
  )
}

export default Logout
