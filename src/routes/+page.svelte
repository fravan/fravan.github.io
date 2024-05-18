<script>
	import ProductCell from '$lib/components/ProductCell.svelte';
	import { createProductsStore } from '$lib/stores/products.svelte.js';

	let store = createProductsStore();
</script>

<svelte:head>
	<title>La caisse enregistreuse</title>
	<meta name="description" content="La Caisse Enregistreuse" />
</svelte:head>

<section class="flex flex-col gap-2">
	{#each store.products as p}
		<ProductCell product={p} />
	{/each}
</section>
