import { AddOutlined } from '@mui/icons-material'
import { Container, ContainerProps, IconButton, Typography } from '@mui/material'
import { FC, MouseEvent, ReactNode } from 'react'
import coerceArray from '../../utils/coerceArray'
import Flex from '../Flex'

export type MainLayoutProps = {
  ContainerProps?: ContainerProps
  title?: ReactNode
  onAddClick?: (event: MouseEvent<HTMLButtonElement>) => void
  actions?: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ actions, title, onAddClick, ContainerProps, children }) => (
  <Container
    className="main-layout"
    {...ContainerProps}
    sx={[{ py: { xs: 4, md: 8 }, position: 'relative', minHeight: '100%' }, ...coerceArray(ContainerProps?.sx)]}
  >
    {(title || onAddClick) && (
      <Flex mb={2} alignItems="center" justifyContent="space-between">
        <div>
          {title && (
            <Typography lineHeight="42px" variant="h6">
              {title}
            </Typography>
          )}
        </div>
        <Flex alignItems="center">
          {actions}
          {onAddClick && (
            <IconButton
              data-cy="button-add"
              sx={{ borderColor: 'divider', borderWidth: 1, borderStyle: 'solid' }}
              onClick={onAddClick}
            >
              <AddOutlined />
            </IconButton>
          )}
        </Flex>
      </Flex>
    )}
    {children}
  </Container>
)

export default MainLayout
