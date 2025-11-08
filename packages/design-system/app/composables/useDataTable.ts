import { ref, computed, watch } from 'vue'

export interface Column {
  key: string
  label: string
  sortable?: boolean
  filterable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
  render?: (value: any, row: any) => string | any
}

export interface FilterConfig {
  type: 'text' | 'select' | 'date' | 'number' | 'range'
  options?: Array<{ label: string; value: any }>
}

export const useDataTable = <T extends Record<string, any>>(
  initialData: T[],
  columns: Column[]
) => {
  const data = ref<T[]>(initialData)
  const searchQuery = ref('')
  const sortKey = ref<string | null>(null)
  const sortOrder = ref<'asc' | 'desc'>('asc')
  const filters = ref<Record<string, any>>({})
  const selectedRows = ref<Set<number>>(new Set())
  const expandedRows = ref<Set<number>>(new Set())
  const groupByKey = ref<string | null>(null)
  const pageSize = ref(10)
  const currentPage = ref(1)

  // Filtering
  const filteredData = computed(() => {
    let result = [...data.value]

    // Search
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(query)
        )
      )
    }

    // Column filters
    Object.entries(filters.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        result = result.filter(row => {
          const rowValue = row[key]
          if (Array.isArray(value)) {
            return value.includes(rowValue)
          }
          return String(rowValue).toLowerCase().includes(String(value).toLowerCase())
        })
      }
    })

    return result
  })

  // Sorting
  const sortedData = computed(() => {
    if (!sortKey.value) return filteredData.value

    return [...filteredData.value].sort((a, b) => {
      const aVal = a[sortKey.value!]
      const bVal = b[sortKey.value!]

      if (aVal === bVal) return 0

      let result = 0
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        result = aVal - bVal
      } else {
        result = String(aVal).localeCompare(String(bVal))
      }

      return sortOrder.value === 'asc' ? result : -result
    })
  })

  // Grouping
  const groupedData = computed(() => {
    if (!groupByKey.value) return sortedData.value

    const groups = sortedData.value.reduce((acc, row) => {
      const key = row[groupByKey.value!]
      if (!acc[key]) acc[key] = []
      acc[key].push(row)
      return acc
    }, {} as Record<string, T[]>)

    return groups
  })

  // Pagination
  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return groupByKey.value ? sortedData.value : sortedData.value.slice(start, end)
  })

  const totalPages = computed(() =>
    Math.ceil(sortedData.value.length / pageSize.value)
  )

  // Actions
  const sort = (key: string) => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey.value = key
      sortOrder.value = 'asc'
    }
  }

  const setFilter = (key: string, value: any) => {
    filters.value[key] = value
    currentPage.value = 1
  }

  const clearFilters = () => {
    filters.value = {}
    searchQuery.value = ''
    currentPage.value = 1
  }

  const toggleRowSelection = (index: number) => {
    if (selectedRows.value.has(index)) {
      selectedRows.value.delete(index)
    } else {
      selectedRows.value.add(index)
    }
  }

  const selectAll = () => {
    if (selectedRows.value.size === paginatedData.value.length) {
      selectedRows.value.clear()
    } else {
      for (let i = 0; i < paginatedData.value.length; i++) {
        selectedRows.value.add(i)
      }
    }
  }

  const toggleRowExpansion = (index: number) => {
    if (expandedRows.value.has(index)) {
      expandedRows.value.delete(index)
    } else {
      expandedRows.value.add(index)
    }
  }

  const exportData = (format: 'csv' | 'json') => {
    if (format === 'csv') {
      const headers = columns.map(col => col.label).join(',')
      const rows = sortedData.value.map(row =>
        columns.map(col => row[col.key]).join(',')
      )
      return [headers, ...rows].join('\n')
    }
    return JSON.stringify(sortedData.value, null, 2)
  }

  return {
    data,
    searchQuery,
    sortKey,
    sortOrder,
    filters,
    selectedRows,
    expandedRows,
    groupByKey,
    pageSize,
    currentPage,
    filteredData,
    sortedData,
    groupedData,
    paginatedData,
    totalPages,
    sort,
    setFilter,
    clearFilters,
    toggleRowSelection,
    selectAll,
    toggleRowExpansion,
    exportData
  }
}
