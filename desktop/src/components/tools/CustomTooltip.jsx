import Tooltip from '@mui/material/Tooltip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react'

const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: '1rem', 
            padding: '7px 10px', 
            fontWeight : 'bold', 
            backgroundColor: 'rgba(13, 110, 253,0.91)',
            color: 'alicblue',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          arrow: {
            fontSize: '1rem',
          },
        },
      },
    },
  });


function CustomTooltip(props) {
  return (
    <>
        <ThemeProvider theme={theme}>
            <Tooltip title={props.title} placement={props.placement} enterDelay={1000}   >
                {props.children}
            </Tooltip>
        </ThemeProvider>

    </>
  )
}

export default CustomTooltip