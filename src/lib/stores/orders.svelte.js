const orderStoreKey = 'lce:orders:v1';

export function createOrdersStore() {
	/** @type Order */
	let cumulatedOrder = $state({});
	let encodedOrder = $derived(btoa(encodeOrder(cumulatedOrder)));

	$effect(() => {
		localStorage.setItem(orderStoreKey, encodedOrder);
	});

	return {
		get order() {
			return cumulatedOrder;
		},
		clear() {
			cumulatedOrder = {};
		},
		/**
		 * @param {Order} order
		 */
		saveOrder(order) {
			cumulatedOrder = Object.entries(order).reduce((acc, [key, value]) => {
				if (value.quantity === 0) return acc;
				if (acc[key] == null) {
					acc[key] = { quantity: 0, price: value.price };
				}
				acc[key].quantity += value.quantity;
				return acc;
			}, cumulatedOrder);
		}
	};
}

/** @param {Order} order */
function encodeOrder(order) {
	return Object.entries(order)
		.map(([key, value]) => `${key}:${value.quantity}|${value.price}`)
		.join(';');
}
