<script setup lang="ts">
import { ref, computed } from 'vue'

interface Package {
  name: string
  version: string
  description: string
  installed: boolean
  outdated: boolean
  latestVersion?: string
}

const packages = ref<Package[]>([
  { name: 'vue', version: '3.4.0', description: 'Progressive JavaScript Framework', installed: true, outdated: true, latestVersion: '3.5.0' },
  { name: 'nuxt', version: '3.10.0', description: 'The Intuitive Vue Framework', installed: true, outdated: false },
  { name: 'typescript', version: '5.3.3', description: 'TypeScript language', installed: true, outdated: true, latestVersion: '5.4.0' },
  { name: 'vite', version: '5.0.12', description: 'Next Generation Frontend Tooling', installed: true, outdated: false },
  { name: 'axios', version: '', description: 'Promise based HTTP client', installed: false, outdated: false }
])

const searchQuery = ref('')
const filterType = ref<'all' | 'installed' | 'outdated'>('all')

const filteredPackages = computed(() => {
  let result = packages.value

  if (filterType.value === 'installed') {
    result = result.filter(p => p.installed)
  } else if (filterType.value === 'outdated') {
    result = result.filter(p => p.outdated)
  }

  if (searchQuery.value) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return result
})

const installPackage = (pkg: Package) => {
  pkg.installed = true
  pkg.version = pkg.latestVersion || '1.0.0'
}

const updatePackage = (pkg: Package) => {
  if (pkg.latestVersion) {
    pkg.version = pkg.latestVersion
    pkg.outdated = false
  }
}

const uninstallPackage = (pkg: Package) => {
  pkg.installed = false
  pkg.version = ''
}
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200 bg-gray-50">
      <h2 class="text-lg font-semibold text-gray-900 mb-3">Package Manager</h2>
      
      <div class="flex items-center gap-2">
        <div class="relative flex-1">
          <div class="i-mdi-magnify absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search packages..."
            class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        
        <select
          v-model="filterType"
          class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="all">All Packages</option>
          <option value="installed">Installed</option>
          <option value="outdated">Outdated</option>
        </select>
      </div>
    </div>

    <!-- Package List -->
    <div class="flex-1 overflow-y-auto">
      <div
        v-for="pkg in filteredPackages"
        :key="pkg.name"
        class="p-4 border-b border-gray-100 hover:bg-gray-50"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="font-semibold text-gray-900">{{ pkg.name }}</h3>
              <span v-if="pkg.installed" class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                v{{ pkg.version }}
              </span>
              <span v-if="pkg.outdated" class="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
                Update available: v{{ pkg.latestVersion }}
              </span>
            </div>
            <p class="text-sm text-gray-600">{{ pkg.description }}</p>
          </div>

          <div class="flex items-center gap-2 ml-4">
            <button
              v-if="!pkg.installed"
              class="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              @click="installPackage(pkg)"
            >
              Install
            </button>
            <button
              v-else-if="pkg.outdated"
              class="px-3 py-1.5 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm"
              @click="updatePackage(pkg)"
            >
              Update
            </button>
            <button
              v-if="pkg.installed"
              class="px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
              @click="uninstallPackage(pkg)"
            >
              Uninstall
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredPackages.length === 0" class="text-center text-gray-400 py-8">
        No packages found
      </div>
    </div>
  </div>
</template>
