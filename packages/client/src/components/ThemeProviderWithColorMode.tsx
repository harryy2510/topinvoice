import { ThemeProvider } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import useToggleValue from '../hooks/useToggleValue'
import colorModeState from '../recoil/atoms/colorModeState'
import { darkTheme, lightTheme } from '../utils/theme'
import ThemeSwitcher from './ThemeSwitcher'

const ThemeProviderWithColorMode: FC = ({ children }) => {
  const colorMode = useRecoilValue(colorModeState)
  const theme = useToggleValue(colorMode === 'dark', darkTheme, lightTheme)
  return (
    <ThemeProvider theme={theme}>
      {children}
      <ThemeSwitcher />
    </ThemeProvider>
  )
}

export default ThemeProviderWithColorMode
