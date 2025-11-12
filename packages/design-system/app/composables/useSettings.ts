import type {
	AccountInfo,
	BillingInfo,
	ConnectedAccount,
	PaymentMethod,
	PlanFeature,
	UserProfile,
} from "~/types/settings";

export function useSettings() {
	// Reactive state
	const user = reactive<UserProfile>({
		avatar: "",
		bio: "",
		email: "",
		location: "",
		name: "",
		twitter: "",
		website: "",
	});

	const accountInfo = ref<AccountInfo>({
		email: "",
		joined: "",
		plan: "",
		status: "",
	});

	const connectedAccounts = ref<ConnectedAccount[]>([]);

	const billingInfo = ref<BillingInfo>({
		currentPlan: {
			features: [],
			name: "",
			nextBilling: "",
			period: "",
			price: "",
		},
	});

	const plans = ref<PlanFeature[]>([]);
	const paymentMethods = ref<PaymentMethod[]>([]);

	// Form states
	const isUploading = ref(false);
	const showAddCard = ref(false);
	const newCard = reactive({
		cvc: "",
		expiry: "",
		name: "",
		number: "",
	});

	// API composable
	const {
		loading,
		error,
		fetchUserProfile,
		updateUserProfile,
		fetchAccountInfo,
		connectAccount,
		disconnectAccount,
		fetchBillingInfo,
		addPaymentMethod,
		removePaymentMethod,
		setDefaultPaymentMethod,
	} = useSettingsApi();

	// Load initial data
	onMounted(async () => {
		// Load profile data
		const profileData = await fetchUserProfile();
		if (profileData) {
			Object.assign(user, profileData);
		}

		// Load account data
		const accountData = await fetchAccountInfo();
		if (accountData) {
			accountInfo.value = accountData.accountInfo;
			connectedAccounts.value = accountData.connectedAccounts;
		}

		// Load billing data
		const billingData = await fetchBillingInfo();
		if (billingData) {
			billingInfo.value = billingData.billingInfo;
			plans.value = billingData.plans;
			paymentMethods.value = billingData.paymentMethods;
		}
	});

	// Profile methods
	const saveProfile = async () => {
		const result = await updateUserProfile(user);
		if (result?.success) {
			console.log("Profile saved successfully");
		} else {
			console.error("Failed to save profile:", result?.message);
		}
		return result;
	};

	const triggerFileInput = (fileInput: HTMLInputElement | null) => {
		fileInput?.click();
	};

	const handleFileUpload = async (event: Event) => {
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (files && files.length > 0) {
			isUploading.value = true;
			// Simulate upload process
			setTimeout(() => {
				// In a real app, you would upload the file to a server
				const file = files[0];
				if (file) {
					user.avatar = URL.createObjectURL(file);
				}
				isUploading.value = false;
			}, 1500);
		}
	};

	const removeAvatar = () => {
		user.avatar = "https://i.pravatar.cc/150?u=a042581f4e29026704d";
	};

	// Account methods
	const handleConnectAccount = async (accountId: string) => {
		const account = connectedAccounts.value.find((a) => a.id === accountId);
		if (account) {
			if (account.connected) {
				const result = await disconnectAccount(accountId);
				if (result?.success) {
					account.connected = false;
					account.email = "";
				}
			} else {
				// In a real app, this would trigger OAuth flow
				const email =
					accountId === "google"
						? "john.doe@gmail.com"
						: accountId === "twitter"
							? "@johndoe"
							: "john.doe@github.com";

				const result = await connectAccount(accountId, email);
				if (result?.success) {
					account.connected = true;
					account.email = email;
				}
			}
		}
	};

	// Billing methods
	const selectPlan = (planId: string) => {
		const plan = plans.value.find((p) => p.id === planId);
		if (plan) {
			// In a real app, this would trigger a payment flow
			alert(`Selected plan: ${plan.name}`);
		}
	};

	const handleSetDefaultPaymentMethod = async (id: number) => {
		const result = await setDefaultPaymentMethod(id);
		if (result?.success) {
			paymentMethods.value.forEach((method) => {
				method.isDefault = method.id === id;
			});
		}
	};

	const handleRemovePaymentMethod = async (id: number) => {
		const result = await removePaymentMethod(id);
		if (result?.success) {
			paymentMethods.value = paymentMethods.value.filter(
				(method) => method.id !== id,
			);
		}
	};

	const handleAddPaymentMethod = async () => {
		const result = await addPaymentMethod(newCard);
		if (result?.success) {
			showAddCard.value = false;
			Object.assign(newCard, { cvc: "", expiry: "", name: "", number: "" });
		}
	};

	// Return all reactive state and methods
	return {
		accountInfo,
		billingInfo,
		connectedAccounts,
		error,
		handleAddPaymentMethod,

		// Account methods
		handleConnectAccount,
		handleFileUpload,
		handleRemovePaymentMethod,
		handleSetDefaultPaymentMethod,
		isUploading,
		loading,
		newCard,
		paymentMethods,
		plans,
		removeAvatar,

		// Profile methods
		saveProfile,

		// Billing methods
		selectPlan,
		showAddCard,
		triggerFileInput,
		// State
		user,
	};
}
