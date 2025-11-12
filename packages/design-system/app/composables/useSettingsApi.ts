import { type Ref, ref } from "vue";
import { useFetch } from "#app";
import type {
	AccountInfo,
	ApiResponse,
	BillingInfo,
	ConnectedAccount,
	PaymentMethod,
	PlanFeature,
	UserProfile,
} from "~/types/settings";

export function useSettingsApi() {
	// State for loading and errors
	const loading: Ref<boolean> = ref(false);
	const error: Ref<string | null> = ref(null);

	// Base API URL
	const baseURL = "/api/settings";

	// Fetch user profile
	const fetchUserProfile = async () => {
		loading.value = true;
		error.value = null;

		try {
			const { data, error: fetchError } = await useFetch<
				ApiResponse<UserProfile>
			>(baseURL, {
				query: { action: "profile" },
			});

			if (fetchError.value) {
				throw new Error(
					fetchError.value.message || "Failed to fetch user profile",
				);
			}

			return data.value?.data;
		} catch (err: unknown) {
			error.value = err instanceof Error ? err.message : "An unknown error occurred";
			console.error("Error fetching user profile:", err);
			return null;
		} finally {
			loading.value = false;
		}
	};

	// Update user profile
	const updateUserProfile = async (profile: Partial<UserProfile>) => {
		loading.value = true;
		error.value = null;

		try {
			const { data, error: fetchError } = await useFetch<
				ApiResponse<UserProfile>
			>(baseURL, {
				body: profile,
				method: "POST",
				query: { action: "update-profile" },
			});

			if (fetchError.value) {
				throw new Error(
					fetchError.value.message || "Failed to update user profile",
				);
			}

			return data.value;
		} catch (err: unknown) {
			error.value = err instanceof Error ? err.message : "An unknown error occurred";
			console.error("Error updating user profile:", err);
			return { message: error.value, success: false };
		} finally {
			loading.value = false;
		}
	};

	// Fetch account information
	const fetchAccountInfo = async () => {
		loading.value = true;
		error.value = null;

		try {
			const { data, error: fetchError } = await useFetch<
				ApiResponse<{
					accountInfo: AccountInfo;
					connectedAccounts: ConnectedAccount[];
				}>
			>(baseURL, {
				query: { action: "account" },
			});

			if (fetchError.value) {
				throw new Error(
					fetchError.value.message || "Failed to fetch account information",
				);
			}

			return data.value?.data;
		} catch (err: unknown) {
			error.value = err instanceof Error ? err.message : "An unknown error occurred";
			console.error("Error fetching account information:", err);
			return null;
		} finally {
			loading.value = false;
		}
	};

	// Connect account
	const connectAccount = async (accountId: string, email: string) => {
		loading.value = true;
		error.value = null;

		try {
			const { data, error: fetchError } = await useFetch<ApiResponse>(baseURL, {
				body: { accountId, email },
				method: "POST",
				query: { action: "connect-account" },
			});

			if (fetchError.value) {
				throw new Error(
					fetchError.value.message || "Failed to connect account",
				);
			}

			return data.value;
		} catch (err: unknown) {
			error.value = err instanceof Error ? err.message : "An unknown error occurred";
			console.error("Error connecting account:", err);
			return { message: error.value, success: false };
		} finally {
			loading.value = false;
		}
	};

	// Disconnect account
	const disconnectAccount = async (accountId: string) => {
		loading.value = true;
		error.value = null;

		try {
			const { data, error: fetchError } = await useFetch<ApiResponse>(baseURL, {
				body: { accountId },
				method: "POST",
				query: { action: "disconnect-account" },
			});

			if (fetchError.value) {
				throw new Error(
					fetchError.value.message || "Failed to disconnect account",
				);
			}

			return data.value;
		} catch (err: unknown) {
			error.value = err instanceof Error ? err.message : "An unknown error occurred";
			console.error("Error disconnecting account:", err);
			return { message: error.value, success: false };
		} finally {
			loading.value = false;
		}
	};

	// Fetch billing information
	const fetchBillingInfo = async () => {
		loading.value = true;
		error.value = null;

		try {
			const { data, error: fetchError } = await useFetch<
				ApiResponse<{
					billingInfo: BillingInfo;
					plans: PlanFeature[];
					paymentMethods: PaymentMethod[];
				}>
			>(baseURL, {
				query: { action: "billing" },
			});

			if (fetchError.value) {
				throw new Error(
					fetchError.value.message || "Failed to fetch billing information",
				);
			}

			return data.value?.data;
		} catch (err: unknown) {
			error.value = err instanceof Error ? err.message : "An unknown error occurred";
			console.error("Error fetching billing information:", err);
			return null;
		} finally {
			loading.value = false;
		}
	};

	// Add payment method
	const addPaymentMethod = async (paymentMethod: Omit<PaymentMethod, "id" | "isDefault">) => {
		loading.value = true;
		error.value = null;

		try {
			const { data, error: fetchError } = await useFetch<ApiResponse>(baseURL, {
				body: paymentMethod,
				method: "POST",
				query: { action: "add-payment-method" },
			});

			if (fetchError.value) {
				throw new Error(
					fetchError.value.message || "Failed to add payment method",
				);
			}

			return data.value;
		} catch (err: unknown) {
			error.value = err instanceof Error ? err.message : "An unknown error occurred";
			console.error("Error adding payment method:", err);
			return { message: error.value, success: false };
		} finally {
			loading.value = false;
		}
	};

	// Remove payment method
	const removePaymentMethod = async (id: number) => {
		loading.value = true;
		error.value = null;

		try {
			const { data, error: fetchError } = await useFetch<ApiResponse>(baseURL, {
				body: { id },
				method: "POST",
				query: { action: "remove-payment-method" },
			});

			if (fetchError.value) {
				throw new Error(
					fetchError.value.message || "Failed to remove payment method",
				);
			}

			return data.value;
		} catch (err: unknown) {
			error.value = err instanceof Error ? err.message : "An unknown error occurred";
			console.error("Error removing payment method:", err);
			return { message: error.value, success: false };
		} finally {
			loading.value = false;
		}
	};

	// Set default payment method
	const setDefaultPaymentMethod = async (id: number) => {
		loading.value = true;
		error.value = null;

		try {
			const { data, error: fetchError } = await useFetch<ApiResponse>(baseURL, {
				body: { id },
				method: "POST",
				query: { action: "set-default-payment" },
			});

			if (fetchError.value) {
				throw new Error(
					fetchError.value.message || "Failed to set default payment method",
				);
			}

			return data.value;
		} catch (err: unknown) {
			error.value = err instanceof Error ? err.message : "An unknown error occurred";
			console.error("Error setting default payment method:", err);
			return { message: error.value, success: false };
		} finally {
			loading.value = false;
		}
	};

	return {
		addPaymentMethod,
		connectAccount,
		disconnectAccount,
		error,

		// Account methods
		fetchAccountInfo,

		// Billing methods
		fetchBillingInfo,

		// Profile methods
		fetchUserProfile,
		// State
		loading,
		removePaymentMethod,
		setDefaultPaymentMethod,
		updateUserProfile,
	};
}
