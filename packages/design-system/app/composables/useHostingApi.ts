import { useHostingApiData } from "./useHostingApiData";
import { useHostingApiMutations } from "./useHostingApiMutations";

/**
 * Main Hosting API composable
 * Combines data fetching and mutation operations
 * Following Nuxt 4 best practices for API composition
 */
export function useHostingApi() {
	// Initialize data fetching operations
	const dataOps = useHostingApiData();

	// Initialize mutation operations
	const mutationOps = useHostingApiMutations();

	// Combine loading states - true if either is loading
	const loading = computed(
		() => dataOps.loading.value || mutationOps.loading.value,
	);

	// Combine error states - show first available error
	const error = computed(() => dataOps.error.value || mutationOps.error.value);

	// Return unified API
	return {
		// State
		loading,
		error,
		// Data fetching methods
		fetchHostingData: dataOps.fetchHostingData,
		fetchDeployments: dataOps.fetchDeployments,
		fetchEnvVariables: dataOps.fetchEnvVariables,
		fetchTeamMembers: dataOps.fetchTeamMembers,
		fetchBillingInfo: dataOps.fetchBillingInfo,
		fetchProjectSettings: dataOps.fetchProjectSettings,
		// Mutation methods
		saveProjectSettings: mutationOps.saveProjectSettings,
		addEnvVariable: mutationOps.addEnvVariable,
		updateEnvVariable: mutationOps.updateEnvVariable,
		deleteEnvVariable: mutationOps.deleteEnvVariable,
		inviteTeamMember: mutationOps.inviteTeamMember,
		removeTeamMember: mutationOps.removeTeamMember,
		updateTeamMemberRole: mutationOps.updateTeamMemberRole,
		updateBillingInfo: mutationOps.updateBillingInfo,
		deleteProject: mutationOps.deleteProject,
	};
}
