<script>
	import Button from '$lib/components/Button.svelte';
	import CashRegisterShareLink from '$lib/components/CashRegisterShareLink.svelte';
	import ProductHeaderRow from '$lib/components/ProductHeaderRow.svelte';
	import ProductRow from '$lib/components/ProductRow.svelte';
	import { createProductsStore } from '$lib/stores/products.svelte.js';

	let store = createProductsStore();
	let showingLink = $state(false);
</script>

<svelte:head>
	<title>Configuration | LCE</title>
	<meta name="description" content="Configuration | LCE" />
</svelte:head>

<section>
	{#if showingLink}
		<div class="flex flex-col gap-2 items-center">
			<p class="text-center">Partagez la caisse avec le QR code suivant</p>
			<CashRegisterShareLink encodedProducts={store.encodedProducts} />
			<Button variant="primary" onclick={() => (showingLink = false)}
				>Revenir à la configuration</Button
			>
		</div>
	{:else}
		<table class="w-full">
			<thead><ProductHeaderRow onAddClick={store.addNewProduct} /></thead>
			<tbody>
				{#each store.products as _, i}
					<ProductRow bind:product={store.products[i]} onDelete={store.removeProduct} />
				{/each}
			</tbody>
		</table>

		<div class="my-8 flex flex-col md:flex-row gap-2">
			<Button variant="outline" onclick={store.clear}>Supprimer tous les produits</Button>
			<Button variant="primary" onclick={() => (showingLink = true)}>Partager la caisse</Button>
		</div>
	{/if}
</section>
