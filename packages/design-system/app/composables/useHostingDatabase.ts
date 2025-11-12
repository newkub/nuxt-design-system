import { computed, ref } from "vue";
import {
	databaseTypes,
	defaultDatabaseForm,
	regions,
	sizes,
} from "~/config/hosting/database";
import type {
	Database,
	DatabaseForm,
} from "~/types/hosting";

export const useDatabase = () => {
	// State
	const databases = ref<Database[]>([]);
	const selectedDatabase = ref<Database | null>(null);
	const isLoading = ref(false);
	const error = ref<string | null>(null);

	// Database form for creation
	const databaseForm = ref<DatabaseForm>({ ...defaultDatabaseForm });

	// Computed
	const runningDatabases = computed(() =>
		databases.value.filter((db) => db.status === "running"),
	);

	const databaseMetrics = computed(() =>
		databases.value.map((db) => ({
			...db,
			connectionCount: db.connections,
			// Metrics are now part of the database object from the server
			cpuUsage: db.cpu,
			memoryUsage: db.memory,
			storageUsage: (db.storageUsed / db.storage) * 100,
		})),
	);

	// Options for database configuration are imported from '~/config/database'

	// Utility functions

	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString("th-TH", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
	};

	const getConnectionString = (db: Database) => {
		const connectionStrings: Record<string, string> = {
			mongodb: `mongodb://username:password@${db.name}.wrikka.app:27017/dbname`,
			mysql: `mysql://username:password@${db.name}.wrikka.app:3306/dbname`,
			postgres: `postgresql://username:password@${db.name}.wrikka.app:5432/dbname`,
			redis: `redis://username:password@${db.name}.wrikka.app:6379`,
		};
		return connectionStrings[db.type] || "";
	};

	const copyToClipboard = async (text: string) => {
		if (typeof navigator !== "undefined" && navigator.clipboard) {
			await navigator.clipboard.writeText(text);
		}
	};

	// Validation
	const validateDatabaseForm = () => {
		const errors: string[] = [];

		if (!databaseForm.value.name.trim()) {
			errors.push("Database name is required");
		}
		if (databaseForm.value.name.length < 3) {
			errors.push("Database name must be at least 3 characters");
		}
		if (!databaseForm.value.type) {
			errors.push("Database type is required");
		}
		if (!databaseForm.value.region) {
			errors.push("Region is required");
		}

		return errors;
	};

	// API functions
	const fetchDatabases = async (_projectId?: string) => {
		const {
			data,
			pending,
			error: fetchError,
			refresh,
		} = await useFetch<Database[]>("/api/hosting/databases", {
			immediate: false,
		});
		isLoading.value = pending.value;
		await refresh();
		databases.value = data.value || [];
		if (fetchError.value) error.value = fetchError.value.statusMessage;
	};

	const fetchDatabase = async (databaseId: string) => {
		const {
			data,
			pending,
			error: fetchError,
		} = await useFetch<Database>(`/api/hosting/databases/${databaseId}`);
		isLoading.value = pending.value;
		if (data.value) selectedDatabase.value = data.value;
		if (fetchError.value) error.value = fetchError.value.statusMessage;
	};

	const createDatabase = async (_projectId?: string) => {
		const validationErrors = validateDatabaseForm();
		if (validationErrors.length > 0) {
			throw new Error(validationErrors.join(", "));
		}

		try {
			isLoading.value = true;
			error.value = null;
			const newDb = await $fetch("/api/hosting/databases", {
				body: databaseForm.value,
				method: "POST",
			});
			databases.value.push(newDb);
			selectedDatabase.value = newDb;
			databaseForm.value = { ...defaultDatabaseForm }; // Reset form
			return newDb;
		} catch (err: Error) {
			error.value = err.data?.message || "Failed to create database";
			throw err;
		} finally {
			isLoading.value = false;
		}
	};

	const updateDatabase = async (
		databaseId: string,
		updates: Partial<Omit<Database, "id" | "createdAt">>,
	) => {
		try {
			isLoading.value = true;
			error.value = null;
			const updatedDb = await $fetch<Database>(
				`/api/hosting/databases/${databaseId}`,
				{
					body: updates,
					method: "PATCH",
				},
			);
			const index = databases.value.findIndex((db) => db.id === databaseId);
			if (index !== -1) databases.value[index] = updatedDb;
			if (selectedDatabase.value?.id === databaseId)
				selectedDatabase.value = updatedDb;
			return updatedDb;
		} catch (err: Error) {
			error.value = err.data?.message || "Failed to update database";
			throw err;
		} finally {
			isLoading.value = false;
		}
	};

	const deleteDatabase = async (databaseId: string) => {
		try {
			isLoading.value = true;
			error.value = null;
			await $fetch(`/api/hosting/databases/${databaseId}`, {
				method: "DELETE",
			});
			databases.value = databases.value.filter((db) => db.id !== databaseId);
			if (selectedDatabase.value?.id === databaseId)
				selectedDatabase.value = null;
		} catch (err: Error) {
			error.value = err.data?.message || "Failed to delete database";
			throw err;
		} finally {
			isLoading.value = false;
		}
	};

	return {
		copyToClipboard,
		createDatabase,
		databaseForm,
		databaseMetrics,
		// State
		databases,

		// Options
		databaseTypes,
		deleteDatabase,
		error,
		fetchDatabase,

		// Methods
		fetchDatabases,

		// Utility functions
		formatDate,
		getConnectionString,
		isLoading,
		regions,

		// Computed
		runningDatabases,
		selectedDatabase,
		sizes,
		updateDatabase,
		validateDatabaseForm,
	};
};
