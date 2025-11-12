<script setup lang="ts">
interface GitHubRepo {
	id: string;
	name: string;
	owner: string;
	private: boolean;
}

interface Props {
	isConnected: boolean;
	repos: GitHubRepo[];
	selectedRepos: string[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"update:isConnected": [connected: boolean];
	"update:selectedRepos": [repos: string[]];
}>();

function connectAccount() {
	emit("update:isConnected", true);
}

function disconnectAccount() {
	emit("update:isConnected", false);
	emit("update:selectedRepos", []);
}

function toggleRepoSelection(repoId: string) {
	const newSelection = props.selectedRepos.includes(repoId)
		? props.selectedRepos.filter((id) => id !== repoId)
		: [...props.selectedRepos, repoId];

	emit("update:selectedRepos", newSelection);
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Not Connected State -->
    <div v-if="!isConnected" class="flex-1 flex flex-col items-center justify-center text-center">
      <div class="i-mdi-github w-lg h-lg"></div>
      <h3 class="text-xl font-semibold mt-md">Connect to GitHub</h3>
      <p class="mt-2 text-border-normal max-w-sm">
        Access and attach repositories from your GitHub account.
      </p>
      <button
        @click="connectAccount"
        class="mt-md flex items-center space-x-2 px-md py-3 bg-background-active text-white rounded-lg font-semibold hover:bg-background-normal"
      >
        <div class="i-mdi-login w-md h-md"></div>
        <span>Connect Account</span>
      </button>
    </div>

    <!-- Connected State -->
    <div v-else class="flex flex-col h-full">
      <div class="flex items-center justify-between mb-md">
        <p class="text-sm text-border-normal">
          Connected as: <span class="font-semibold text-background-normal">newkub</span>
        </p>
        <button
          @click="disconnectAccount"
          class="text-sm text-danger-normal hover:underline"
        >
          Disconnect
        </button>
      </div>

      <div class="relative mb-md">
        <input
          type="search"
          placeholder="Search repositories..."
          class="w-full px-lg pr-md py-2 border border-normal bg-background-normal"
        />
        <div class="i-mdi-magnify w-md h-md absolute left-3 top-1/2 -translate-y-1/2 text-border-normal"></div>
      </div>

      <div class="flex-1 overflow-y-auto border rounded-lg -mr-3 pr-3">
        <ul class="space-y-1 p-2">
          <li
            v-for="repo in repos"
            :key="repo.id"
            class="flex items-center space-x-3 p-2 rounded-md hover:bg-background-active cursor-pointer"
            @click="toggleRepoSelection(repo.id)"
          >
            <input
              type="checkbox"
              :value="repo.id"
              :checked="selectedRepos.includes(repo.id)"
              class="rounded"
              @change="toggleRepoSelection(repo.id)"
              @click.stop
            />
            <div :class="[repo.private ? 'i-mdi-lock-outline' : 'i-mdi-source-repository', 'w-md h-md text-border-normal']"></div>
            <div class="text-sm">
              <span>{{ repo.owner }}/</span><span class="font-semibold">{{ repo.name }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
