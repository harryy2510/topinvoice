import { AddOutlined } from '@mui/icons-material'
import { Container, ContainerProps, IconButton, Typography } from '@mui/material'
import { FC, MouseEvent, ReactNode } from 'react'
import coerceArray from '../../utils/coerceArray'
import Flex from '../Flex'

export type MainLayoutProps = {
  ContainerProps?: ContainerProps
  title?: ReactNode
  onAddClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

const MainLayout: FC<MainLayoutProps> = ({ title, onAddClick, ContainerProps, children }) => (
  <Container
    {...ContainerProps}
    sx={[{ py: { xs: 4, md: 8 }, position: 'relative', minHeight: '100%' }, ...coerceArray(ContainerProps?.sx)]}
  >
    {(title || onAddClick) && (
      <Flex mb={2} alignItems="center" justifyContent="space-between">
        <div>{title && <Typography variant="h5">{title}</Typography>}</div>
        <div>
          {onAddClick && (
            <IconButton sx={{ borderColor: 'divider', borderWidth: 1, borderStyle: 'solid' }} onClick={onAddClick}>
              <AddOutlined />
            </IconButton>
          )}
        </div>
      </Flex>
    )}
    {children}
  </Container>
)

export default MainLayout
