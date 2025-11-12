import type {
	BillingInfo,
	EnvironmentVariable,
	TeamMember,
} from "~/types/hosting";
import {
	type ApiResponse,
	HOSTING_API_BASE_URL,
	createErrorResponse,
	hostingApiFetch,
} from "./useHostingApiCore";

/**
 * Hosting API mutation operations
 * Handles all write operations (POST, PUT, DELETE)
 */
export function useHostingApiMutations() {
	const loading = ref(false);
	const error = ref<string | null>(null);

	/**
	 * Generic mutation wrapper with loading/error state
	 */
	async function mutateWithState<T = ApiResponse>(
		mutateFn: () => Promise<T | null>,
	): Promise<T> {
		loading.value = true;
		error.value = null;
		try {
			const result = await mutateFn();
			return result || createErrorResponse("No response from server") as T;
		} catch (err: unknown) {
			const errorMsg = err instanceof Error ? err.message : "An unknown error occurred";
			error.value = errorMsg;
			return createErrorResponse(errorMsg) as T;
		} finally {
			loading.value = false;
		}
	}

	/**
	 * Save project settings
	 */
	const saveProjectSettings = (settings: {
		projectName: string;
		projectRegion: string;
		projectFramework: string;
	}) =>
		mutateWithState(() =>
			hostingApiFetch<ApiResponse>(HOSTING_API_BASE_URL, {
				method: "POST",
				query: { action: "save-settings" },
				body: settings,
			}),
		);

	/**
	 * Add environment variable
	 */
	const addEnvVariable = (envVar: Omit<EnvironmentVariable, "id">) =>
		mutateWithState(() =>
			hostingApiFetch<ApiResponse>(HOSTING_API_BASE_URL, {
				method: "POST",
				query: { action: "add-env-var" },
				body: envVar,
			}),
		);

	/**
	 * Update environment variable
	 */
	const updateEnvVariable = (envVar: EnvironmentVariable) =>
		mutateWithState(() =>
			hostingApiFetch<ApiResponse>(HOSTING_API_BASE_URL, {
				method: "POST",
				query: { action: "update-env-var" },
				body: envVar,
			}),
		);

	/**
	 * Delete environment variable
	 */
	const deleteEnvVariable = (envVarId: string) =>
		mutateWithState(() =>
			hostingApiFetch<ApiResponse>(HOSTING_API_BASE_URL, {
				method: "POST",
				query: { action: "delete-env-var" },
				body: { id: envVarId },
			}),
		);

	/**
	 * Invite team member
	 */
	const inviteTeamMember = (member: Omit<TeamMember, "id" | "joinedAt">) =>
		mutateWithState(() =>
			hostingApiFetch<ApiResponse>(HOSTING_API_BASE_URL, {
				method: "POST",
				query: { action: "invite-member" },
				body: member,
			}),
		);

	/**
	 * Remove team member
	 */
	const removeTeamMember = (memberId: string) =>
		mutateWithState(() =>
			hostingApiFetch<ApiResponse>(HOSTING_API_BASE_URL, {
				method: "POST",
				query: { action: "remove-member" },
				body: { id: memberId },
			}),
		);

	/**
	 * Update team member role
	 */
	const updateTeamMemberRole = (memberId: string, role: string) =>
		mutateWithState(() =>
			hostingApiFetch<ApiResponse>(HOSTING_API_BASE_URL, {
				method: "POST",
				query: { action: "update-member-role" },
				body: { id: memberId, role },
			}),
		);

	/**
	 * Update billing information
	 */
	const updateBillingInfo = (billing: BillingInfo) =>
		mutateWithState(() =>
			hostingApiFetch<ApiResponse>(HOSTING_API_BASE_URL, {
				method: "POST",
				query: { action: "update-billing" },
				body: billing,
			}),
		);

	/**
	 * Delete project
	 */
	const deleteProject = () =>
		mutateWithState(() =>
			hostingApiFetch<ApiResponse>(HOSTING_API_BASE_URL, {
				method: "POST",
				query: { action: "delete-project" },
			}),
		);

	return {
		loading,
		error,
		saveProjectSettings,
		addEnvVariable,
		updateEnvVariable,
		deleteEnvVariable,
		inviteTeamMember,
		removeTeamMember,
		updateTeamMemberRole,
		updateBillingInfo,
		deleteProject,
	};
}
