import { ref } from "vue";
import type { CustomerInfo, Order, Product, Shop } from "~/types/shop";

export function useShop() {
	// --- Shop Management State ---
	const currentShop = ref<Shop | null>(null);
	const shops = ref<Shop[]>([]);
	const loading = ref(false);
	const error = ref<string | null>(null);

	// --- User Interface State ---
	const selectedCategory = ref("all");
	const searchQuery = ref("");
	const sortBy = ref("name");
	const currentView = ref<"products" | "orders">("products");
	const showCart = ref(false);
	const showCheckout = ref(false);
	const isSellerMode = ref(false);
	const editingProduct = ref<Product | null>(null);
	const isEditing = ref(false);

	// --- Shop Management Methods ---
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("th-TH", {
			currency: "THB",
			style: "currency",
		}).format(amount);
	};

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat("th-TH", {
			dateStyle: "medium",
			timeStyle: "short",
		}).format(date);
	};

	const getStatusColor = (status: string) => {
		const statusColors: Record<string, string> = {
			active: "bg-green-100 text-green-800",
			"coming-soon": "bg-blue-100 text-blue-800",
			inactive: "bg-gray-100 text-gray-800",
		};
		return statusColors[status] || "bg-gray-100 text-gray-800";
	};

	const getStatusLabel = (status: string) => {
		switch (status) {
			case "active":
				return "Active";
			case "inactive":
				return "Inactive";
			case "coming-soon":
				return "Coming Soon";
			default:
				return status;
		}
	};

	// Fetch shops
	const fetchShops = async () => {
		loading.value = true;
		error.value = null;
		try {
			// TODO: Replace with actual API call
			// const response = await $fetch<Shop[]>('/api/shops')
			// shops.value = response

			// Mock data for now
			shops.value = [
				{
					category: "Electronics",
					createdAt: new Date(),
					description: "Latest technology and gadgets",
					icon: "i-mdi-cellphone-cog",
					id: "tech-gadgets",
					name: "Tech Gadgets",
					owner: "admin",
					products: 156,
					status: "active",
				},
				{
					category: "Fashion",
					createdAt: new Date(),
					description: "Trendy fashion and accessories",
					icon: "i-mdi-tshirt-crew",
					id: "fashion-hub",
					name: "Fashion Hub",
					owner: "admin",
					products: 89,
					status: "active",
				},
			];
		} catch (err) {
			error.value =
				err instanceof Error ? err.message : "Failed to fetch shops";
		} finally {
			loading.value = false;
		}
	};

	const fetchShop = async (shopId: string) => {
		loading.value = true;
		error.value = null;
		try {
			// TODO: Replace with actual API call
			// const response = await $fetch<Shop>(`/api/shops/${shopId}`)
			// currentShop.value = response

			// Mock data for now
			const shop = shops.value.find((s) => s.id === shopId);
			if (shop) {
				currentShop.value = shop;
			} else {
				throw new Error("Shop not found");
			}
		} catch (err) {
			error.value = err instanceof Error ? err.message : "Failed to fetch shop";
		} finally {
			loading.value = false;
		}
	};

	// --- User Interface Methods ---
	const toggleSellerMode = () => {
		isSellerMode.value = !isSellerMode.value;
		if (!isSellerMode.value) {
			handleProductReset();
		}
	};

	const editProduct = (product: Product) => {
		editingProduct.value = { ...product };
		isEditing.value = true;
	};

	const handleProductReset = () => {
		editingProduct.value = null;
		isEditing.value = false;
	};

	const handleCheckout = (customerInfo: CustomerInfo) => {
		// This would typically call a composable like useCart
		console.log("Checkout confirmed for:", customerInfo);
		showCheckout.value = false;
	};

	// Status utilities for orders
	const statusClasses: Record<Order["status"], string> = {
		cancelled: "bg-red-100 text-red-800",
		delivered: "bg-purple-100 text-purple-800",
		paid: "bg-green-100 text-green-800",
		pending: "bg-yellow-100 text-yellow-800",
		refunded: "bg-gray-100 text-gray-800",
		shipped: "bg-blue-100 text-blue-800",
	};

	const getStatusClass = (status: Order["status"]) => {
		return statusClasses[status] || "bg-gray-100 text-gray-800";
	};

	const getStatusText = (status: Order["status"]) => {
		const statusTexts: Record<Order["status"], string> = {
			cancelled: "ยกเลิก",
			delivered: "จัดส่งแล้ว",
			paid: "ชำระเงินแล้ว",
			pending: "รอดำเนินการ",
			refunded: "คืนเงินแล้ว",
			shipped: "กำลังจัดส่ง",
		};
		return statusTexts[status] || "ไม่ทราบสถานะ";
	};

	return {
		// Shop Management State
		currentShop,
		currentView,
		editingProduct,
		editProduct,
		error,
		fetchShop,

		// Shop Management Methods
		fetchShops,
		formatCurrency,
		formatDate,
		getStatusClass,
		getStatusColor,
		getStatusLabel,
		getStatusText,
		handleCheckout,
		handleProductReset,
		isEditing,
		isSellerMode,
		loading,
		searchQuery,

		// User Interface State
		selectedCategory,
		shops,
		showCart,
		showCheckout,
		sortBy,

		// User Interface Methods
		toggleSellerMode,
	};
}
