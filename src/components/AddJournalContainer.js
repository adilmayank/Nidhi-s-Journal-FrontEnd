import { Stack, TextField, Fab, Box, Card, CardContent } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import React from 'react'

const AddJournalContainer = ({ journalOperations }) => {
  const newJournalEntry = React.useRef()

  const handleClick = () => {
    const journalBody = newJournalEntry.current.value

    if (journalBody.trim() !== '') {
      journalOperations('create', null, journalBody).then((success) => {
        if (success) {
          newJournalEntry.current.value = ''
        }
      })
    }
  }

  return (
    <Stack rowGap={3}>
      <Card width={'100%'} color={'white'} elevation={3}>
        <CardContent sx={{ padding: '15px !important' }}>
          <TextField
            placeholder="Your thoughts go here..."
            inputRef={newJournalEntry}
            multiline={true}
            sx={{ width: '100%', fontSize: 12 }}
          />
        </CardContent>
      </Card>
      <Box display={'flex'} width={'100%'} justifyContent={'center'}>
        <Fab
          color="primary"
          size={'small'}
          aria-label="add"
          onClick={() => handleClick()}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Stack>
  )
}

export default AddJournalContainer
