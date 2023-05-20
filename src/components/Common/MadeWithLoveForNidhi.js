import { Card, CardContent, Typography } from '@mui/material'

const MadeInLoveForNidhi = () => {
  return (
    <Card
    elevation={2}
      sx={{
        margin: '2.5rem 0 0.5rem 0',
        height: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width:"100%"
      }}
    >
      <CardContent sx={{ padding: '0 !important' }}>
        <Typography fontSize={12} fontFamily={'sans-serif'}>
          Made with ❤️ for Nidhi
        </Typography>
      </CardContent>
    </Card>
  )
}

export default MadeInLoveForNidhi
