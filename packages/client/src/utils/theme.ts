import { createTheme, PaletteOptions } from '@mui/material/styles'
import { SimplePaletteColorOptions } from '@mui/material/styles/createPalette'

// @ts-ignore
import defaultTheme from '@mui/material/styles/defaultTheme'
import defaultShadows, { Shadows } from '@mui/material/styles/shadows'
import { alpha } from '@mui/system'

const shadows = [...defaultShadows] as Shadows
shadows[1] = '0 0 8px #0000000a'
shadows[2] = 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'

const lightPalette: PaletteOptions = {
  primary: {
    main: '#3f51b5'
  },
  secondary: {
    main: '#3f51b5'
  },
  success: {
    main: '#4FCD6A'
  },
  background: {
    default: '#e8eaf6',
    paper: '#fff'
  },
  mode: 'light',
  tonalOffset: 0.1
}

const darkPalette: PaletteOptions = {
  primary: {
    main: '#7267ef'
  },
  secondary: {
    main: '#7267ef'
  },
  success: {
    main: '#4FCD6A'
  },
  background: {
    default: '#111936',
    paper: '#212946'
  },
  mode: 'dark',
  tonalOffset: 0.05
}

const palette: PaletteOptions = darkPalette

const theme = createTheme({
  palette,
  typography: {
    fontFamily: 'Poppins, sans-serif'
  },
  shadows,
  shape: {
    borderRadius: defaultTheme.shape.borderRadius * 1.5
  },
  mixins: {
    toolbar: {
      height: defaultTheme.spacing(8)
    }
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 1
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          textTransform: 'none',
          padding: defaultTheme.spacing(2, 3),
          minHeight: defaultTheme.spacing(5)
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: defaultTheme.spacing(5)
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained'
      },
      styleOverrides: {
        root: {
          textTransform: 'none'
        },
        startIcon: {
          marginRight: 4
        },
        outlinedPrimary: {
          borderColor: alpha((palette.primary as SimplePaletteColorOptions).main, 0.2)
        }
      }
    },
    MuiMenu: {
      defaultProps: {
        elevation: 2
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 2
      }
    },
    MuiPopover: {
      defaultProps: {
        elevation: 2
      }
    },
    MuiDialog: {
      defaultProps: {
        keepMounted: false,
        fullWidth: true,
        maxWidth: 'sm',
        PaperProps: {
          elevation: 2
        }
      },
      styleOverrides: {
        root: {
          backdropFilter: 'blur(2px)'
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
          fontWeight: 600
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          opacity: 0.72
        },
        shrink: {
          position: 'relative',
          transform: 'translate(4px, 2px) scale(0.75)',
          transformOrigin: 'left top'
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          opacity: 0.72,
          transform: 'scale(0.75)',
          transformOrigin: 'left bottom'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: defaultTheme.shape.borderRadius * 2
        },
        notchedOutline: {
          top: 0,
          legend: {
            display: 'none'
          }
        }
      }
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
        fontWeight: 500,
        href: '#'
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: defaultTheme.spacing(4)
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&, &:last-child': {
            padding: defaultTheme.spacing(3)
          }
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          borderTop: `1px solid ${defaultTheme.palette.divider}`,
          justifyContent: 'flex-start',
          padding: defaultTheme.spacing(2.5, 3)
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
        margin: 'dense',
        InputLabelProps: { shrink: true }
      }
    }
  }
})

export default theme
