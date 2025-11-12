import type { Email } from "~/types/email";

// Mock data - in a real app this would come from an API
const mockEmails: Email[] = [
	{
		account: "default",
		content:
			"Hi there,\n\nWelcome to our email service!\n\nBest regards,\nJohn",
		email: "john.doe@example.com",
		from: "John Doe",
		id: "123e4567-e89b-12d3-a456-426614174000",
		subject: "Welcome to Email Service",
		timestamp: new Date().toISOString(),
		unread: true,
	},
	{
		account: "default",
		content:
			"Hello,\n\nHere is the latest update on the project:\n\n- Task 1: Completed\n- Task 2: In progress\n- Task 3: Not started\n\nThanks,\nJane",
		email: "jane.smith@example.com",
		from: "Jane Smith",
		id: "2",
		subject: "Project Update",
		timestamp: new Date(Date.now() - 86400000).toISOString(),
		unread: false,
	},
	{
		account: "default",
		content:
			"Dear User,\n\nWe are pleased to inform you that your account setup is now complete. You can start using all features immediately.\n\nIf you have any questions, please don't hesitate to contact our support team.\n\nBest regards,\nSupport Team",
		email: "support@company.com",
		from: "Support Team",
		id: "3",
		subject: "Your Account Setup is Complete",
		timestamp: new Date(Date.now() - 172800000).toISOString(),
		unread: true,
	},
];

// Global state
const emails = ref<Email[]>([]);
const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);
const accounts = ref<string[]>(["default"]); // Track available accounts
const isAuthenticated = ref<boolean>(false); // Track authentication status

export function useEmail() {
	// Fetch emails from server
	const fetchEmails = async () => {
		isLoading.value = true;
		error.value = null;

		try {
			// In a real app, this would be an API call:
			// const response = await $fetch('/api/emails')
			// emails.value = response.data

			// Mock API delay
			await new Promise((resolve) => setTimeout(resolve, 500));

			// For now, use mock data
			emails.value = [...mockEmails];
		} catch (err) {
			error.value = "Failed to fetch emails";
			console.error("Error fetching emails:", err);
		} finally {
			isLoading.value = false;
		}
	};

	// Get email by ID
	const getEmailById = (id: string) => {
		return emails.value.find((email) => email.id === id);
	};

	// Get all unique accounts
	const getAllAccounts = computed(() => {
		const accountSet = new Set(emails.value.map((email) => email.account));
		return Array.from(accountSet).sort();
	});

	// Get emails by account
	const getEmailsByAccount = (account: string) => {
		return emails.value.filter((email) => email.account === account);
	};

	// Send email
	const sendEmail = async (emailData: Partial<Email>) => {
		try {
			// In a real app, this would be an API call:
			// const response = await $fetch('/api/emails', { method: 'POST', body: emailData })

			// Mock API delay
			await new Promise((resolve) => setTimeout(resolve, 300));

			// Add to local state for mock purposes
			const newEmail: Email = {
				account: emailData.account || "default",
				content: emailData.content || "",
				email: emailData.email || "user@example.com",
				from: emailData.from || "Current User",
				id: Date.now().toString(),
				subject: emailData.subject || "New Email",
				timestamp: new Date().toISOString(),
				unread: false,
			};

			emails.value.unshift(newEmail);
			return newEmail;
		} catch (err) {
			error.value = "Failed to send email";
			console.error("Error sending email:", err);
			throw err;
		}
	};

	// Mark email as read
	const markAsRead = (emailId: string) => {
		const email = emails.value.find((e) => e.id === emailId);
		if (email) {
			email.unread = false;
		}
	};

	// Delete email
	const deleteEmail = (emailId: string) => {
		const index = emails.value.findIndex((e) => e.id === emailId);
		if (index > -1) {
			emails.value.splice(index, 1);
		}
	};

	// Add new account
	const addAccount = (accountName: string) => {
		if (!accounts.value.includes(accountName)) {
			accounts.value.push(accountName);
		}
	};

	// Sign in to an account
	const signIn = async (_credentials: { email: string; password: string }) => {
		try {
			// In a real app, this would be an API call:
			// const response = await $fetch('/api/auth/signin', { method: 'POST', body: credentials })

			// Mock API delay
			await new Promise((resolve) => setTimeout(resolve, 800));

			// For mock purposes, always succeed
			isAuthenticated.value = true;
			return { message: "Sign in successful", success: true };
		} catch (err) {
			isAuthenticated.value = false;
			console.error("Sign in error:", err);
			return { message: "Sign in failed", success: false };
		}
	};

	// Sign out
	const signOut = () => {
		isAuthenticated.value = false;
		emails.value = [];
	};

	// Initialize composable
	onMounted(() => {
		if (emails.value.length === 0) {
			fetchEmails();
		}
	});

	return {
		accounts,
		addAccount,
		deleteEmail,
		// State
		emails,
		error,

		// Methods
		fetchEmails,

		// Computed
		getAllAccounts,
		getEmailById,
		getEmailsByAccount,
		isAuthenticated,
		isLoading,
		markAsRead,
		sendEmail,
		signIn,
		signOut,
	};
}
