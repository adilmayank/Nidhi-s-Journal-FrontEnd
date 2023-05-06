import React from 'react'
import { Button, Stack } from '@mui/material'

const ActionButtonsContainer = ({
  journalId,
  journalData = null,
  journalOperations,
  isEdit,
  setIsEdit,
}) => {
  const [remove, setRemove] = React.useState(false)

  const handleClick = (operation) => {
    if (operation === 'remove') {
      journalOperations('remove', journalId)
    } else if (operation === 'update') {
      const journalNewBody = journalData.body
      const journalPrevBody = journalData.previousBody
      console.log(journalNewBody, journalPrevBody)
      if (journalNewBody !== journalPrevBody) {
        journalOperations('update', journalId, journalNewBody)
      }
      setIsEdit(false)
    }
  }

  return (
    <>
      {remove && (
        <Stack>
          <Button size="small" color="success" onClick={() => setRemove(false)}>
            No
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleClick('remove')}
          >
            Yes
          </Button>
        </Stack>
      )}
      {isEdit && (
        <Stack>
          <Button size="small" variant="outlined" color='error' onClick={() => setIsEdit(false)}>
            Cancel
          </Button>
          <Button size="small" onClick={() => handleClick('update')}>
            Update
          </Button>
        </Stack>
      )}
      {!remove && !isEdit && (
        <Stack display={'grid'} gridTemplateColumns={'1fr 1fr'}>
          <Button size="small" color="error" onClick={() => setRemove(true)}>
            Remove
          </Button>
          <Button size="small" onClick={() => setIsEdit(true)}>
            Edit
          </Button>
        </Stack>
      )}
    </>
    // <Stack display={'grid'} gridTemplateColumns={'1fr 1fr'}>
    //   {remove ? (
    //     <Stack>
    //       <Button
    //         size="small"
    //         color='success'
    //         onClick={() => setRemove(false)}
    //       >
    //         No
    //       </Button>
    //       <Button variant='outlined' size="small" color='error' onClick={() => handleClick('remove')}>Yes</Button>
    //     </Stack>
    //   ) : (
    //     <Button color='error' onClick={() => setRemove(true)}>Remove</Button>
    //   )}
    //   {isEdit ? (
    //     <Stack>
    //       <Button onClick={() => setIsEdit(false)}>Cancel</Button>
    //       <Button onClick={() => handleClick('update')}>Update</Button>
    //     </Stack>
    //   ) : (
    //     <Button onClick={() => setIsEdit(true)}>Edit</Button>
    //   )}
    // </Stack>
  )
}

export default ActionButtonsContainer
