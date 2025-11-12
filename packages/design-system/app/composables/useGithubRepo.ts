import type { Ref } from "vue";
import { computed, ref, watch } from "vue";

import type { FileItem, SelectedFile } from "~/types/code";

export function useGithubRepo(repoSlug: Ref<string | null>) {
	const {
		data: treeData,
		pending: treePending,
		error: treeError,
		execute: fetchTree,
	} = useFetch<FileItem[]>(() => `/api/repo/tree/${repoSlug.value || ""}`, {
		immediate: false,
		transform: (data) => data || [], // Ensure we always have an array
		watch: [repoSlug],
	});

	const fileTree = computed(() => treeData.value || []);
	const selectedFile = ref<SelectedFile | null>(null);

	const {
		data: fileData,
		pending: filePending,
		error: fileError,
		execute: fetchFile,
	} = useFetch<{ path: string; content: string }>(`/api/repo/content`, {
		immediate: false,
		params: {
			path: computed(() => selectedFile.value?.path || ""),
			repo: repoSlug,
		},
	});

	const selectFile = async (file: FileItem) => {
		if (file.type !== "file") return;
		if (!repoSlug.value) return;
		await fetchFile();
		if (fileData.value) {
			selectedFile.value = {
				content: fileData.value.content,
				language: fileData.value.path.split(".").pop() || "plaintext",
				name: fileData.value.path.split("/").pop() || "",
				path: fileData.value.path,
				size: `${new Blob([fileData.value.content]).size} bytes`,
			};
		}
	};

	watch(
		repoSlug,
		(newSlug) => {
			if (newSlug) {
				selectedFile.value = null;
				fetchTree();
			} else {
				treeData.value = [];
				selectedFile.value = null;
			}
		},
		{ immediate: true },
	);

	return {
		error: computed(() => treeError.value || fileError.value),
		fileTree,
		pending: computed(() => treePending.value || filePending.value),
		selectedFile,
		selectFile,
	};
}
