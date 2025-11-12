<script setup lang="ts">
import { useTask } from "~/composables/useTask";
import type { Column } from "~/types/task";

const { getColumns } = useTask();

const columns = getColumns;

const dragging = ref(false);
const dragTask = ref(null);
const dragColumn = ref(null);

function onDragStart(task: any, column: Column) {
	dragTask.value = task;
	dragColumn.value = column;
	dragging.value = true;
}

function onDragEnd() {
	dragging.value = false;
	dragTask.value = null;
	dragColumn.value = null;
}

function onDrop(column: Column) {
	if (dragTask.value && dragColumn.value && dragColumn.value.id !== column.id) {
		// TODO: Implement task moving logic
		console.log(`Move task from ${dragColumn.value.id} to ${column.id}`);
	}
}

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

function formatDate(date: string) {
	return new Date(date).toLocaleDateString("en-US", {
		day: "numeric",
		month: "short",
	});
}
</script>

<template>
  <div class="p-6">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Tasks Board</h2>
        <p class="mt-1 text-sm text-gray-500">Organize and track your tasks in a Kanban board</p>
      </div>
      <UButton icon="i-mdi-plus" size="lg">
        Add Task
      </UButton>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div
        v-for="column in columns"
        :key="column.id"
        class="rounded-lg border p-4 border-gray-200"
        @dragover.prevent
        @drop="onDrop(column)"
      >
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div :class="['h-3 w-3 rounded-full', column.color]"></div>
            <h3 class="font-semibold text-gray-900">{{ column.title }}</h3>
            <span class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
              {{ column.tasks.length }}
            </span>
          </div>
          <UButton
            icon="i-mdi-plus"
            size="xs"
            color="gray"
            variant="ghost"
          />
        </div>

        <div class="space-y-3">
          <UCard
            v-for="task in column.tasks"
            :key="task.id"
            class="cursor-move transition-all hover:shadow-md"
            draggable
            @dragstart="onDragStart(task, column)"
            @dragend="onDragEnd"
          >
            <div class="flex items-start gap-3">
              <div class="flex items-center pt-1">
                <UIcon :name="getStatusIcon(task.status)" class="h-4 w-4" />
              </div>

              <div class="flex-1 min-w-0">
                <h4 class="font-medium text-gray-900">{{ task.name }}</h4>

                <div class="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <div class="flex items-center gap-1">
                    <UIcon name="i-mdi-account" class="h-3 w-3 text-gray-400" />
                    <span class="text-gray-600">{{ task.assignee }}</span>
                  </div>

                  <div class="flex items-center gap-1">
                    <UIcon name="i-mdi-calendar" class="h-3 w-3 text-gray-400" />
                    <span class="text-gray-600">{{ formatDate(task.dueDate) }}</span>
                  </div>

                  <div class="flex items-center gap-1">
                    <UIcon name="i-mdi-flag" class="h-3 w-3 text-gray-400" />
                    <span :class="['font-medium', getPriorityColor(task.priority)]">
                      {{ task.priority }}
                    </span>
                  </div>
                </div>

                <div v-if="task.tags && task.tags.length > 0" class="mt-2 flex flex-wrap gap-1">
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
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>