import React from 'react'
import { Container, Pagination } from '@mui/material'

const PaginationComponent = ({ totalPages, setCurrentPage, currentPage }) => {
  const handleClick = (e, v) => {
    setCurrentPage(v)
  }
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'end',
        padding: '0 !important',
        minWidth: '100%',
      }}
    >
      <Pagination
        count={totalPages}
        onChange={handleClick}
        siblingCount={0}
        boundaryCount={1}
      />
    </Container>
  )
}

export default PaginationComponent
