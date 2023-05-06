import SingleJournalContainer from './SingleJournalContainer'
import { Stack, Card, CardContent } from '@mui/material'
import React from 'react'

const JournalsContainer = ({
  journals,
  journalOperations,
  apiErrors,
  loading,
}) => {

  return (
    <section>
      <Stack spacing={3}>
        {journals.length > 0 ? (
          journals.map((journal, i) => {
            return (
              <SingleJournalContainer
                key={journal._id}
                id={journal._id}
                date={journal.date}
                time={journal.time}
                body={journal.body}
                journalOperations={journalOperations}
              />
            )
          })
        ) : (
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '12px !important',
              }}
            >
              No entries found. Go write your heart out!!
            </CardContent>
          </Card>
        )}
      </Stack>
    </section>
  )
}

export default JournalsContainer
