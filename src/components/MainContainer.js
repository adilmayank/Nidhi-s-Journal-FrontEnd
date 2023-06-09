import JournalsContainer from './JournalsContainer'
import AddJournalContainer from './AddJournalContainer'
import LoadingContainer from './loadingContainer'
import ErrorContainer from './errorContainer'
import AdminControls from './AdminControls/AdminControl'
import DateTimeContainer from './CurrentDateTimeContainer'
import React from 'react'
import { Stack, Typography, Box } from '@mui/material'
import axios from 'axios'

const MainContainer = () => {
  const [journals, setJournals] = React.useState([])
  const [apiError, setApiError] = React.useState(false)
  const [apiErrorMessage, setApiErrorMessage] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)
  const [isAdding, setIsAdding] = React.useState(false)
  const bearerToken = localStorage.getItem('token')
  const authorizationHeader = {
    headers: { authorization: `Bearer ${bearerToken}` },
  }

  const IS_PROD = process.env.NODE_ENV === 'production'
  const BASE_URL = `https://journalfornidhi-backend.onrender.com/api/v1${!IS_PROD ? '/dev' : ''}`
  // const BASE_URL = `http://localhost:5000/api/v1/dev`

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/journals`, authorizationHeader)
      .then((response) => {
        const { success } = response.data
        if (success) {
          const { data } = response.data
          setJournals([...data])
          setIsLoading(false)
        } else {
          const { error } = response
          setApiError(true)
          setApiErrorMessage(error)
          setIsLoading(false)
        }
      })
      .catch((error) => {
        setApiError(true)
        setApiErrorMessage(error.message)
        setIsLoading(false)
        console.error(error)
      })
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
        const reqBody = { body: journalNewBody }
        axios
          .post(`${BASE_URL}/journals`, reqBody, authorizationHeader)
          .then((response) => {
            const { success } = response.data
            if (success) {
              const { data } = response.data
              setJournals([...data])
              setIsLoading(false)
            } else {
              const { error } = response.data
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
        const reqBody = { body: journalNewBody }
        axios
          .patch(
            `${BASE_URL}/journals/${journalId}`,
            reqBody,
            authorizationHeader
          )
          .then((response) => {
            const { success } = response.data
            if (success) {
              const { data } = response.data
              setJournals([...data])
              setIsLoading(false)
            } else {
              const { error } = response.data
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
        axios
          .delete(`${BASE_URL}/journals/${journalId}`, authorizationHeader)
          .then((response) => {
            const { success } = response.data
            if (success) {
              const { data } = response.data
              setJournals([...data])
              setIsLoading(false)
            } else {
              const { error } = response.data
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
    <Stack display={'grid'} rowGap={6} minWidth={'100%'}>
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
        <AdminControls />
        <DateTimeContainer />
      </Stack>
      <AddJournalContainer
        journalOperations={journalOperations}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
      />

      {isLoading ? (
        <LoadingContainer />
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
