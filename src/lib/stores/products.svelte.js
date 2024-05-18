const productsStoreKey = 'lce-products:v1';

export function createProductsStore() {
	const urlParams = new URLSearchParams(window.location.search);
	const defaultEncodedProducts = urlParams.get('c') ?? localStorage.getItem(productsStoreKey) ?? '';

	/** @type Product[] */
	let products = $state(decodeProductsString(defaultEncodedProducts));
	let encodedProducts = $derived(btoa(products.map(encodeProductString).join(';')));

	$effect(() => {
		localStorage.setItem(productsStoreKey, encodedProducts);
	});

	return {
		get products() {
			return products;
		},
		get encodedProducts() {
			return encodedProducts;
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

/** @param {Product} product */
export function encodeProductString(product) {
	return `${product.name}|${product.price}|${product.kilo ? '1' : '0'}`;
}

/** @param {string} productString
 * @returns {Product | null}
 * */
function decodeProductString(productString) {
	const encodedParts = productString.split('|');
	if (encodedParts.length !== 3) return null;
	return {
		name: encodedParts[0],
		price: Number(encodedParts[1]),
		kilo: encodedParts[2] === '1'
	};
}

/** @param {string} productsString */
function decodeProductsString(productsString) {
	const decodedProductsString = atob(productsString);
	return decodedProductsString
		.split(';')
		.map(decodeProductString)
		.filter(
			/**
			 * @param {Product | null} p
			 * @returns {p is Product} */
			(p) => p != null
		);
}
