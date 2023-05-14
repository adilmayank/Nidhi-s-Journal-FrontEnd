import LogoutButton from './LogoutButton'
import ChangePasswordButton from './ChangePasswordButton'
import { Stack } from '@mui/material'

const AdminControls = () => {
  return (
    <Stack display={'flex'} direction={'row'} justifyContent={'space-between'}>
      <ChangePasswordButton />
      <LogoutButton />
    </Stack>
  )
}

export default AdminControls

// #1976d2
// #1976d2