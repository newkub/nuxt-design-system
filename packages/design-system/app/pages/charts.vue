<script setup lang="ts">
import { ref } from 'vue'

const selectedChart = ref('line')

const charts = [
  // Basic Charts
  { id: 'line', name: 'Line Chart', category: 'Basic', icon: 'i-mdi-chart-line' },
  { id: 'bar', name: 'Bar Chart', category: 'Basic', icon: 'i-mdi-chart-bar' },
  { id: 'area', name: 'Area Chart', category: 'Basic', icon: 'i-mdi-chart-areaspline' },
  { id: 'pie', name: 'Pie Chart', category: 'Basic', icon: 'i-mdi-chart-pie' },
  { id: 'donut', name: 'Donut Chart', category: 'Basic', icon: 'i-mdi-chart-donut' },
  { id: 'scatter', name: 'Scatter Chart', category: 'Basic', icon: 'i-mdi-chart-scatter-plot' },
  
  // Advanced Charts
  { id: 'bubble', name: 'Bubble Chart', category: 'Advanced', icon: 'i-mdi-chart-bubble' },
  { id: 'radar', name: 'Radar Chart', category: 'Advanced', icon: 'i-mdi-radar' },
  { id: 'polar', name: 'Polar Chart', category: 'Advanced', icon: 'i-mdi-chart-arc' },
  { id: 'heatmap', name: 'Heatmap', category: 'Advanced', icon: 'i-mdi-grid' },
  { id: 'treemap', name: 'Treemap', category: 'Advanced', icon: 'i-mdi-view-grid' },
  { id: 'sunburst', name: 'Sunburst', category: 'Advanced', icon: 'i-mdi-sun-compass' },
  
  // Financial Charts
  { id: 'candlestick', name: 'Candlestick', category: 'Financial', icon: 'i-mdi-candle' },
  { id: 'waterfall', name: 'Waterfall', category: 'Financial', icon: 'i-mdi-chart-waterfall' },
  { id: 'funnel', name: 'Funnel', category: 'Financial', icon: 'i-mdi-filter' },
  
  // Statistical Charts
  { id: 'boxplot', name: 'Box Plot', category: 'Statistical', icon: 'i-mdi-chart-box' },
  { id: 'violin', name: 'Violin Chart', category: 'Statistical', icon: 'i-mdi-violin' },
  { id: 'ridgeline', name: 'Ridgeline', category: 'Statistical', icon: 'i-mdi-waves' },
  
  // Progress & Gauge
  { id: 'gauge', name: 'Gauge', category: 'Progress', icon: 'i-mdi-gauge' },
  { id: 'progress', name: 'Progress', category: 'Progress', icon: 'i-mdi-progress-check' },
  { id: 'radialbar', name: 'Radial Bar', category: 'Progress', icon: 'i-mdi-circle-slice-8' },
  { id: 'bullet', name: 'Bullet Chart', category: 'Progress', icon: 'i-mdi-arrow-right-bold' },
  { id: 'sparkline', name: 'Sparkline', category: 'Progress', icon: 'i-mdi-chart-line-variant' },
  
  // Specialized Charts
  { id: 'timeline', name: 'Timeline', category: 'Specialized', icon: 'i-mdi-timeline' },
  { id: 'gantt', name: 'Gantt Chart', category: 'Specialized', icon: 'i-mdi-chart-gantt' },
  { id: 'network', name: 'Network Graph', category: 'Specialized', icon: 'i-mdi-graph' },
  { id: 'sankey', name: 'Sankey Diagram', category: 'Specialized', icon: 'i-mdi-source-branch' },
  { id: 'streamgraph', name: 'Stream Graph', category: 'Specialized', icon: 'i-mdi-waves' },
  { id: 'wordcloud', name: 'Word Cloud', category: 'Specialized', icon: 'i-mdi-cloud' },
  { id: 'calendar', name: 'Calendar', category: 'Specialized', icon: 'i-mdi-calendar-month' }
]

const categories = [...new Set(charts.map(c => c.category))]

// Sample data
const lineData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 38 },
  { name: 'Apr', value: 52 },
  { name: 'May', value: 48 },
  { name: 'Jun', value: 61 }
]

