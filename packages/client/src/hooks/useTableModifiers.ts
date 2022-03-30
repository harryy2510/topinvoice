import { DataGridProps, GridSortDirection, GridSortModel } from '@mui/x-data-grid'
import { useState } from 'react'
import { OffsetPaging, SortDirection } from '../graphql/generated'

const useTableModifiers = <SortBy>() => {
  const [paging, setPaging] = useState<OffsetPaging>({ offset: 0, limit: 10 })
  const [direction, setDirection] = useState<SortDirection>()
  const [sortBy, setSortBy] = useState<SortBy>()

  const tableProps: Partial<DataGridProps> = {
    page: (paging.offset ?? 0) / (paging.limit ?? 10),
    pageSize: paging.limit ?? 10,
    onPageChange: (page) => setPaging((_) => ({ ..._, offset: page * (paging.limit ?? 10) })),
    onPageSizeChange: (size) => setPaging((_) => ({ ..._, limit: size })),
    sortModel: [{ field: (sortBy ?? '') as string, sort: direction?.toLowerCase() as GridSortDirection }],
    onSortModelChange: (model: GridSortModel) => {
      setSortBy(model[0]?.field as unknown as SortBy)
      setDirection(model[0]?.sort?.toUpperCase() as SortDirection)
    }
  }

  return { tableProps, paging, direction, sortBy }
}

export default useTableModifiers
