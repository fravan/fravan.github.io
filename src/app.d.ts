// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface Product {
		name: string;
		price: number;
		kilo: boolean;
	}
	interface ProductOrder {
		quantity: number;
		price: number;
	}
	type Order = Record<string, ProductOrder>;
}

export {};
