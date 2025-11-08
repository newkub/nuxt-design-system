import { computed } from 'vue'

export interface ChartDataPoint {
  name: string
  value: number
  color?: string
  [key: string]: any
}

export const useChart = () => {
  const generateGradient = (color: string) => {
    return `linear-gradient(180deg, ${color} 0%, ${color}99 100%)`
  }

  const getMaxValue = (data: ChartDataPoint[]) => {
    return Math.max(...data.map(d => d.value))
  }

  const getMinValue = (data: ChartDataPoint[]) => {
    return Math.min(...data.map(d => d.value))
  }

  const normalizeData = (data: ChartDataPoint[]) => {
    const max = getMaxValue(data)
    return data.map(item => ({
      ...item,
      percentage: (item.value / max) * 100
    }))
  }

  const generateColorScale = (count: number, baseColor = '#3b82f6') => {
    const colors = []
    for (let i = 0; i < count; i++) {
      const opacity = 0.3 + (i / count) * 0.7
      colors.push(`${baseColor}${Math.floor(opacity * 255).toString(16)}`)
    }
    return colors
  }

  const formatValue = (value: number, format?: 'currency' | 'percent' | 'number') => {
    if (format === 'currency') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
    }
    if (format === 'percent') {
      return `${value.toFixed(1)}%`
    }
    return value.toLocaleString()
  }

  return {
    generateGradient,
    getMaxValue,
    getMinValue,
    normalizeData,
    generateColorScale,
    formatValue
  }
}
