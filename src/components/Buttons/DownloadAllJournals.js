import { Button, Stack } from '@mui/material'
import { saveAs } from 'file-saver'
import { FileDownload } from '@mui/icons-material'
import axios from 'axios'

const DownloadAllJournalsButton = () => {
  const bearerToken = localStorage.getItem('token')
  const authenticationHeader = {
    headers: { Authentication: `Bearer ${bearerToken}` },
  }

  const handleClick = async () => {
    const DOWNLOAD_URL =
      'https://journalfornidhi-backend.onrender.com/api/v1/journals/download'
    const response = await axios.get(DOWNLOAD_URL, authenticationHeader)
    const text = response.data
    const filename = `All_Journals_${new Date(
      Date.now()
    ).toLocaleDateString()}.txt`
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, filename)
  }

  return (
    <Stack display="flex" direction={'row'} justifyContent={'flex-end'}>
      <Button
        variant="contained"
        sx={{
          color: '#fff',
          width: '150px',
          fontSize: '10px',
        }}
        endIcon={<FileDownload sx={{ scale: '0.8' }} />}
        onClick={handleClick}
      >
        Download All
      </Button>
    </Stack>
  )
}

export default DownloadAllJournalsButton
