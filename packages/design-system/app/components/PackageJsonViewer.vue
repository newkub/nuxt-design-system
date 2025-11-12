<script setup lang="ts">
import { computed, ref } from "vue";
import Codeblock from "../code/Codeblock.vue";

const {
	data: packageData,
	pending,
	error,
} = useFetch("/api/devtools/package-json", {
	lazy: true,
	server: false,
});

const packageJson = computed(() => {
	if (!packageData.value) return null;
	return packageData.value;
});

const dependencies = computed(() => {
	if (!packageJson.value?.dependencies) return [];
	return Object.entries(packageJson.value.dependencies).map(
		([name, version]) => ({
			name,
			version: version as string,
		}),
	);
});

const devDependencies = computed(() => {
	if (!packageJson.value?.devDependencies) return [];
	return Object.entries(packageJson.value.devDependencies).map(
		([name, version]) => ({
			name,
			version: version as string,
		}),
	);
});

const scripts = computed(() => {
	if (!packageJson.value?.scripts) return [];
	return Object.entries(packageJson.value.scripts).map(([name, command]) => ({
		command: command as string,
		name,
	}));
});

const showRaw = ref(false);

const rawJson = computed(() => {
	if (!packageJson.value) return "";
	return JSON.stringify(packageJson.value, null, 2);
});
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <div class="space-y-6 flex-1 overflow-auto">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold">package.json</h2>
          <p class="text-gray-600 mt-1">
            {{ packageJson.name }} v{{ packageJson.version }}
          </p>
        </div>
        <button
          class="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center gap-2"
          @click="showRaw = !showRaw"
        >
          <div :class="showRaw ? 'i-mdi-view-list' : 'i-mdi-code-json'" />
          <span>{{ showRaw ? 'View List' : 'View JSON' }}</span>
        </button>
      </div>

      <div v-if="error" class="p-4 bg-red-50 rounded-md text-red-600">
        Failed to load package.json: {{ error.message }}
      </div>

      <div v-else-if="pending" class="space-y-4">
        <div class="animate-pulse">
          <div class="h-8 bg-gray-200 rounded w-1/3 mb-4" />
          <div class="h-32 bg-gray-200 rounded" />
        </div>
      </div>

      <div v-else-if="showRaw && packageJson">
        <Codeblock :code="rawJson" language="json" />
      </div>

      <div v-else-if="packageJson" class="grid lg:grid-cols-2 gap-6 h-[calc(100vh-300px)]">
        <!-- Left Column: Scripts -->
        <div class="space-y-4 overflow-y-auto pr-2">
          <section v-if="scripts.length > 0">
            <div class="flex items-center gap-2 mb-3 sticky top-0 bg-white pb-2 z-10">
              <div class="i-mdi-script-text text-xl text-primary-500" />
              <h3 class="text-lg font-semibold">Scripts ({{ scripts.length }})</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="script in scripts"
                :key="script.name"
                class="group px-4 py-2 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 hover:shadow-md transition-all"
                :title="script.command"
              >
                <div class="flex items-center gap-2">
                  <div class="i-mdi-play-circle text-primary-600" />
                  <span class="font-mono text-sm font-semibold text-primary-700">
                    {{ script.name }}
                  </span>
                </div>
                <div class="text-xs text-gray-600 mt-1 font-mono truncate max-w-[200px]">
                  {{ script.command }}
                </div>
              </button>
            </div>
          </section>
        </div>

        <!-- Right Column: Dependencies -->
        <div class="space-y-6 overflow-y-auto pr-2">
          <!-- Dependencies -->
          <section v-if="dependencies.length > 0">
            <div class="flex items-center gap-2 mb-3 sticky top-0 bg-white pb-2 z-10">
              <div class="i-mdi-package text-xl text-green-500" />
              <h3 class="text-lg font-semibold">Dependencies ({{ dependencies.length }})</h3>
            </div>
            <div class="space-y-2">
              <a
                v-for="dep in dependencies"
                :key="dep.name"
                :href="`https://www.npmjs.com/package/${dep.name}`"
                target="_blank"
                class="flex items-center justify-between p-2 rounded-md bg-gray-50 hover:bg-green-50 border border-transparent hover:border-green-300 transition-colors group"
              >
                <span class="font-mono text-sm truncate group-hover:text-green-600">
                  {{ dep.name }}
                </span>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500 flex-shrink-0">{{ dep.version }}</span>
                  <div class="i-mdi-open-in-new text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            </div>
          </section>

          <!-- Dev Dependencies -->
          <section v-if="devDependencies.length > 0">
            <div class="flex items-center gap-2 mb-3 sticky top-0 bg-white pb-2 z-10">
              <div class="i-mdi-package-variant text-xl text-blue-500" />
              <h3 class="text-lg font-semibold">Dev Dependencies ({{ devDependencies.length }})</h3>
            </div>
            <div class="space-y-2">
              <a
                v-for="dep in devDependencies"
                :key="dep.name"
                :href="`https://www.npmjs.com/package/${dep.name}`"
                target="_blank"
                class="flex items-center justify-between p-2 rounded-md bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-blue-300 transition-colors group"
              >
                <span class="font-mono text-sm truncate group-hover:text-blue-600">
                  {{ dep.name }}
                </span>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500 flex-shrink-0">{{ dep.version }}</span>
                  <div class="i-mdi-open-in-new text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>