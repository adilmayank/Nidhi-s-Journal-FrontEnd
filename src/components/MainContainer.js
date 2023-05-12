import JournalsContainer from './JournalsContainer'
import AddJournalContainer from './AddJournalContainer'
import LoadingContainer from './loadingContainer'
import ErrorContainer from './errorContainer'
import Logout from './Authentication/Logout'
import DateTimeContainer from './CurrentDateTimeContainer'
import React from 'react'
import { Stack, Typography, Box } from '@mui/material'

const MainContainer = () => {
  const [journals, setJournals] = React.useState([])
  const [apiError, setApiError] = React.useState(false)
  const [apiErrorMessage, setApiErrorMessage] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)
  const [isAdding, setIsAdding] = React.useState(false)

  const IS_PROD = process.env.NODE_ENV === 'production'
  const BASE_URL = `https://journalfornidhi-backend.onrender.com/api/v1${
    !IS_PROD ? '/dev' : ''
  }`

  React.useEffect(() => {
    fetch(`${BASE_URL}/journals`)
      .then((response) => response.json())
      .then((jsonedResponse) => {
        const { success } = jsonedResponse
        if (success) {
          const { data } = jsonedResponse
          setJournals([...data])
          setIsLoading(false)
        } else {
          const { error } = jsonedResponse
          setApiError(true)
          setApiErrorMessage(error)
          setIsLoading(false)
        }
      })
      .catch((error) => console.error(error))
  }, [])

  const journalOperations = async (
    type,
    journalId = null,
    journalNewBody = null
  ) => {
    //
    //
    // Create Journal
    //
    //
    return new Promise((resolve, reject) => {
      if (type === 'create') {
        fetch(`${BASE_URL}/journals`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ body: journalNewBody }),
        })
          .then((response) => response.json())
          .then((jsonedResponse) => {
            const { success } = jsonedResponse
            if (success) {
              const { data } = jsonedResponse
              setJournals([...data])
              setIsLoading(false)
            } else {
              const { error } = jsonedResponse
              setApiError(true)
              setApiErrorMessage(error)
              setIsLoading(false)
            }
            resolve(true)
          })
          .catch((error) => {
            reject(false)
          })
      }
      //
      //
      // Update Journal
      //
      //
      else if (type === 'update') {
        fetch(`${BASE_URL}/journals/${journalId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ body: journalNewBody }),
        })
          .then((response) => response.json())
          .then((jsonedResponse) => {
            const { success } = jsonedResponse
            if (success) {
              const { data } = jsonedResponse
              setJournals([...data])
              setIsLoading(false)
            } else {
              const { error } = jsonedResponse
              setApiError(true)
              setApiErrorMessage(error)
              setIsLoading(false)
            }
            resolve(true)
          })
          .catch((error) => {
            reject(false)
          })
      }
      //
      //
      // Remove Journal
      //
      //
      else if (type === 'remove') {
        fetch(`${BASE_URL}/journals/${journalId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((jsonedResponse) => {
            const { success } = jsonedResponse
            if (success) {
              const { data } = jsonedResponse
              setJournals([...data])
              setIsLoading(false)
            } else {
              const { error } = jsonedResponse
              setApiError(true)
              setApiErrorMessage(error)
              setIsLoading(false)
            }
            resolve(true)
          })
          .catch((error) => {
            reject(false)
          })
      }
    })
  }

  return (
    <Stack display={'grid'} rowGap={10} minWidth={'100%'}>
      <Stack display={'grid'} rowGap={3}>
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
        <Stack display={"flex"} direction={"row"} justifyContent={"space-between"}>
          <DateTimeContainer />
          <Logout />
        </Stack>
      </Stack>
      <AddJournalContainer
        journalOperations={journalOperations}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
      />

      {isLoading ? (
        <LoadingContainer></LoadingContainer>
      ) : apiError ? (
        <ErrorContainer message={apiErrorMessage} />
      ) : (
        <JournalsContainer
          journals={journals}
          journalOperations={journalOperations}
          apiErrors
        />
      )}
    </Stack>
  )
}

export default MainContainer
