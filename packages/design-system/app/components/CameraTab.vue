<script setup lang="ts">
import { ref, watch } from "vue";
import { useCamera } from "~/composables/useCamera";

interface Props {
	mode: "photo" | "video";
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"photo-captured": [dataUrl: string];
	"video-recorded": [blob: Blob];
}>();

// Camera state
const {
	videoElement,
	stream,
	isRecording,
	startCamera,
	stopCamera,
	takePhoto,
	startRecording,
	stopRecording,
} = useCamera();
const capturedImage = ref<string | null>(null);
const recordedVideoUrl = ref<string | null>(null);

async function handleTakePhoto() {
	const photoDataUrl = takePhoto();
	if (photoDataUrl) {
		capturedImage.value = photoDataUrl;
		stopCamera();
		emit("photo-captured", photoDataUrl);
	}
}

function retakePhoto() {
	capturedImage.value = null;
	startCamera();
}

async function handleStopRecording() {
	const videoBlob = await stopRecording();
	if (videoBlob) {
		recordedVideoUrl.value = URL.createObjectURL(videoBlob);
		stopCamera();
		emit("video-recorded", videoBlob);
	}
}

function retakeVideo() {
	if (recordedVideoUrl.value) {
		URL.revokeObjectURL(recordedVideoUrl.value);
		recordedVideoUrl.value = null;
	}
	startCamera();
}

function startVideoRecording() {
	startRecording();
}

watch(
	() => props.mode,
	(newMode, oldMode) => {
		// Reset state when switching modes
		capturedImage.value = null;
		if (recordedVideoUrl.value) {
			URL.revokeObjectURL(recordedVideoUrl.value);
			recordedVideoUrl.value = null;
		}
		if (stream.value) {
			stopCamera();
		}
		startCamera();
	},
);

// Start camera when component mounts
startCamera();
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center h-full">
    <div class="w-full max-w-md bg-black rounded-lg aspect-video flex items-center justify-center text-white mb-md overflow-hidden">
      <!-- Photo Mode -->
      <template v-if="mode === 'photo'">
        <img
          v-if="capturedImage"
          :src="capturedImage"
          class="w-full h-full object-contain"
        />
        <video
          v-else
          ref="videoElement"
          autoplay
          playsinline
          muted
          class="w-full h-full object-contain"
        ></video>
      </template>

      <!-- Video Mode -->
      <template v-if="mode === 'video'">
        <video
          v-if="recordedVideoUrl"
          :src="recordedVideoUrl"
          controls
          class="w-full h-full object-contain"
        ></video>
        <video
          v-else
          ref="videoElement"
          autoplay
          playsinline
          muted
          class="w-full h-full object-contain"
        ></video>
      </template>
    </div>

    <!-- Photo Controls -->
    <template v-if="mode === 'photo'">
      <div v-if="capturedImage" class="flex space-x-md">
        <button @click="retakePhoto" class="px-md py-3 bg-border-normal rounded-lg font-semibold">
          Retake
        </button>
        <button class="px-md py-3 bg-info-normal text-white rounded-lg font-semibold">
          Use Photo
        </button>
      </div>
      <button
        v-else
        :disabled="!stream"
        @click="handleTakePhoto"
        class="px-md py-3 bg-danger-normal text-white rounded-full font-semibold disabled:bg-border-normal"
      >
        Capture Photo
      </button>
    </template>

    <!-- Video Controls -->
    <template v-if="mode === 'video'">
      <div v-if="recordedVideoUrl" class="flex space-x-md">
        <button @click="retakeVideo" class="px-md py-3 bg-border-normal rounded-lg font-semibold">
          Record Again
        </button>
        <button class="px-md py-3 bg-info-normal text-white rounded-lg font-semibold">
          Use Video
        </button>
      </div>
      <template v-else>
        <button
          v-if="!isRecording"
          :disabled="!stream"
          @click="startVideoRecording"
          class="px-md py-3 bg-danger-normal text-white rounded-full font-semibold disabled:bg-border-normal"
        >
          Start Recording
        </button>
        <button
          v-else
          @click="handleStopRecording"
          class="px-md py-3 bg-border-normal text-white rounded-full font-semibold"
        >
          Stop Recording
        </button>
      </template>
    </template>
  </div>
</template>
