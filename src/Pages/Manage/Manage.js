import React from 'react'
import BharatrohanTheme from '../../Components/BharatrohanTheme'
import { ThemeProvider } from '@emotion/react'
import Navbar from '../../Components/Navbar'
import { Box } from '@mui/material'

const Manage = () => {
  return (
	  <ThemeProvider theme={BharatrohanTheme}>
      <Box>	
          <Box>
            <Navbar/>
          </Box>

          <Box
                sx={{
            m : 2,
                  p : 3,
                  height : 'fit-content',
                  boxShadow : 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'
                }}
              >
              Hello
          </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Manage