import type { CartItem, CustomerInfo, Order, Product } from "~/types/shop";

// This would typically be a global singleton or provided/injected
const cart = ref<CartItem[]>([]);
const orders = ref<Order[]>([]);

export function useCart() {
	// --- Computed Properties ---
	const cartTotal = computed(() => {
		return cart.value.reduce(
			(total, item) => total + item.product.price * item.quantity,
			0,
		);
	});

	const cartItemCount = computed(() => {
		return cart.value.reduce((count, item) => count + item.quantity, 0);
	});

	// --- Methods ---
	const addToCart = (product: Product) => {
		const existingItem = cart.value.find(
			(item) => item.product.id === product.id,
		);
		if (existingItem) {
			if (existingItem.quantity < product.stock) {
				existingItem.quantity++;
			} else {
				// Optional: notify user that stock limit is reached
				console.warn(`Cannot add more ${product.name}. Stock limit reached.`);
			}
		} else {
			if (product.stock > 0) {
				cart.value.push({ id: Date.now(), product, quantity: 1 });
			}
		}
	};

	const removeFromCart = (itemId: number) => {
		const index = cart.value.findIndex((item) => item.id === itemId);
		if (index > -1) {
			cart.value.splice(index, 1);
		}
	};

	const updateQuantity = (itemId: number, quantity: number) => {
		const item = cart.value.find((item) => item.id === itemId);
		if (item) {
			if (quantity <= 0) {
				removeFromCart(itemId);
			} else if (quantity <= item.product.stock) {
				item.quantity = quantity;
			} else {
				// Set to max available stock if requested quantity is too high
				item.quantity = item.product.stock;
			}
		}
	};

	const clearCart = () => {
		cart.value = [];
	};

	const checkout = (customerInfo: CustomerInfo) => {
		if (cart.value.length === 0) return null;

		// Decrease stock for purchased items
		// In a real app, this logic would be on the server after payment confirmation
		cart.value.forEach((item) => {
			const product = item.product;
			product.stock -= item.quantity;
		});

		const order: Order = {
			createdAt: new Date(),
			customerInfo,
			id: Date.now(),
			items: [...cart.value],
			orderNumber: `ORD-${Date.now()}`,
			shopId: cart.value[0]?.product.shopId || "default",
			status: "pending",
			total: cartTotal.value,
		};

		orders.value.unshift(order); // Add to the beginning of the list
		clearCart();

		return order;
	};

	const getOrderById = (id: number) => {
		return orders.value.find((order) => order.id === id);
	};

	return {
		addToCart,
		cart,
		cartItemCount,
		cartTotal,
		checkout,
		clearCart,
		getOrderById,
		orders,
		removeFromCart,
		updateQuantity,
	};
}
