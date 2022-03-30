import { CheckBoxOutlined, IndeterminateCheckBoxOutlined } from '@mui/icons-material'
import { LinearProgress, Paper } from '@mui/material'
import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react'

const TableGrid: ForwardRefExoticComponent<DataGridProps & RefAttributes<HTMLDivElement>> = forwardRef(
  ({ loading, ...props }, ref) => (
    <Paper sx={{ position: 'relative' }}>
      {loading && (
        <LinearProgress
          sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1, borderRadius: '4px 4px 0 0' }}
        />
      )}
      <DataGrid
        sx={{
          border: 'none',
          '.MuiDataGrid-columnSeparator': { display: 'none' },
          '.MuiDataGrid-virtualScroller': { ...(loading ? { opacity: 0.5 } : {}) },
          '.MuiDataGrid-cell, .MuiDataGrid-columnHeader': { outline: 'none!important' }
        }}
        initialState={{
          pagination: {
            pageSize: 10
          }
        }}
        componentsProps={{
          baseCheckbox: {
            indeterminateIcon: <IndeterminateCheckBoxOutlined />,
            checkedIcon: <CheckBoxOutlined />
          }
        }}
        pagination
        sortingMode="server"
        paginationMode="server"
        autoHeight
        rowsPerPageOptions={[5, 10, 25, 50, 100]} // checkboxSelection
        disableSelectionOnClick
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        {...props}
        ref={ref}
      />
    </Paper>
  )
)

export default TableGrid
