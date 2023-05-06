import JournalsContainer from './JournalsContainer'
import AddJournalContainer from './AddJournalContainer'
import React from 'react'
import fetchJournal from '../ApiCalls/fetchJournals'
import { v4 as uuidv4 } from 'uuid'
import { Stack, Typography, Box } from '@mui/material'

const MainContainer = () => {
  const [journals, setJournals] = React.useState([])

  React.useEffect(() => {
    fetch('https://journalfornidhi-backend.onrender.com/api/v1/journals')
      .then((response) => response.json())
      .then((data) => setJournals(data))
      .catch((error) => console.error(error))
  }, [])

  const journalOperations = async (
    type,
    journalId = null,
    journalNewBody = null
  ) => {
    let updatedJournals
    //
    //
    // Create Journal
    //
    //
    if (type === 'create') {
      fetch('https://journalfornidhi-backend.onrender.com/api/v1/journals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: journalNewBody }),
      })
        .then((response) => response.json())
        .then((data) => setJournals([...data]))
        .catch((error) => console.error(error))
    }
    //
    //
    // Update Journal
    //
    //
    else if (type === 'update') {
      console.log(journalId)
      fetch(
        `https://journalfornidhi-backend.onrender.com/api/v1/journals/${journalId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ body: journalNewBody }),
        }
      )
        .then((response) => response.json())
        .then((data) => setJournals([...data]))
        .catch((error) => console.error(error))
    }
    //
    //
    // Remove Journal
    //
    //
    else if (type === 'remove') {
      fetch(
        `https://journalfornidhi-backend.onrender.com/api/v1/journals/${journalId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setJournals([...data]))
        .catch((error) => console.error(error))
    }
  }

  return (
    <Stack display={'grid'} rowGap={10}>
      <Box display={'flex'} justifyContent={'center'}>
        <Typography
          color={'#fff'}
          sx={{
            fontSize: '45px',
            fontFamily: "'Darumadrop One', cursive",
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          Nidhi's Journal
        </Typography>
      </Box>
      <AddJournalContainer journalOperations={journalOperations} />
      <JournalsContainer
        journals={journals}
        journalOperations={journalOperations}
      />
    </Stack>
  )
}

export default MainContainer
