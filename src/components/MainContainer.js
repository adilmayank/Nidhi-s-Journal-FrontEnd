import JournalsContainer from './JournalsContainer'
import AddJournalContainer from './AddJournalContainer'
import React from 'react'
import fetchJournal from '../ApiCalls/fetchJournals'
import { v4 as uuidv4 } from 'uuid'
import { Stack, Typography, Box } from '@mui/material'

const MainContainer = () => {
  const [journals, setJournals] = React.useState([])

  React.useEffect(() => {
    fetchJournal().then((data) => {
      return setJournals(data)
    })
  }, [])

  const journalOperations = async (
    type,
    journalId = null,
    journalNewData = null
  ) => {
    let updatedJournals
    if (type === 'create') {
      const newId = uuidv4()
      console.log(journalNewData)
      updatedJournals = [{ id: newId, ...journalNewData }, ...journals]
    } else if (type === 'update') {
      updatedJournals = journals.map((journal, i) => {
        if (journal.id === journalId) {
          console.log({ ...journal, body: journalNewData })
          journal = { ...journal, body: journalNewData }
        }
        return journal
      })
    } else if (type === 'remove') {
      updatedJournals = journals.filter((journal) => {
        if (journal.id !== journalId) {
          return journal
        }
      })
    }
    console.log(updatedJournals)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setJournals(updatedJournals)
        resolve(true)
      }, 800)
    })
  }

  return (
    <Stack display={'grid'} rowGap={10}>
      <Box display={'flex'} justifyContent={'center'}>
        <Typography
          color={"#fff"}
          sx={{
            fontSize: "45px",
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
