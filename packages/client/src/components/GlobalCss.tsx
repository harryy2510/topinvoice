import { GlobalStyles } from '@mui/material'
import { FC } from 'react'
import use100vh from '../hooks/use100vh'

const GlobalCss: FC = () => {
  use100vh()
  return (
    <GlobalStyles
      styles={({ palette }) => ({
        'html, body': {
          height: 'var(--100vh)'
        },
        '#root': {
          height: '100%'
        },
        body: {
          backgroundColor: palette.background.default
        },
        '.fade-enter': {
          opacity: 0,
          transform: 'translate(0, 25px)',
          zIndex: 1
        },
        '.fade-enter.fade-enter-active': {
          opacity: 1,
          transform: 'translate(0, 0)',
          transition: 'opacity 250ms ease-out, transform 300ms ease'
        },
        '.fade-exit': {
          opacity: 1,
          transform: 'translate(0, 0)'
        },
        '.fade-exit.fade-exit-active': {
          opacity: 0,
          transform: 'translate(0, 30px)',
          transition: 'opacity 250ms ease-out, transform 300ms ease'
        },
        '.main-layout .main-layout': {
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          maxWidth: '100%'
        }
      })}
    />
  )
}

export default GlobalCss
