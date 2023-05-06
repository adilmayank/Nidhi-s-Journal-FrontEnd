import { Container, Grid, Typography, Box } from '@mui/material'
import MainContainer from './MainContainer'

const ParentContainer = () => {
  return (
    <section>
      <Container maxWidth="xs" sx={{"margin-block": "20px 40px"}}>
        <Grid container >
          <MainContainer />
        </Grid>
      </Container>
    </section>
  )
}

export default ParentContainer