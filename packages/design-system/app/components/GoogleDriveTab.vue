<script setup lang="ts">
interface DriveFile {
	id: string;
	name: string;
	type: string;
	icon: string;
}

interface Props {
	isConnected: boolean;
	files: DriveFile[];
	selectedFiles: string[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"update:isConnected": [connected: boolean];
	"update:selectedFiles": [files: string[]];
}>();

function connectAccount() {
	emit("update:isConnected", true);
}

function disconnectAccount() {
	emit("update:isConnected", false);
	emit("update:selectedFiles", []);
}

function toggleFileSelection(fileId: string) {
	const newSelection = props.selectedFiles.includes(fileId)
		? props.selectedFiles.filter((id) => id !== fileId)
		: [...props.selectedFiles, fileId];

	emit("update:selectedFiles", newSelection);
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Not Connected State -->
    <div v-if="!isConnected" class="flex-1 flex flex-col items-center justify-center text-center">
      <div class="i-mdi-google-drive w-lg h-lg text-border-normal"></div>
      <h3 class="text-xl font-semibold mt-md">Connect to Google Drive</h3>
      <p class="mt-2 text-border-normal max-w-sm">
        Access and attach files directly from your Google Drive account.
      </p>
      <button
        @click="connectAccount"
        class="mt-md flex items-center space-x-2 px-md py-3 bg-info-normal text-white rounded-lg font-semibold hover:bg-info-active"
      >
        <div class="i-mdi-login w-md h-md"></div>
        <span>Connect Account</span>
      </button>
    </div>

    <!-- Connected State -->
    <div v-else class="flex flex-col h-full">
      <div class="flex items-center justify-between mb-md">
        <p class="text-sm text-border-normal">
          Connected as: <span class="font-semibold text-background-normal">user@gmail.com</span>
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
          placeholder="Search in Drive..."
          class="w-full px-lg pr-md py-2 border border-normal bg-background-normal"
        />
        <div class="i-mdi-magnify w-md h-md absolute left-3 top-1/2 -translate-y-1/2 text-border-normal"></div>
      </div>

      <div class="flex-1 overflow-y-auto border rounded-lg -mr-3 pr-3">
        <ul class="space-y-1 p-2">
          <li
            v-for="file in files"
            :key="file.id"
            class="flex items-center space-x-3 p-2 rounded-md hover:bg-background-active cursor-pointer"
            @click="toggleFileSelection(file.id)"
          >
            <input
              type="checkbox"
              :value="file.id"
              :checked="selectedFiles.includes(file.id)"
              class="rounded"
              @change="toggleFileSelection(file.id)"
              @click.stop
            />
            <div :class="[file.icon, 'w-md h-md text-border-normal']"></div>
            <span class="text-sm">{{ file.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
