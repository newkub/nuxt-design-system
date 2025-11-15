<script setup lang="ts">
interface CalendarEvent {
  id: string
  title: string
  date: string
  time?: string
  color?: string
}

interface Props {
  events: CalendarEvent[]
  year?: number
  month?: number
}

const props = withDefaults(defineProps<Props>(), {
  year: new Date().getFullYear(),
  month: new Date().getMonth()
})

const emit = defineEmits<{
  eventClick: [event: CalendarEvent]
  dateClick: [date: Date]
}>()

const currentYear = ref(props.year)
const currentMonth = ref(props.month)

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
})

const firstDayOfMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay()
})

const days = computed(() => {
  const result = []
  for (let i = 0; i < firstDayOfMonth.value; i++) {
    result.push(null)
  }
  for (let i = 1; i <= daysInMonth.value; i++) {
    result.push(i)
  }
  return result
})

const getEventsForDate = (day: number) => {
  const dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  return props.events.filter(e => e.date === dateStr)
}

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}
</script>

<template>
  <div class="data-calendar">
    <div class="calendar-header">
      <button @click="prevMonth" class="nav-btn">
        <div class="i-mdi-chevron-left w-5 h-5" />
      </button>
      <h3 class="month-title">{{ monthNames[currentMonth] }} {{ currentYear }}</h3>
      <button @click="nextMonth" class="nav-btn">
        <div class="i-mdi-chevron-right w-5 h-5" />
      </button>
    </div>

    <div class="calendar-grid">
      <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="day-header">
        {{ day }}
      </div>

      <div
        v-for="(day, index) in days"
        :key="index"
        :class="['calendar-day', !day && 'empty']"
        @click="day && emit('dateClick', new Date(currentYear, currentMonth, day))"
      >
        <span v-if="day" class="day-number">{{ day }}</span>
        
        <div v-if="day" class="events-list">
          <div
            v-for="event in getEventsForDate(day)"
            :key="event.id"
            :class="['event-item']"
            :style="{ backgroundColor: event.color || '#3b82f6' }"
            @click.stop="emit('eventClick', event)"
          >
            {{ event.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-calendar {
  @apply bg-white rounded-lg border border-gray-200 p-4;
}

.calendar-header {
  @apply flex items-center justify-between mb-4;
}

.nav-btn {
  @apply p-2 hover:bg-gray-100 rounded transition-colors;
}

.month-title {
  @apply text-lg font-semibold text-gray-900;
}

.calendar-grid {
  @apply grid grid-cols-7 gap-1;
}

.day-header {
  @apply text-center text-sm font-medium text-gray-600 py-2;
}

.calendar-day {
  @apply min-h-24 p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors;
}

.calendar-day.empty {
  @apply bg-gray-50 cursor-default;
}

.day-number {
  @apply text-sm font-medium text-gray-900;
}

.events-list {
  @apply mt-1 space-y-1;
}

.event-item {
  @apply text-xs px-2 py-1 rounded text-white truncate cursor-pointer hover:opacity-80;
}
</style>
