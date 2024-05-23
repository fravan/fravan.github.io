const ordersStoreKey = 'lce:orders:v1';

export function createOrdersStore() {
	/** @type Order[] */
	let orders = $state([]);
	let encodedOrders = $derived(btoa(encodeOrders(orders)));

	$effect(() => {
		localStorage.setItem(ordersStoreKey, encodedOrders);
	});

	return {
		get orders() {
			return orders;
		},
		clear() {
			orders = [];
		},
		/**
		 * @param {Order} order
		 */
		saveOrder(order) {
			const filteredOrder = Object.entries(order).reduce(
				(/** @type {Order} */ acc, [key, value]) => {
					if (value.quantity === 0) return acc;
					acc[key] = value;
					return acc;
				},
				{}
			);
			orders.push(filteredOrder);
		}
	};
}

/** @param {Order[]} orders */
function encodeOrders(orders) {
	return orders
		.map((o) => Object.entries(o).map(([key, value]) => `${key}:${value.quantity}|${value.price}`))
		.join(';');
}