const barData = [
  { name: 'Product A', value: 45, color: '#3b82f6' },
  { name: 'Product B', value: 38, color: '#8b5cf6' },
  { name: 'Product C', value: 52, color: '#ec4899' },
  { name: 'Product D', value: 30, color: '#f59e0b' }
]

const pieData = [
  { name: 'Desktop', value: 45, color: '#3b82f6' },
  { name: 'Mobile', value: 35, color: '#8b5cf6' },
  { name: 'Tablet', value: 20, color: '#ec4899' }
]

const bubbleData = [
  { name: 'A', x: 30, y: 40, size: 50 },
  { name: 'B', x: 50, y: 60, size: 80 },
  { name: 'C', x: 70, y: 30, size: 60 },
  { name: 'D', x: 40, y: 70, size: 90 }
]

const candleData = [
  { date: 'Mon', open: 100, high: 110, low: 95, close: 105 },
  { date: 'Tue', open: 105, high: 115, low: 100, close: 108 },
  { date: 'Wed', open: 108, high: 112, low: 102, close: 106 },
  { date: 'Thu', open: 106, high: 120, low: 105, close: 118 },
  { date: 'Fri', open: 118, high: 125, low: 115, close: 120 }
]

const ganttData = [
  { name: 'Task 1', start: 0, duration: 30, progress: 100, color: '#10b981' },
  { name: 'Task 2', start: 20, duration: 40, progress: 60, color: '#3b82f6' },
  { name: 'Task 3', start: 50, duration: 35, progress: 30, color: '#f59e0b' }
]

const timelineData = [
  { date: '2024-01', title: 'Project Started', description: 'Initial planning phase' },
  { date: '2024-03', title: 'Development', description: 'Core features implementation' },
  { date: '2024-06', title: 'Testing', description: 'QA and bug fixes' },
  { date: '2024-09', title: 'Launch', description: 'Product release' }
]

const progressData = [
  { label: 'Frontend', value: 85, max: 100, color: '#3b82f6' },
  { label: 'Backend', value: 72, max: 100, color: '#8b5cf6' },
  { label: 'Testing', value: 45, max: 100, color: '#f59e0b' }
]

const radarData = [
  { name: 'Speed', value: 85 },
  { name: 'Reliability', value: 75 },
  { name: 'Comfort', value: 90 },
  { name: 'Safety', value: 80 },
  { name: 'Efficiency', value: 70 }
]

const heatmapData = Array.from({ length: 7 }, (_, i) =>
  Array.from({ length: 24 }, (_, j) => ({
    x: j,
    y: i,
    value: Math.random() * 100
  }))
).flat()
</script>

