<script>
	import Button from '$lib/components/Button.svelte';
	import CashRegisterShareLink from '$lib/components/CashRegisterShareLink.svelte';
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
	<div class="flex justify-between gap-4 items-center">
		<h2 class="text-xl font-bold">Configuration</h2>
	</div>

	<table class="w-full">
		<thead><ProductHeaderRow onAddClick={store.addNewProduct} /></thead>
		<tbody>
			{#each store.products as p}
				<ProductRow bind:product={p} onDelete={store.removeProduct} />
			{/each}
		</tbody>
	</table>

	<div class="my-8">
		<Button variant="primary" onclick={store.clear}>Supprimer tous les produits</Button>
	</div>
	<!--
	<CashRegisterShareLink encodedProducts={store.encodedProducts} />
  -->
</section>
