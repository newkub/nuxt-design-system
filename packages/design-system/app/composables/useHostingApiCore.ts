/**
 * Core utilities for Hosting API
 * Provides base URL and reusable fetch wrapper with error handling
 */

export interface ApiResponse<T = unknown> {
	success: boolean;
	message?: string;
	data?: T;
	error?: string;
}

/**
 * Base API URL for hosting endpoints
 */
export const HOSTING_API_BASE_URL = "/api/hosting";

/**
 * Reusable wrapper for useFetch with standardized error handling
 */
export async function hostingApiFetch<T>(
	endpoint: string,
	options?: {
		method?: "GET" | "POST" | "PUT" | "DELETE";
		query?: Record<string, string>;
		body?: unknown;
	},
): Promise<T | null> {
	try {
		const { data, error } = await useFetch<T>(endpoint, {
			method: options?.method,
			query: options?.query,
			body: options?.body,
		});

		if (error.value) {
			throw new Error(error.value.message || "API request failed");
		}

		return data.value;
	} catch (err) {
		console.error(`Error fetching ${endpoint}:`, err);
		throw err;
	}
}

/**
 * Create error response
 */
export function createErrorResponse(message: string): ApiResponse {
	return {
		success: false,
		message,
		error: message,
	};
}
