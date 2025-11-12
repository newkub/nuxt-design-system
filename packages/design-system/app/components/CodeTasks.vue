<script setup lang="ts">
// Use code tasks composable
const {
	tasks,
	newTask,
	isAddingTask,
	getCategoryClass,
	getPriorityClass,
	toggleTaskCompletion,
	addTask,
	deleteTask,
} = useCodeTasks();
</script>

<template>
  <div class="h-full w-full relative bg-gray-50 text-gray-800 flex flex-col">
    <header class="flex-shrink-0 flex items-center justify-between p-3 border-b border-gray-200">
      <h2 class="text-xl font-bold flex items-center gap-2">
        <div class="i-mdi-format-list-checks text-2xl"></div>
        <span>AI Tasks</span>
      </h2>
      <button 
        @click="isAddingTask = !isAddingTask"
        class="flex items-center gap-1 px-3 py-1.5 bg-primary-500 hover:bg-primary-600 text-white rounded-md text-sm transition-colors"
      >
        <div class="i-mdi-plus"></div>
        <span>New Task</span>
      </button>
    </header>
    
    <div v-if="isAddingTask" class="p-4 border-b border-gray-200">
      <div class="bg-white rounded-lg p-4 shadow-sm">
        <h3 class="font-semibold mb-3">Create New Task</h3>
        <div class="space-y-3">
          <input 
            v-model="newTask.title"
            type="text" 
            placeholder="Task title"
            class="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <textarea 
            v-model="newTask.description"
            placeholder="Task description"
            rows="2"
            class="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          ></textarea>
          <div class="flex gap-3">
            <select 
              v-model="newTask.category"
              class="flex-1 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="Feature">Feature</option>
              <option value="Bug">Bug</option>
              <option value="Refactor">Refactor</option>
              <option value="AI">AI</option>
            </select>
            <select 
              v-model="newTask.priority"
              class="flex-1 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div class="flex justify-end gap-2">
            <button 
              @click="isAddingTask = false"
              class="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="addTask"
              class="px-3 py-1.5 bg-primary-500 hover:bg-primary-600 text-white rounded-md text-sm transition-colors"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex-1 overflow-y-auto p-4">
      <ul class="space-y-3">
        <li 
          v-for="task in tasks" 
          :key="task.id" 
          class="flex flex-col p-3 rounded-lg bg-white border border-gray-200 hover:shadow-sm transition-shadow"
        >
          <div class="flex items-start gap-3">
            <input 
              type="checkbox" 
              :checked="task.completed" 
              @change="toggleTaskCompletion(task)"
              class="mt-1 h-5 w-5 rounded-md text-primary-500 bg-gray-200 border-gray-300 focus:ring-primary-500" 
            />
            <div class="flex-1">
              <div class="flex items-start justify-between">
                <h3 class="font-medium" :class="{ 'line-through text-gray-500': task.completed }">{{ task.title }}</h3>
                <button 
                  @click="deleteTask(task.id)"
                  class="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <div class="i-mdi-close w-5 h-5"></div>
                </button>
              </div>
              <p v-if="task.description" class="text-sm text-gray-600 mt-1">{{ task.description }}</p>
              <div class="flex flex-wrap gap-2 mt-2">
                <span :class="[getCategoryClass(task.category), 'text-xs font-semibold px-2 py-1 rounded-full']">{{ task.category }}</span>
                <span :class="[getPriorityClass(task.priority), 'text-xs font-semibold px-2 py-1 rounded-full']">{{ task.priority }}</span>
                <span v-if="task.assignedTo" class="text-xs bg-gray-500/10 text-gray-400 px-2 py-1 rounded-full">{{ task.assignedTo }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      
      <div v-if="tasks.length === 0" class="text-center py-8 text-gray-500">
        <div class="i-mdi-format-list-checks text-4xl mx-auto mb-2"></div>
        <p>No tasks yet. Create your first task!</p>
      </div>
    </div>
  </div>
</template>