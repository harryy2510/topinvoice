import { LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterMoment'
import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from './App'
import GlobalCss from './components/GlobalCss'
import ThemeProviderWithColorMode from './components/ThemeProviderWithColorMode'

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProviderWithColorMode>
          <CssBaseline />
          <GlobalCss />
          <SnackbarProvider
            variant="info"
            transitionDuration={{ enter: 150, appear: 150, exit: 150 }}
            autoHideDuration={2000}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            maxSnack={1}
            preventDuplicate
          >
            <LocalizationProvider dateAdapter={DateAdapter}>
              <App />
            </LocalizationProvider>
          </SnackbarProvider>
        </ThemeProviderWithColorMode>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.querySelector('#root')
)
