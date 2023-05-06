import React from 'react'
import ActionButtonsContainer from './ActionButtonsContainer'
import {
  Card,
  CardContent,
  Typography,
  Paper,
  Stack,
  TextField,
} from '@mui/material'

const SingleJournalContainer = ({
  id,
  date,
  time,
  body,
  journalOperations,
}) => {
  const [isEdit, setIsEdit] = React.useState(false)
  const [journalBody, setJournalBody] = React.useState(body)
  return (
    <Card elevation={5}>
      <CardContent>
        <Stack rowGap={2}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              Dated - {date}
            </Typography>
            {/* <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              Time - {time}
            </Typography> */}
          </Stack>
          {!isEdit ? (
            <Paper
              sx={{
                padding: '20px 20px',
                maxHeight: '100px',
                wordBreak: 'break-word',
                overflow: 'auto',
              }}
              elevation={2}
            >
              <Typography sx={{ fontSize: 15 }}>{body}</Typography>
            </Paper>
          ) : (
            <Paper
              sx={{
                padding: '0',
                margin: '0',
                maxWidth: '100%',
              }}
              elevation={2}
            >
              <TextField
                multiline={true}
                rows={5}
                style={{
                  width: '100%',
                  // maxWidth: 500,
                  padding: '0',
                  fontSize: '15',
                }}
                defaultValue={journalBody}
                onChange={(e) => setJournalBody(e.currentTarget.value)}
              />
            </Paper>
          )}
          <ActionButtonsContainer
            journalId={id}
            journalData={{ body: journalBody, previousBody: body }}
            journalOperations={journalOperations}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SingleJournalContainer
