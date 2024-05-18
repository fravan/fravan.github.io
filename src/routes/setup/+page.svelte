<script>
	import CashRegisterShareLink from '$lib/components/CashRegisterShareLink.svelte';
	import ProductForm from '$lib/components/ProductForm.svelte';
	import ProductHeaderRow from '$lib/components/ProductHeaderRow.svelte';
	import ProductRow from '$lib/components/ProductRow.svelte';
	import { createProductsStore } from '$lib/stores/products.svelte.js';

	let store = createProductsStore();
</script>

<svelte:head>
	<title>Configuration | LCE</title>
	<meta name="description" content="Configuration | LCE" />
</svelte:head>

<section>
	<h2>Configuration</h2>

	<ProductForm onProductSubmitted={store.addProduct} />

	<button type="button" onclick={store.clear}>Supprimer tous les produits</button>

	<table>
		<thead><ProductHeaderRow /></thead>
		<tbody>
			{#each store.products as p}
				<ProductRow product={p} onDelete={store.removeProduct} />
			{/each}
		</tbody>
	</table>

	<CashRegisterShareLink encodedProducts={store.encodedProducts} />
</section>
