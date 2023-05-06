import SingleJournalContainer from './SingleJournalContainer'
import { Stack } from '@mui/material'

const JournalsContainer = ({ journals, journalOperations }) => {
  return (
    <section>
      <Stack spacing={3}>
        {journals && journals.map((journal, i) => {
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
        })}
      </Stack>
    </section>
  )
}

export default JournalsContainer
