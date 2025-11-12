import type {
	BillingInfo,
	Deployment,
	EnvironmentVariable,
	TeamMember,
} from "~/types/hosting";
import { HOSTING_API_BASE_URL, hostingApiFetch } from "./useHostingApiCore";

/**
 * Response types for hosting data endpoints
 */
export interface HostingDataResponse {
	deployments: Deployment[];
	envVariables: EnvironmentVariable[];
	teamMembers: TeamMember[];
	billingInfo: BillingInfo;
	projectName: string;
	projectRegion: string;
	projectFramework: string;
}

/**
 * Hosting API data fetching operations
 * Handles all read-only API calls
 */
export function useHostingApiData() {
	const loading = ref(false);
	const error = ref<string | null>(null);

	/**
	 * Generic fetch wrapper with loading/error state
	 */
	async function fetchWithState<T>(
		fetchFn: () => Promise<T | null>,
	): Promise<T | null> {
		loading.value = true;
		error.value = null;
		try {
			return await fetchFn();
		} catch (err: unknown) {
			error.value = err instanceof Error ? err.message : "An unknown error occurred";
			return null;
		} finally {
			loading.value = false;
		}
	}

	/**
	 * Fetch all hosting data
	 */
	const fetchHostingData = () =>
		fetchWithState(() =>
			hostingApiFetch<HostingDataResponse>(HOSTING_API_BASE_URL, {
				query: { resource: "all" },
			}),
		);

	/**
	 * Fetch deployments only
	 */
	const fetchDeployments = async () => {
		const data = await fetchWithState(() =>
			hostingApiFetch<{ deployments: Deployment[] }>(HOSTING_API_BASE_URL, {
				query: { resource: "deployments" },
			}),
		);
		return data?.deployments || [];
	};

	/**
	 * Fetch environment variables
	 */
	const fetchEnvVariables = async () => {
		const data = await fetchWithState(() =>
			hostingApiFetch<{ envVariables: EnvironmentVariable[] }>(
				HOSTING_API_BASE_URL,
				{
					query: { resource: "environment" },
				},
			),
		);
		return data?.envVariables || [];
	};

	/**
	 * Fetch team members
	 */
	const fetchTeamMembers = async () => {
		const data = await fetchWithState(() =>
			hostingApiFetch<{ teamMembers: TeamMember[] }>(HOSTING_API_BASE_URL, {
				query: { resource: "team" },
			}),
		);
		return data?.teamMembers || [];
	};

	/**
	 * Fetch billing information
	 */
	const fetchBillingInfo = async () => {
		const data = await fetchWithState(() =>
			hostingApiFetch<{ billingInfo: BillingInfo }>(HOSTING_API_BASE_URL, {
				query: { resource: "billing" },
			}),
		);
		return data?.billingInfo;
	};

	/**
	 * Fetch project settings
	 */
	const fetchProjectSettings = () =>
		fetchWithState(() =>
			hostingApiFetch<{
				projectName: string;
				projectRegion: string;
				projectFramework: string;
			}>(HOSTING_API_BASE_URL, {
				query: { resource: "settings" },
			}),
		);

	return {
		loading,
		error,
		fetchHostingData,
		fetchDeployments,
		fetchEnvVariables,
		fetchTeamMembers,
		fetchBillingInfo,
		fetchProjectSettings,
	};
}
