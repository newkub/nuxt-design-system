<script setup lang="ts">
import { useTask } from "~/composables/useTask";

const { getTasks } = useTask();

const tasks = getTasks;

function getPriorityColor(priority: string) {
	const colors: Record<string, string> = {
		High: "text-red-600",
		Low: "text-green-600",
		Medium: "text-yellow-600",
	};
	return colors[priority] || "";
}

function getStatusColor(status: string) {
	const colors: Record<string, string> = {
		Done: "bg-green-100 text-green-800",
		"In Progress": "bg-blue-100 text-blue-800",
		Todo: "bg-gray-100 text-gray-800",
	};
	return colors[status] || "";
}

function getStatusIcon(status: string) {
	const icons: Record<string, string> = {
		Done: "i-mdi-check-circle",
		"In Progress": "i-mdi-progress-clock",
		Todo: "i-mdi-circle-outline",
	};
	return icons[status] || "";
}
</script>

<template>
  <div class="p-6">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">
          Tasks List
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          View and manage your tasks in a detailed list format
        </p>
      </div>
      <UButton icon="i-mdi-plus" size="lg">
        Add Task
      </UButton>
    </div>

    <div class="space-y-3">
      <UCard
        v-for="task in tasks"
        :key="task.id"
        class="transition-all hover:shadow-lg"
      >
        <div class="flex items-start gap-4">
          <div class="flex items-center pt-1">
            <UIcon :name="getStatusIcon(task.status)" class="h-5 w-5" />
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ task.name }}
                </h3>
                <p v-if="task.description" class="mt-1 text-sm text-gray-600">
                  {{ task.description }}
                </p>
              </div>

              <span :class="['inline-flex rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap', getStatusColor(task.status)]">
                {{ task.status }}
              </span>
            </div>

            <div class="mt-3 flex flex-wrap items-center gap-4 text-sm">
              <div class="flex items-center gap-2">
                <UIcon name="i-mdi-account" class="h-4 w-4 text-gray-400" />
                <span class="text-gray-700">{{ task.assignee }}</span>
              </div>

              <div class="flex items-center gap-2">
                <UIcon name="i-mdi-calendar" class="h-4 w-4 text-gray-400" />
                <span class="text-gray-700">
                  {{ new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
                </span>
              </div>

              <div class="flex items-center gap-2">
                <UIcon name="i-mdi-flag" class="h-4 w-4 text-gray-400" />
                <span :class="['font-semibold', getPriorityColor(task.priority)]">
                  {{ task.priority }}
                </span>
              </div>

              <div v-if="task.tags && task.tags.length > 0" class="flex items-center gap-2">
                <UIcon name="i-mdi-tag" class="h-4 w-4 text-gray-400" />
                <div class="flex gap-1">
                  <span
                    v-for="tag in task.tags"
                    :key="tag"
                    class="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>