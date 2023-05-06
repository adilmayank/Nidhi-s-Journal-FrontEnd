import SingleJournalContainer from './SingleJournalContainer'
import { Stack } from '@mui/material'

const JournalsContainer = ({ journals, journalOperations }) => {
  return (
    <section>
      <Stack spacing={3}>
        {journals.map((journal, i) => {
          return (
            <SingleJournalContainer
              key={journal.id}
              id={journal.id}
              date={journal.date}
              body={journal.body}
              journalOperations={journalOperations}
            />
          )
        })}
      </Stack>
    </section>
  )
}

export default JournalsContainer
