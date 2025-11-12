<script setup lang="ts">
import { ref } from 'vue'

// Sample data
const trafficData = ref([
	{ name: 'Jan', value: 120 },
	{ name: 'Feb', value: 180 },
	{ name: 'Mar', value: 150 },
	{ name: 'Apr', value: 220 },
	{ name: 'May', value: 190 },
	{ name: 'Jun', value: 250 },
])

const barData = ref([
	{ name: 'Product A', value: 150, color: '#3b82f6' },
	{ name: 'Product B', value: 230, color: '#10b981' },
	{ name: 'Product C', value: 180, color: '#f59e0b' },
	{ name: 'Product D', value: 290, color: '#ef4444' },
])

const pieData = ref([
	{ name: 'Desktop', value: 65, color: '#3b82f6' },
	{ name: 'Mobile', value: 25, color: '#10b981' },
	{ name: 'Tablet', value: 10, color: '#f59e0b' },
])

const radarData = ref([
	{ label: 'Speed', value: 85 },
	{ label: 'Quality', value: 92 },
	{ label: 'Design', value: 78 },
	{ label: 'UX', value: 88 },
	{ label: 'Performance', value: 95 },
])

const scatterData = ref([
	{ x: 10, y: 20, label: 'A', color: '#3b82f6' },
	{ x: 30, y: 50, label: 'B', color: '#10b981' },
	{ x: 50, y: 40, label: 'C', color: '#f59e0b' },
	{ x: 70, y: 80, label: 'D', color: '#ef4444' },
	{ x: 90, y: 60, label: 'E', color: '#8b5cf6' },
])

const heatmapData = ref([
	{ x: 0, y: 0, value: 10 },
	{ x: 1, y: 0, value: 20 },
	{ x: 2, y: 0, value: 30 },
	{ x: 0, y: 1, value: 40 },
	{ x: 1, y: 1, value: 50 },
	{ x: 2, y: 1, value: 60 },
	{ x: 0, y: 2, value: 70 },
	{ x: 1, y: 2, value: 80 },
	{ x: 2, y: 2, value: 90 },
])

const funnelData = ref([
	{ label: 'Visitors', value: 10000 },
	{ label: 'Sign Ups', value: 5000 },
	{ label: 'Active Users', value: 2500 },
	{ label: 'Paying Customers', value: 1000 },
	{ label: 'Premium Users', value: 250 },
])

const gaugeValue = ref(75)
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">Chart Components Demo</h1>
      <p class="text-gray-600 mb-8">10 chart types สำหรับ data visualization</p>

      <!-- Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Area Chart -->
        <Card>
          <CardHeader>
            <CardTitle>Area Chart</CardTitle>
            <CardDescription>แสดงข้อมูลเป็นพื้นที่</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartArea :data="trafficData" color="#3b82f6" :height="250" />
          </CardContent>
        </Card>

        <!-- Line Chart -->
        <Card>
          <CardHeader>
            <CardTitle>Line Chart</CardTitle>
            <CardDescription>เส้นกราฟพื้นฐาน</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartLine :data="trafficData" color="#10b981" :height="250" />
          </CardContent>
        </Card>

        <!-- Bar Chart (Vertical) -->
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart (Vertical)</CardTitle>
            <CardDescription>แท่งกราฟแนวตั้ง</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartBar :data="barData" :height="250" />
          </CardContent>
        </Card>

        <!-- Bar Chart (Horizontal) -->
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart (Horizontal)</CardTitle>
            <CardDescription>แท่งกราฟแนวนอน</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartBar :data="barData" :height="250" :horizontal="true" />
          </CardContent>
        </Card>

        <!-- Pie Chart -->
        <Card>
          <CardHeader>
            <CardTitle>Pie Chart</CardTitle>
            <CardDescription>วงกลมแบ่งสัดส่วน</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartPie :data="pieData" :size="250" />
          </CardContent>
        </Card>

        <!-- Donut Chart -->
        <Card>
          <CardHeader>
            <CardTitle>Donut Chart</CardTitle>
            <CardDescription>วงกลมกลวงแสดงสัดส่วน</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartDonut :data="pieData" :size="250" />
          </CardContent>
        </Card>

        <!-- Radar Chart -->
        <Card>
          <CardHeader>
            <CardTitle>Radar Chart</CardTitle>
            <CardDescription>แบบใยแมงมุม เปรียบเทียบหลายมิติ</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartRadar :data="radarData" :size="300" />
          </CardContent>
        </Card>

        <!-- Scatter Chart -->
        <Card>
          <CardHeader>
            <CardTitle>Scatter Chart</CardTitle>
            <CardDescription>จุดกระจาย</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartScatter 
              :data="scatterData" 
              :height="250"
              x-label="Time (hours)"
              y-label="Performance (%)"
            />
          </CardContent>
        </Card>

        <!-- Heatmap -->
        <Card>
          <CardHeader>
            <CardTitle>Heatmap Chart</CardTitle>
            <CardDescription>สีความเข้มตามค่า</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartHeatmap 
              :data="heatmapData"
              :x-labels="['Mon', 'Tue', 'Wed']"
              :y-labels="['Morning', 'Afternoon', 'Evening']"
            />
          </CardContent>
        </Card>

        <!-- Funnel Chart -->
        <Card>
          <CardHeader>
            <CardTitle>Funnel Chart</CardTitle>
            <CardDescription>ช่องทางการแปลง</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartFunnel :data="funnelData" :height="300" />
          </CardContent>
        </Card>

        <!-- Gauge Chart -->
        <Card>
          <CardHeader>
            <CardTitle>Gauge Chart</CardTitle>
            <CardDescription>มาตรวัดแบบเข็ม</CardDescription>
          </CardHeader>
          <CardContent class="flex justify-center">
            <ChartGauge 
              :value="gaugeValue"
              :max="100"
              label="Performance Score"
            />
          </CardContent>
        </Card>

        <!-- Info Card -->
        <Card class="lg:col-span-2 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle>📊 Chart Components Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 class="font-semibold mb-2">🎨 Design Features</h4>
                <ul class="space-y-1 text-gray-700">
                  <li>✓ Pure SVG rendering</li>
                  <li>✓ Responsive & scalable</li>
                  <li>✓ Hover effects & tooltips</li>
                  <li>✓ Smooth animations</li>
                  <li>✓ Customizable colors</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold mb-2">⚙️ Technical Features</h4>
                <ul class="space-y-1 text-gray-700">
                  <li>✓ TypeScript support</li>
                  <li>✓ Computed properties</li>
                  <li>✓ Props validation</li>
                  <li>✓ Reactive data binding</li>
                  <li>✓ No external dependencies</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
