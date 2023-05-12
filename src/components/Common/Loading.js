import { Stack, Card, CardContent, Typography } from '@mui/material'

const Loading = () => {
  return (
    <Stack minWidth={'100%'} marginY={'5rem'} paddingY={'1rem'}>
      <Card>
        <CardContent sx={{padding:"16px !important"}}>
          <Typography display={"flex"} justifyContent={"center"}>Loading...</Typography>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default Loading
