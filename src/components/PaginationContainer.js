import React from 'react'
import { Container, Pagination } from '@mui/material'

const PaginationComponent = ({ totalPages, setCurrentPage }) => {
  const handleClick = (e, v) => {
    setCurrentPage(v)
  }
  console.log(totalPages)
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'end',
        padding: '0 !important',
        minWidth: '100%',
      }}
    >
      <Pagination count={totalPages} onChange={handleClick} />
    </Container>
  )
}

export default PaginationComponent
