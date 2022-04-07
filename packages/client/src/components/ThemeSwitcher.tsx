import { Box } from '@mui/material'
import { FC } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import { useRecoilState } from 'recoil'
import colorModeState from '../recoil/atoms/colorModeState'

const ThemeSwitcher: FC = () => {
  const [colorMode, setColorMode] = useRecoilState(colorModeState)
  const handleChange = (isDarkMode: boolean) => setColorMode(isDarkMode ? 'dark' : 'light')

  return (
    <Box position="fixed" zIndex={1} bottom={8} right={16}>
      <DarkModeSwitch onChange={handleChange} checked={colorMode === 'dark'} size={40} />
    </Box>
  )
}

export default ThemeSwitcher
