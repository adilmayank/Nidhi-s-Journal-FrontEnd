import {
  Stack,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material'

import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }
  return (
    <Stack minWidth={'100%'} marginY={'5rem'} paddingY={'1rem'}>
      <Card sx={{ padding: '1rem' }}>
        <CardContent sx={{ marginBlock: '0.5rem 2.5rem' }}>
          <Typography
            fontSize={'1.8rem'}
            display={'flex'}
            justifyContent={'center'}
          >
            Page not found.
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" size="small" onClick={handleClick}>
            Go To Home
          </Button>
        </CardActions>
      </Card>
    </Stack>
  )
}

export default PageNotFound
