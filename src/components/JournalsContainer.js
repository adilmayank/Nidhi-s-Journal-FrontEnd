import SingleJournalContainer from './SingleJournalContainer'
import PaginationComponent from './PaginationContainer'
import { Stack, Card, CardContent } from '@mui/material'
import React from 'react'

const JournalsContainer = ({ journals, journalOperations }) => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const journalsPerPage = 5
  const startIndex = (currentPage - 1) * journalsPerPage
  const endIndex = startIndex + journalsPerPage
  const journalsToShow = [...journals].slice(startIndex, endIndex)
  const totalPages = Math.ceil(journals.length / journalsPerPage)

  return (
    <section>
      <Stack spacing={3}>
        <PaginationComponent
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
        {journalsToShow.length > 0 ? (
          journalsToShow.map((journal, i) => {
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
