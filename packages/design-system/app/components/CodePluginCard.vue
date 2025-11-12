<script setup lang="ts">
import type { Plugin } from "~/types/plugin";

interface Props {
	plugin: Plugin;
}

interface Emits {
	(e: "select", plugin: Plugin): void;
	(e: "toggle", pluginId: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function handleClick() {
	emit("select", props.plugin);
}

function handleToggle(event: Event) {
	event.stopPropagation();
	emit("toggle", props.plugin.id);
}
</script>

<template>
	<div
		class="flex items-center p-3 hover:bg-gray-100 transition-colors cursor-pointer"
		@click="handleClick"
	>
		<!-- Plugin Logo -->
		<div
			:class="[
				'w-10 h-10 flex items-center justify-center rounded-md mr-3',
				plugin.enabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400',
			]"
		>
			<div :class="plugin.logo" class="text-xl" />
		</div>

		<!-- Plugin Info -->
		<div class="flex-1 min-w-0">
			<div class="flex items-baseline">
				<h3
					class="font-medium truncate"
					:class="plugin.enabled ? 'text-gray-900' : 'text-gray-500'"
				>
					{{ plugin.name }}
				</h3>
				<span
					class="ml-2 text-xs px-1.5 py-0.5 rounded"
					:class="
						plugin.enabled
							? 'bg-green-100 text-green-800'
							: 'bg-gray-100 text-gray-800'
					"
				>
					{{ plugin.version }}
				</span>
			</div>
			<p
				class="text-sm truncate mt-1"
				:class="plugin.enabled ? 'text-gray-600' : 'text-gray-400'"
			>
				{{ plugin.description }}
			</p>
			<div class="mt-1">
				<span class="text-xs text-gray-500">{{ plugin.category }}</span>
			</div>
		</div>

		<!-- Toggle Switch -->
		<button
			@click="handleToggle"
			:class="[
				'relative inline-flex h-5 w-9 items-center rounded-full ml-2 transition-colors focus:outline-none',
				plugin.enabled ? 'bg-primary-600' : 'bg-gray-300',
			]"
			:aria-pressed="plugin.enabled"
		>
			<span
				:class="[
					'inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform',
					plugin.enabled ? 'translate-x-4' : 'translate-x-0.5',
				]"
			/>
		</button>
	</div>
</template>