<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-gray-900 text-white p-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold">Chart Library</h1>
        <p class="text-gray-400">30 powerful chart components for data visualization</p>
      </div>
    </header>

    <div class="flex-1 flex overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-50 border-r overflow-y-auto">
        <nav class="p-2">
          <div v-for="category in categories" :key="category" class="mb-4">
            <h3 class="px-3 py-2 text-xs font-semibold text-gray-600 uppercase">{{ category }}</h3>
            <button
              v-for="chart in charts.filter(c => c.category === category)"
              :key="chart.id"
              :class="[
                'w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-colors',
                selectedChart === chart.id
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              ]"
              @click="selectedChart = chart.id"
            >
              <div :class="[chart.icon, 'w-5 h-5']" />
              <span class="text-sm font-medium">{{ chart.name }}</span>
            </button>
          </div>
        </nav>
      </aside>

      <!-- Content -->
      <main class="flex-1 overflow-y-auto p-8 bg-white">
        <div class="max-w-4xl mx-auto">
          <div class="mb-6">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">
              {{ charts.find(c => c.id === selectedChart)?.name }}
            </h2>
            <p class="text-gray-600">Interactive chart component with customizable options</p>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <!-- Charts -->
            <ChartLine v-if="selectedChart === 'line'" :data="lineData" />
            <ChartBar v-else-if="selectedChart === 'bar'" :data="barData" />
            <ChartArea v-else-if="selectedChart === 'area'" :data="lineData" />
            <ChartPie v-else-if="selectedChart === 'pie'" :data="pieData" />
            <ChartDonut v-else-if="selectedChart === 'donut'" :data="pieData" />
            <ChartScatter v-else-if="selectedChart === 'scatter'" :data="barData" />
            <ChartBubble v-else-if="selectedChart === 'bubble'" :data="bubbleData" />
            <ChartRadar v-else-if="selectedChart === 'radar'" :data="radarData" />
            <ChartPolar v-else-if="selectedChart === 'polar'" :data="barData" />
            <ChartHeatmap v-else-if="selectedChart === 'heatmap'" :data="heatmapData" />
            <ChartTreemap v-else-if="selectedChart === 'treemap'" :data="barData" />
            <ChartSunburst v-else-if="selectedChart === 'sunburst'" :data="barData" />
            <ChartCandlestick v-else-if="selectedChart === 'candlestick'" :data="candleData" />
            <ChartWaterfall v-else-if="selectedChart === 'waterfall'" :data="barData.map(d => ({ ...d, value: d.value - 30 }))" />
            <ChartFunnel v-else-if="selectedChart === 'funnel'" :data="barData" />
            <ChartBoxPlot v-else-if="selectedChart === 'boxplot'" :data="[{ name: 'Data', min: 10, q1: 25, median: 40, q3: 60, max: 90 }]" />
            <ChartViolin v-else-if="selectedChart === 'violin'" :data="[{ name: 'Sample', values: [20, 30, 40, 50, 60, 70] }]" />
            <ChartRidgeline v-else-if="selectedChart === 'ridgeline'" :data="[
              { name: 'A', values: [20, 40, 60, 50, 30] },
              { name: 'B', values: [30, 50, 70, 60, 40] }
            ]" />
            <ChartGauge v-else-if="selectedChart === 'gauge'" :value="75" :max="100" />
            <ChartProgress v-else-if="selectedChart === 'progress'" :data="progressData" />
            <ChartRadialBar v-else-if="selectedChart === 'radialbar'" :data="progressData" />
            <ChartBullet v-else-if="selectedChart === 'bullet'" :value="75" :target="80" label="Performance" />
            <ChartSparkline v-else-if="selectedChart === 'sparkline'" :data="[30, 45, 38, 52, 48, 61, 55, 70]" />
            <ChartTimeline v-else-if="selectedChart === 'timeline'" :data="timelineData" />
            <ChartGantt v-else-if="selectedChart === 'gantt'" :data="ganttData" />
            <ChartNetwork v-else-if="selectedChart === 'network'" 
              :nodes="[
                { id: '1', label: 'A' },
                { id: '2', label: 'B' },
                { id: '3', label: 'C' }
              ]"
              :links="[
                { source: '1', target: '2' },
                { source: '2', target: '3' }
              ]"
            />
            <ChartSankey v-else-if="selectedChart === 'sankey'"
              :links="[
                { source: 'A', target: 'X', value: 30 },
                { source: 'B', target: 'X', value: 20 },
                { source: 'X', target: 'Y', value: 50 }
              ]"
            />
            <ChartStreamGraph v-else-if="selectedChart === 'streamgraph'" :data="[
              { name: 'Series 1', values: [20, 30, 40, 30, 20] },
              { name: 'Series 2', values: [15, 25, 35, 25, 15] }
            ]" />
            <ChartWordCloud v-else-if="selectedChart === 'wordcloud'" :data="[
              { text: 'Vue', value: 90 },
              { text: 'Nuxt', value: 80 },
              { text: 'TypeScript', value: 70 },
              { text: 'JavaScript', value: 85 },
              { text: 'Chart', value: 60 }
            ]" />
            <ChartCalendar v-else-if="selectedChart === 'calendar'" :data="[
              { date: '2024-01-15', value: 5 },
              { date: '2024-02-20', value: 8 },
              { date: '2024-03-10', value: 3 }
            ]" />
          </div>

          <!-- Info -->
          <div class="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 class="font-semibold text-blue-900 mb-2">Usage</h3>
            <pre class="text-sm text-blue-800 overflow-x-auto"><code>&lt;{{ charts.find(c => c.id === selectedChart)?.name.replace(' ', '') }} :data="chartData" /&gt;</code></pre>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
