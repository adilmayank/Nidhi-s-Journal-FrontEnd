import { Card, CardContent } from "@mui/material"

const LoadingContainer = () => {
  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '12px !important',
        }}
      >
        Loading. Please wait!
      </CardContent>
    </Card>
  )
}

export default LoadingContainer