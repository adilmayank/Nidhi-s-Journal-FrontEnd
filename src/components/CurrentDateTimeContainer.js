import React from 'react'
import { Stack, Typography } from '@mui/material'

const DateTimeContainer = () => {
  const [date, setDate] = React.useState(new Date())

  React.useEffect(() => {
    const timerId = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [])

  return (
    <Stack direction={'column'} justifyContent={'space-between'}>
      <Typography sx={{ fontSize: 12 }} color="white" gutterBottom>
        Date - {date.toLocaleDateString()}
      </Typography>
      <Typography sx={{ fontSize: 12 }} color="white" gutterBottom>
        Time - {date.toLocaleTimeString()}
      </Typography>
    </Stack>
  )
}

export default DateTimeContainer
