import { Box, Stack, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ChangePasswordButton = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    // navigate to change password page
    navigate("/changePassword")
  }
  return (
    <Stack>
      <Box display={'flex'} justifyContent={'flex-end'}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#DE9A00',
            "&:hover": {backgroundColor: '#C98B00'},
            color: '#fff',
            height: '2rem',
            fontSize: '10px',
          }}
          onClick={handleClick}
        >
          Change Password
        </Button>
      </Box>
    </Stack>
  )
}

export default ChangePasswordButton
