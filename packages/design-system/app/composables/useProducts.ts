import { computed, ref } from "vue";
import type { Product, ProductForm } from "~/types/shop";

export function useProducts() {
	// Global products state (for shop listing)
	const allProducts = ref<Product[]>([
		{
			category: "electronics",
			createdAt: new Date(),
			description: "สมาร์ทโฟนรุ่นล่าสุดจาก Apple พร้อมกล้องระดับโปร",
			featured: true,
			id: 1,
			image:
				"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
			name: "iPhone 15 Pro Max",
			price: 45900,
			rating: 4.8,
			reviews: 1247,
			seller: "Apple Store Thailand",
			shopId: "tech-gadgets",
			sku: "IPHONE-15PM",
			stock: 15,
			tags: ["smartphone", "apple", "premium"],
			updatedAt: new Date(),
		},
		{
			category: "electronics",
			createdAt: new Date(),
			description: "แล็ปท็อปบางเบาพร้อมชิป M3 ที่ทรงพลัง",
			id: 2,
			image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
			name: "MacBook Air M3",
			price: 42900,
			rating: 4.9,
			reviews: 892,
			seller: "Apple Store Thailand",
			shopId: "tech-gadgets",
			sku: "MBA-M3",
			stock: 8,
			tags: ["laptop", "macbook", "ultrabook"],
			updatedAt: new Date(),
		},
	]);

	// Products for current shop
	const shopProducts = ref<Product[]>([]);

	const loading = ref(false);
	const error = ref<string | null>(null);

	// Filter and search for shop products
	const categoryFilter = ref<string>("all");
	const searchQuery = ref("");

	const categories = computed(() => {
		const cats = new Set(shopProducts.value.map((p) => p.category));
		return ["all", ...Array.from(cats)];
	});

	const filteredProducts = computed(() => {
		let filtered = shopProducts.value;

		if (categoryFilter.value !== "all") {
			filtered = filtered.filter((p) => p.category === categoryFilter.value);
		}

		if (searchQuery.value) {
			const lowerCaseQuery = searchQuery.value.toLowerCase();
			filtered = filtered.filter(
				(p) =>
					p.name.toLowerCase().includes(lowerCaseQuery) ||
					p.description.toLowerCase().includes(lowerCaseQuery) ||
					p.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery)),
			);
		}

		return filtered;
	});

	// Fetch products for a specific shop
	const fetchProducts = async (shopId: string) => {
		loading.value = true;
		error.value = null;
		try {
			// TODO: Replace with actual API call
			// const response = await $fetch<Product[]>(`/api/shops/${shopId}/products`)
			// shopProducts.value = response

			// Mock data for now - filter from all products
			shopProducts.value = allProducts.value.filter((p) => p.shopId === shopId);
		} catch (err) {
			error.value =
				err instanceof Error ? err.message : "Failed to fetch products";
		} finally {
			loading.value = false;
		}
	};

	const fetchProduct = async (shopId: string, productId: number) => {
		loading.value = true;
		error.value = null;
		try {
			// TODO: Replace with actual API call
			// const response = await $fetch<Product>(`/api/shops/${shopId}/products/${productId}`)
			// return response

			// Mock data for now
			const product = shopProducts.value.find((p) => p.id === productId);
			if (!product) {
				throw new Error("Product not found");
			}
			return product;
		} catch (err) {
			error.value =
				err instanceof Error ? err.message : "Failed to fetch product";
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const createProduct = async (shopId: string, productData: ProductForm) => {
		loading.value = true;
		error.value = null;
		try {
			// TODO: Replace with actual API call
			// const response = await $fetch<Product>(`/api/shops/${shopId}/products`, {
			//   method: 'POST',
			//   body: productData
			// })

			// Mock data for now
			const newProduct: Product = {
				...productData,
				createdAt: new Date(),
				id: Math.max(...allProducts.value.map((p) => p.id)) + 1,
				rating: 0,
				reviews: 0,
				shopId,
				tags: productData.tags.split(",").map((tag) => tag.trim()),
				updatedAt: new Date(),
			};
			allProducts.value.push(newProduct);
			shopProducts.value.push(newProduct);
			return newProduct;
		} catch (err) {
			error.value =
				err instanceof Error ? err.message : "Failed to create product";
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const updateProduct = async (
		shopId: string,
		productId: number,
		productData: Partial<Product>,
	) => {
		loading.value = true;
		error.value = null;
		try {
			// TODO: Replace with actual API call
			// await $fetch(`/api/shops/${shopId}/products/${productId}`, {
			//   method: 'PATCH',
			//   body: productData
			// })

			// Mock data for now
			const productIndex = allProducts.value.findIndex(
				(p) => p.id === productId && p.shopId === shopId,
			);
			if (productIndex !== -1) {
				allProducts.value[productIndex] = {
					...allProducts.value[productIndex],
					...productData,
					updatedAt: new Date(),
				} as Product;
			}

			const shopProductIndex = shopProducts.value.findIndex(
				(p) => p.id === productId,
			);
			if (shopProductIndex !== -1) {
				shopProducts.value[shopProductIndex] = {
					...shopProducts.value[shopProductIndex],
					...productData,
					updatedAt: new Date(),
				} as Product;
			}
		} catch (err) {
			error.value =
				err instanceof Error ? err.message : "Failed to update product";
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const deleteProduct = async (shopId: string, productId: number) => {
		loading.value = true;
		error.value = null;
		try {
			// TODO: Replace with actual API call
			// await $fetch(`/api/shops/${shopId}/products/${productId}`, {
			//   method: 'DELETE'
			// })

			// Mock data for now
			allProducts.value = allProducts.value.filter(
				(p) => p.id !== productId || p.shopId !== shopId,
			);
			shopProducts.value = shopProducts.value.filter((p) => p.id !== productId);
		} catch (err) {
			error.value =
				err instanceof Error ? err.message : "Failed to delete product";
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const getProductById = (id: number) => {
		return shopProducts.value.find((p) => p.id === id);
	};

	return {
		// State
		allProducts,
		categories,
		categoryFilter,
		createProduct,
		deleteProduct,
		error,
		fetchProduct,

		// Methods
		fetchProducts,
		filteredProducts,
		getProductById,
		loading,
		searchQuery,
		shopProducts,
		updateProduct,
	};
}
