const productsStoreKey = 'lce-products:v1';

export function createProductsStore() {
	/** @type Product[] */
	let products = $state([]);

	const savedProducts = localStorage.getItem(productsStoreKey);
	if (savedProducts != null) {
		const parsedSavedProducts = JSON.parse(savedProducts);
		if (Array.isArray(parsedSavedProducts)) {
			products = parsedSavedProducts;
		}
	}

	$effect(() => {
		localStorage.setItem(productsStoreKey, JSON.stringify(products));
	});

	return {
		get products() {
			return products;
		},
		clear() {
			products = [];
		},
		/**
		 * @param {Product} product
		 */
		addProduct(product) {
			products.push(product);
		},
		/**
		 * @param {Product} product
		 */
		removeProduct(product) {
			products = products.filter((p) => p !== product);
		}
	};
}
