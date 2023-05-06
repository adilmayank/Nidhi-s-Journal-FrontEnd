import { Card, CardContent } from '@mui/material'

const ErrorContainer = ({ message }) => {
  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '12px !important',
        }}
      >
        {message}
      </CardContent>
    </Card>
  )
}

export default ErrorContainer
