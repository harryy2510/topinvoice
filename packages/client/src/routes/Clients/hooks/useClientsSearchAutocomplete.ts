import { AutocompleteProps } from '@mui/material'
import { keyBy, uniq } from 'lodash-es'
import { useMemo, useRef, useState } from 'react'
import { SearchClientsQuery, useSearchClientsQuery } from '../../../graphql/generated'

type Client = NonNullable<NonNullable<SearchClientsQuery['viewer']>['clients']>['nodes'][0]

const useClientsSearchAutocomplete = (selectedClientId?: string, defaultClientId?: string) => {
  const [searchTerm, setSearchTerm] = useState('')
  const clientMapRef = useRef<Record<string, Client>>({})
  const { data, isLoading } = useSearchClientsQuery({
    filter: defaultClientId && !searchTerm ? { id: { eq: defaultClientId } } : { name: { iLike: `%${searchTerm}%` } }
  })

  const clientIds = useMemo(() => {
    const clientIds = uniq([...(data?.viewer?.clients?.nodes?.map((node) => node.id) ?? []), selectedClientId]).filter(
      Boolean
    )

    clientMapRef.current = { ...clientMapRef.current, ...keyBy(data?.viewer?.clients?.nodes, 'id') }
    return clientIds
  }, [selectedClientId, data])

  const autocompleteProps = useMemo(
    (): Omit<AutocompleteProps<any, any, any, any>, 'renderInput'> => ({
      filterOptions: (x) => x,
      options: clientIds,
      getOptionLabel: (id) => clientMapRef.current[id]?.name || '',
      loading: isLoading,
      noOptionsText: searchTerm ? `No clients found matching term "${searchTerm}"` : 'Type to search for clients',
      onInputChange: (event, newInputValue) => {
        setSearchTerm(newInputValue)
      }
    }),
    [setSearchTerm, clientIds, isLoading, searchTerm]
  )

  return {
    searchTerm,
    setSearchTerm,
    clientIds,
    data,
    isLoading,
    autocompleteProps
  }
}

export default useClientsSearchAutocomplete
